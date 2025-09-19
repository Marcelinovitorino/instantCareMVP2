import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getUserIdFromToken } from '@/lib/auth'
import { db } from '@/lib/db'

// Schema para atualização de appointment
const updateAppointmentSchema = z.object({
  doctor_id: z.number().int().positive().optional(),
  hospital_id: z.number().int().positive().optional(),
  scheduled_date: z.string().datetime().optional(),
  start_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
  reason: z.string().optional(),
  diagnosis: z.string().optional(),
  notes: z.string().optional(),
  status: z.enum(['scheduled', 'completed', 'cancelled', 'no_show']).optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserIdFromToken(request)
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const appointmentId = parseInt(params.id)
    
    if (isNaN(appointmentId)) {
      return NextResponse.json(
        { error: 'ID de consulta inválido' },
        { status: 400 }
      )
    }

    const appointment = await db.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        doctor: {
          select: {
            id: true,
            name: true,
            specialty: true,
            license_number: true
          }
        },
        hospital: {
          select: {
            id: true,
            name: true,
            address: true,
            phone: true
          }
        },
        prescriptions: {
          include: {
            medications: true,
            doctor: {
              select: {
                name: true,
                specialty: true
              }
            }
          }
        },
        medical_exams: {
          select: {
            id: true,
            exam_type: true,
            exam_date: true,
            lab_name: true
          }
        }
      }
    })

    if (!appointment) {
      return NextResponse.json(
        { error: 'Consulta não encontrada' },
        { status: 404 }
      )
    }

    // Verificar se a consulta pertence ao usuário
    if (appointment.user_id !== userId) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 403 }
      )
    }

    return NextResponse.json(appointment)

  } catch (error) {
    console.error('Get appointment error:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar consulta' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserIdFromToken(request)
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const appointmentId = parseInt(params.id)
    
    if (isNaN(appointmentId)) {
      return NextResponse.json(
        { error: 'ID de consulta inválido' },
        { status: 400 }
      )
    }

    // Verificar se a consulta existe e pertence ao usuário
    const existingAppointment = await db.appointment.findUnique({
      where: { id: appointmentId }
    })

    if (!existingAppointment) {
      return NextResponse.json(
        { error: 'Consulta não encontrada' },
        { status: 404 }
      )
    }

    if (existingAppointment.user_id !== userId) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const validatedData = updateAppointmentSchema.parse(body)

    // Preparar dados para atualização
    const updateData: any = { ...validatedData }

    // Converter string de data para objeto Date se existir
    if (validatedData.scheduled_date) {
      updateData.scheduled_date = new Date(validatedData.scheduled_date)
    }

    // Se o horário foi alterado, recalcular o end_time
    if (validatedData.start_time) {
      const [hours, minutes] = validatedData.start_time.split(':').map(Number)
      const endHours = (hours + 1) % 24
      updateData.end_time = `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    }

    const appointment = await db.appointment.update({
      where: { id: appointmentId },
      data: updateData,
      include: {
        doctor: true,
        hospital: true
      }
    })

    return NextResponse.json(appointment)

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Update appointment error:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar consulta' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserIdFromToken(request)
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const appointmentId = parseInt(params.id)
    
    if (isNaN(appointmentId)) {
      return NextResponse.json(
        { error: 'ID de consulta inválido' },
        { status: 400 }
      )
    }

    // Verificar se a consulta existe e pertence ao usuário
    const existingAppointment = await db.appointment.findUnique({
      where: { id: appointmentId }
    })

    if (!existingAppointment) {
      return NextResponse.json(
        { error: 'Consulta não encontrada' },
        { status: 404 }
      )
    }

    if (existingAppointment.user_id !== userId) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 403 }
      )
    }

    // Não permitir exclusão de consultas já realizadas
    if (existingAppointment.status === 'completed') {
      return NextResponse.json(
        { error: 'Não é possível excluir consultas já realizadas' },
        { status: 400 }
      )
    }

    await db.appointment.delete({
      where: { id: appointmentId }
    })

    return NextResponse.json(
      { message: 'Consulta cancelada com sucesso' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Delete appointment error:', error)
    return NextResponse.json(
      { error: 'Erro ao cancelar consulta' },
      { status: 500 }
    )
  }
}