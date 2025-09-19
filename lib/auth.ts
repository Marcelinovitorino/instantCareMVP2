import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export async function getUserIdFromToken(request: NextRequest): Promise<number | null> {
  try {
    const token = request.cookies.get('token')?.value
    
    if (!token) {
      return null
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number }
    return decoded.userId

  } catch (error) {
    return null
  }
}

export function verifyJWT(token: string): { userId: number; email: string } {
  return jwt.verify(token, process.env.JWT_SECRET!) as { userId: number; email: string }
}