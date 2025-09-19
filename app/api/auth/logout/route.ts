import { NextRequest, NextResponse } from 'next/server'
import { getUserIdFromToken } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromToken(request)
    
    if (userId) {
      // Registrar logout
      await db.accessLog.create({
        data: {
          user_id: userId,
          action: 'logout',
          ip_address: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
          user_agent: request.headers.get('user-agent') || 'unknown'
        }
      })
    }

    // Limpar cookie de autenticação
    const response = NextResponse.json(
      { message: 'Logout realizado com sucesso' },
      { status: 200 }
    )

    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expira imediatamente
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}