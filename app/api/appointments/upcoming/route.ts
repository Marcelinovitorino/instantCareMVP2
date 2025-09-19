import { NextRequest, NextResponse } from 'next/server'
import { getUserIdFromToken } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromToken(request)
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const upcomingAppointments = await db.appointment.findMany({
      where: {
        user_id: userId,
        scheduled_date: {
          gte: today
        },
        status: 'scheduled'
      },
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
      orderBy: { scheduled_date: 'asc' },
      take: 5 // Limitar a 5 próximas consultas
    })

    return NextResponse.json(upcomingAppointments)

  } catch (error) {
    console.error('Get upcoming appointments error:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar próximas consultas' },
      { status: 500 }
    )
  }
}