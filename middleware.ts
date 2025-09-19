// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/login', '/register', '/forgot-password', '/reset-password']
const protectedRoutes = ['/', '/profile', '/settings', '/history', '/prescriptions']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value

  // Se tentar acessar rota protegida sem token
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Se tentar acessar rota pública com token
  if (publicRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// src/middleware.ts - Atualize a configuração
export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/profile/:path*',
    '/settings/:path*',
    '/history/:path*',
    '/prescriptions/:path*',
    '/api/appointments/:path*',
    '/api/prescriptions/:path*',
    '/api/medical-history/:path*',
    '/api/medical-exams/:path*',
    '/api/settings/:path*',
    '/api/health-metrics/:path*',
    '/api/reminders/:path*'
  ]
}