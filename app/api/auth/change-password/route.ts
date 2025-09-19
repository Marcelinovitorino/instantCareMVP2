import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { getUserIdFromToken } from '@/lib/auth'
import { db } from '@/lib/db'

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
  newPassword: z.string().min(6, 'A nova senha deve ter pelo menos 6 caracteres')
})

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
    const validatedData = changePasswordSchema.parse(body)

    // Buscar usuário e senha atual
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        password_hash: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    // Verificar senha atual
    const isCurrentPasswordValid = await bcrypt.compare(
      validatedData.currentPassword, 
      user.password_hash
    )

    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { error: 'Senha atual incorreta' },
        { status: 400 }
      )
    }

    // Criptografar nova senha
    const newHashedPassword = await bcrypt.hash(validatedData.newPassword, 12)

    // Atualizar senha
    await db.user.update({
      where: { id: userId },
      data: { password_hash: newHashedPassword }
    })

    // Registrar alteração de senha
    await db.accessLog.create({
      data: {
        user_id: userId,
        action: 'change_password',
        ip_address: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
        user_agent: request.headers.get('user-agent') || 'unknown'
      }
    })

    return NextResponse.json(
      { message: 'Senha alterada com sucesso' },
      { status: 200 }
    )

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Change password error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}