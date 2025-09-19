import ResetPasswordForm from '@/components/auth/ResetPasswordForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">FOLISSA+</h1>
          <p className="mt-2 text-gray-600">Redefinir senha</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Redefinir senha</CardTitle>
            <CardDescription>
              Digite sua nova senha abaixo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResetPasswordForm />
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Voltar para o login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}