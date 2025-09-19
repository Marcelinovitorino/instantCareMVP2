"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Stethoscope, ArrowLeft, Edit3, Brain, Clock, TrendingUp, Loader2 } from "lucide-react"

interface AppointmentData {
  consultationCode: string
  patientName: string
  service: string
  doctor: string
  hospital: string
  dateTime: string
}

interface AIRecommendation {
  time: string
  reason: string
  confidence: number
  waitTime: string
}

interface AppointmentOptions {
  services: string[]
  doctors: Array<{ id: number; name: string; specialty: string }>
  hospitals: Array<{ id: number; name: string; address?: string }>
  timeSlots: string[]
}

export default function AppointmentBooking() {
  const [step, setStep] = useState<"form" | "confirmation">("form")
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    consultationCode: "",
    patientName: "",
    service: "",
    doctor: "",
    hospital: "",
    dateTime: "",
  })

  const [formData, setFormData] = useState({
    patientName: "",
    service: "",
    doctor: "",
    hospital: "",
    date: "",
    time: "",
  })

  const [options, setOptions] = useState<AppointmentOptions>({
    services: [],
    doctors: [],
    hospitals: [],
    timeSlots: []
  })

  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([])
  const [showAIRecommendations, setShowAIRecommendations] = useState(false)
  const [isLoadingAI, setIsLoadingAI] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    fetchOptions()
    fetchUserData()
  }, [])

  const fetchOptions = async () => {
    try {
      const response = await fetch('/api/appointments/options')
      if (response.ok) {
        const data = await response.json()
        setOptions(data)
      }
    } catch (error) {
      console.error('Erro ao buscar opções:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const data = await response.json()
        setFormData(prev => ({ ...prev, patientName: data.user.name }))
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error)
    }
  }

  const generateAIRecommendations = async () => {
    setIsLoadingAI(true)
    setError("")

    try {
      const response = await fetch('/api/appointments/ai-recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctor: formData.doctor,
          hospital: formData.hospital,
          date: formData.date
        }),
      })

      if (response.ok) {
        const recommendations = await response.json()
        setAiRecommendations(recommendations)
        setShowAIRecommendations(true)
      } else {
        setError("Erro ao gerar recomendações")
      }
    } catch (error) {
      setError("Erro de conexão")
    } finally {
      setIsLoadingAI(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const appointment = await response.json()
        setAppointmentData(appointment)
        setStep("confirmation")
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Erro ao agendar consulta")
      }
    } catch (error) {
      setError("Erro de conexão")
    } finally {
      setIsSubmitting(false)
    }
  }

  const confirmAppointment = async () => {
    // Lógica para confirmar o agendamento
    router.push('/')
  }

  const getEndTime = (startTime: string) => {
    const [hours, minutes] = startTime.split(":").map(Number)
    const endHours = hours + 1
    return `${endHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (step === "confirmation") {
    return (
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="ghost" size="sm" onClick={() => setStep("form")} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl sm:text-2xl font-bold text-blue-600">Agendamento</h1>
        </div>

        {/* Appointment Details */}
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-600">Código da consulta</Label>
                  <span className="text-sm text-gray-500">{appointmentData.consultationCode}</span>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-600">Em nome de</Label>
                  <span className="text-sm text-gray-900">{appointmentData.patientName}</span>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-600">Serviço</Label>
                  <span className="text-sm text-gray-900">{appointmentData.service}</span>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-600">Médico</Label>
                  <span className="text-sm text-gray-900">{appointmentData.doctor}</span>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-600">Hospital/ Centro de Saúde</Label>
                  <span className="text-sm text-gray-900">{appointmentData.hospital}</span>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-600">Data e Hora</Label>
                  <span className="text-sm text-gray-900">{appointmentData.dateTime}</span>
                </div>
              </div>

              {/* Doctor Image */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 sm:w-48 sm:h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Stethoscope className="h-12 w-12 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700 text-center leading-relaxed">
                Assim que confirmar o agendamento da consulta, será enviada para si uma notificação no dia da consulta
                para o recordar
              </p>
            </div>

            <Button 
              onClick={confirmAppointment}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-base" 
              size="lg"
            >
              Confirmar Agendamento
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Agendar Consulta</h1>
        <p className="text-gray-600">Preencha os dados para agendar sua consulta</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-600" />
              <span>Dados do Paciente</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="patientName">Nome do Paciente</Label>
              <Input
                id="patientName"
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                className="mt-1"
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Stethoscope className="h-5 w-5 text-blue-600" />
              <span>Detalhes da Consulta</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="service">Tipo de Serviço</Label>
              <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecione o serviço" />
                </SelectTrigger>
                <SelectContent>
                  {options.services.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="doctor">Médico</Label>
              <Select value={formData.doctor} onValueChange={(value) => setFormData({ ...formData, doctor: value })}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecione o médico" />
                </SelectTrigger>
                <SelectContent>
                  {options.doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.name}>
                      {doctor.name} - {doctor.specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="hospital">Hospital/Centro de Saúde</Label>
              <Select
                value={formData.hospital}
                onValueChange={(value) => setFormData({ ...formData, hospital: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecione o hospital" />
                </SelectTrigger>
                <SelectContent>
                  {options.hospitals.map((hospital) => (
                    <SelectItem key={hospital.id} value={hospital.name}>
                      {hospital.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span>Data e Horário</span>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={generateAIRecommendations}
                disabled={isLoadingAI || !formData.doctor || !formData.hospital || !formData.date}
                className="flex items-center space-x-2 bg-transparent"
              >
                <Brain className="h-4 w-4" />
                <span className="hidden sm:inline">IA Recomenda</span>
                <span className="sm:hidden">IA</span>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="mt-1"
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {showAIRecommendations && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Brain className="h-4 w-4 text-blue-600" />
                  <Label className="text-sm font-medium text-blue-600">Recomendações da IA</Label>
                </div>
                <div className="grid gap-2">
                  {aiRecommendations.map((rec, index) => (
                    <div
                      key={index}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                      onClick={() => setFormData({ ...formData, time: rec.time })}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">{rec.time}</span>
                          <Badge variant="secondary" className="text-xs">
                            {rec.confidence}% confiança
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <TrendingUp className="h-3 w-3" />
                          <span>{rec.waitTime}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600">{rec.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isLoadingAI && (
              <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                  <span className="text-sm text-blue-600">IA analisando melhores horários...</span>
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="time">Horário</Label>
              <Select value={formData.time} onValueChange={(value) => setFormData({ ...formData, time: value })}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecione o horário" />
                </SelectTrigger>
                <SelectContent>
                  {options.timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Button
          type="submit"
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-base"
          size="lg"
          disabled={isSubmitting || !formData.patientName || !formData.service || !formData.doctor || !formData.hospital || !formData.date || !formData.time}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Agendando...
            </>
          ) : (
            'Continuar para Confirmação'
          )}
        </Button>
      </form>
    </div>
  )
}