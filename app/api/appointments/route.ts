import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getUserIdFromToken } from '@/lib/auth'
import { db } from '@/lib/db'

// Schema para criação de appointment compatível com o frontend
const createAppointmentSchema = z.object({
  service: z.string().min(1, "Serviço é obrigatório"),
  doctor: z.string().min(1, "Médico é obrigatório"),
  hospital: z.string().min(1, "Hospital é obrigatório"),
  date: z.string().datetime({ message: "Data inválida" }),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Horário inválido"),
  patientName: z.string().min(1, "Nome do paciente é obrigatório"),
})

// Schema para validação de query parameters
const appointmentQuerySchema = z.object({
  status: z.enum(['scheduled', 'completed', 'cancelled', 'no_show']).optional(),
  page: z.string().regex(/^\d+$/).transform(Number).optional().default('1'),
  limit: z.string().regex(/^\d+$/).transform(Number).optional().default('10'),
})

// Dados mockados para compatibilidade com o frontend atual
const MOCK_DOCTORS = [
  { id: 1, name: "José Guimarães", specialty: "Clínica Geral" },
  { id: 2, name: "Ana Silva", specialty: "Pediatria" },
  { id: 3, name: "Carlos Santos", specialty: "Cardiologia" },
  { id: 4, name: "Maria Fernandes", specialty: "Dermatologia" },
  { id: 5, name: "João Pereira", specialty: "Oftalmologia" },
]

const MOCK_HOSPITALS = [
  { id: 1, name: "Hospital Central de Maputo" },
  { id: 2, name: "Centro de Saúde A" },
  { id: 3, name: "Centro de Saúde B" },
]

const MOCK_SERVICES = [
  "Checkup geral",
  "Consulta de pediatria",
  "Consulta de cardiologia",
  "Consulta de dermatologia",
  "Consulta de ginecologia",
  "Consulta de oftalmologia",
]

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromToken(request)
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const queryParams = {
      status: searchParams.get('status'),
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
    }

    const validatedQuery = appointmentQuerySchema.parse(queryParams)

    const whereClause: any = { user_id: userId }
    
    if (validatedQuery.status) {
      whereClause.status = validatedQuery.status
    }

    const appointments = await db.appointment.findMany({
      where: whereClause,
      include: {
        doctor: {
          select: {
            name: true,
            specialty: true
          }
        },
        hospital: {
          select: {
            name: true,
            address: true
          }
        }
      },
      orderBy: { scheduled_date: 'desc' },
      skip: (validatedQuery.page - 1) * validatedQuery.limit,
      take: validatedQuery.limit
    })

    // Formatar dados para compatibilidade com o frontend
    const formattedAppointments = appointments.map((appointment: { id: any; consultation_code: any; doctor: { specialty: any; name: any }; hospital: { name: any }; scheduled_date: string | number | Date; start_time: any; end_time: any; status: any }) => ({
      id: appointment.id,
      consultationCode: appointment.consultation_code,
      patientName: "", // Será preenchido com dados do usuário
      service: appointment.doctor.specialty,
      doctor: appointment.doctor.name,
      hospital: appointment.hospital.name,
      dateTime: `${new Date(appointment.scheduled_date).toLocaleDateString('pt-MZ')}, ${appointment.start_time} - ${appointment.end_time}`,
      status: appointment.status,
      date: appointment.scheduled_date.toString(),
      time: appointment.start_time
    }))

    const total = await db.appointment.count({ where: whereClause })

    return NextResponse.json({
      appointments: formattedAppointments,
      pagination: {
        page: validatedQuery.page,
        limit: validatedQuery.limit,
        total,
        pages: Math.ceil(total / validatedQuery.limit)
      }
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Parâmetros de consulta inválidos', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Get appointments error:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar consultas' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromToken(request)
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = createAppointmentSchema.parse(body)

    // Buscar usuário para obter o nome
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { name: true }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    // Encontrar médico pelo nome (mockado por enquanto)
    const doctor = MOCK_DOCTORS.find(d => d.name === validatedData.doctor)
    if (!doctor) {
      return NextResponse.json(
        { error: 'Médico não encontrado' },
        { status: 404 }
      )
    }

    // Encontrar hospital pelo nome (mockado por enquanto)
    const hospital = MOCK_HOSPITALS.find(h => h.name === validatedData.hospital)
    if (!hospital) {
      return NextResponse.json(
        { error: 'Hospital não encontrado' },
        { status: 404 }
      )
    }

    // Verificar se o serviço é válido
    if (!MOCK_SERVICES.includes(validatedData.service)) {
      return NextResponse.json(
        { error: 'Serviço não disponível' },
        { status: 400 }
      )
    }

    // Verificar conflito de horário
    const existingAppointment = await db.appointment.findFirst({
      where: {
        doctor_id: doctor.id,
        scheduled_date: new Date(validatedData.date),
        start_time: validatedData.time,
        status: { in: ['scheduled', 'completed'] }
      }
    })

    if (existingAppointment) {
      return NextResponse.json(
        { error: 'Médico já possui consulta agendada neste horário' },
        { status: 409 }
      )
    }

    // Gerar código de consulta único
    const consultationCode = `CONS-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`

    // Calcular horário de término (1 hora após o início)
    const [hours, minutes] = validatedData.time.split(':').map(Number)
    const endHours = (hours + 1) % 24
    const endTime = `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`

    const appointment = await db.appointment.create({
      data: {
        user_id: userId,
        doctor_id: doctor.id,
        hospital_id: hospital.id,
        consultation_code: consultationCode,
        scheduled_date: new Date(validatedData.date),
        start_time: validatedData.time,
        end_time: endTime,
        reason: validatedData.service,
        status: 'scheduled'
      },
      include: {
        doctor: true,
        hospital: true
      }
    })

    // Formatar resposta para o frontend
    const formattedAppointment = {
      consultationCode: appointment.consultation_code,
      patientName: user.name,
      service: validatedData.service,
      doctor: doctor.name,
      hospital: hospital.name,
      dateTime: `${new Date(validatedData.date).toLocaleDateString('pt-MZ')}, ${validatedData.time} - ${endTime}`
    }

    // Criar lembrete automaticamente
    await db.reminder.create({
      data: {
        user_id: userId,
        type: 'appointment',
        title: `Consulta com ${doctor.name}`,
        message: `Sua consulta de ${validatedData.service} está agendada para ${new Date(validatedData.date).toLocaleDateString('pt-MZ')} às ${validatedData.time}`,
        scheduled_time: new Date(new Date(validatedData.date).getTime() - 24 * 60 * 60 * 1000), // 24 horas antes
      }
    })

    return NextResponse.json(formattedAppointment, { status: 201 })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Create appointment error:', error)
    return NextResponse.json(
      { error: 'Erro ao agendar consulta' },
      { status: 500 }
    )
  }
}