"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Phone } from "lucide-react"

export default function AuthPage() {
  const [email, setEmail] = useState("")

  return (
    <div className="min-h-screen bg-instantcare-light-gradient flex flex-col">
      {/* Header */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="max-w-md mx-auto w-full space-y-8">
          {/* Logo and Welcome */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">
              Instant<span className="text-blue-200">Care</span>
            </h1>
            <p className="text-blue-100 text-lg">Não espere para cuidar da sua saúde.</p>
          </div>

          {/* Auth Form */}
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8 space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold text-gray-900">Crie a sua conta</h2>
                <p className="text-gray-600">Digite o seu e-mail para criar uma conta</p>
              </div>

              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="email@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-base"
                />

                <Button
                  className="w-full h-12 bg-instantcare-gradient hover:opacity-90 text-white font-medium text-base"
                  size="lg"
                >
                  Continuar
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">ou</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button variant="outline" className="w-full h-12 text-base font-medium bg-transparent" size="lg">
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continuar com o Google
                </Button>

                <Button variant="outline" className="w-full h-12 text-base font-medium bg-transparent" size="lg">
                  <Phone className="w-5 h-5 mr-3" />
                  Continuar com o número de telefone
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center leading-relaxed">
                Ao clicar em continuar, estará concordando com os{" "}
                <span className="text-blue-600 underline">Termos de serviço</span> e{" "}
                <span className="text-blue-600 underline">Políticas de privacidade</span>.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="h-32 bg-gradient-to-t from-blue-600/20 to-transparent" />
    </div>
  )
}
