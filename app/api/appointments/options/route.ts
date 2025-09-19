import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Dados mockados para compatibilidade com o frontend atual
const MOCK_SERVICES = [
  "Checkup geral",
  "Consulta de pediatria",
  "Consulta de cardiologia",
  "Consulta de dermatologia",
  "Consulta de ginecologia",
  "Consulta de oftalmologia",
]

const MOCK_TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30"
]

export async function GET() {
  try {
    // Buscar médicos ativos do banco
    const doctors = await db.doctor.findMany({
      where: { is_active: true },
      select: {
        id: true,
        name: true,
        specialty: true
      },
      orderBy: { name: 'asc' }
    })

    // Buscar hospitais ativos do banco
    const hospitals = await db.hospital.findMany({
      where: { is_active: true },
      select: {
        id: true,
        name: true,
        address: true
      },
      orderBy: { name: 'asc' }
    })

    // Formatar médicos para o frontend
    const formattedDoctors = doctors.map((doctor: { id: any; name: any; specialty: any }) => ({
      id: doctor.id,
      name: doctor.name,
      specialty: doctor.specialty
    }))

    // Formatar hospitais para o frontend
    const formattedHospitals = hospitals.map((hospital: { id: any; name: any; address: any }) => ({
      id: hospital.id,
      name: hospital.name,
      address: hospital.address
    }))

    return NextResponse.json({
      services: MOCK_SERVICES,
      doctors: formattedDoctors,
      hospitals: formattedHospitals,
      timeSlots: MOCK_TIME_SLOTS
    })

  } catch (error) {
    console.error('Get appointment options error:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar opções de agendamento' },
      { status: 500 }
    )
  }
}