"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Stethoscope, ArrowLeft, Edit3, Brain, Clock, TrendingUp } from "lucide-react"

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

const services = [
  "Checkup geral",
  "Consulta de pediatria",
  "Consulta de cardiologia",
  "Consulta de dermatologia",
  "Consulta de ginecologia",
  "Consulta de oftalmologia",
]

const doctors = ["José guimarães", "Ana Silva", "Carlos Santos", "Maria Fernandes", "João Pereira"]

const timeSlots = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
]

export default function AppointmentBooking() {
  const [step, setStep] = useState<"form" | "confirmation">("form")
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    consultationCode: "092056",
    patientName: "Ana Beatriz",
    service: "Checkup geral",
    doctor: "José guimarães",
    hospital: "Hospital Central de Maputo",
    dateTime: "Nov 21, 14:30 - 15:30",
  })

  const [formData, setFormData] = useState({
    patientName: "Ana Beatriz",
    service: "Checkup geral",
    doctor: "José guimarães",
    hospital: "Hospital Central de Maputo",
    date: "2024-11-21",
    time: "14:30",
  })

  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([])
  const [showAIRecommendations, setShowAIRecommendations] = useState(false)
  const [isLoadingAI, setIsLoadingAI] = useState(false)

  const generateAIRecommendations = async () => {
    setIsLoadingAI(true)

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const recommendations: AIRecommendation[] = [
      {
        time: "09:00",
        reason: "Menor tempo de espera baseado no histórico",
        confidence: 95,
        waitTime: "5-10 min",
      },
      {
        time: "14:30",
        reason: "Horário preferido do médico selecionado",
        confidence: 88,
        waitTime: "10-15 min",
      },
      {
        time: "10:30",
        reason: "Baixa ocupação hospitalar neste período",
        confidence: 82,
        waitTime: "15-20 min",
      },
    ]

    setAiRecommendations(recommendations)
    setIsLoadingAI(false)
    setShowAIRecommendations(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAppointmentData({
      ...appointmentData,
      ...formData,
      dateTime: `Nov 21, ${formData.time} - ${getEndTime(formData.time)}`,
    })
    setStep("confirmation")
  }

  const getEndTime = (startTime: string) => {
    const [hours, minutes] = startTime.split(":").map(Number)
    const endHours = hours + 1
    return `${endHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
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
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-900">{appointmentData.patientName}</span>
                    <Button variant="ghost" size="sm" className="p-1">
                      <Edit3 className="h-4 w-4 text-blue-600" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-600">Serviço</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-900">{appointmentData.service}</span>
                    <Button variant="ghost" size="sm" className="p-1">
                      <Edit3 className="h-4 w-4 text-blue-600" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-600">Médico</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-900">{appointmentData.doctor}</span>
                    <Button variant="ghost" size="sm" className="p-1">
                      <Edit3 className="h-4 w-4 text-blue-600" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-600">Hospital/ Centro de Saúde</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-900">{appointmentData.hospital}</span>
                    <Button variant="ghost" size="sm" className="p-1">
                      <Edit3 className="h-4 w-4 text-blue-600" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-600">Data e Hora</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-900">{appointmentData.dateTime}</span>
                    <Button variant="ghost" size="sm" className="p-1">
                      <Edit3 className="h-4 w-4 text-blue-600" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Doctor Image */}
              <div className="flex justify-center">
                <div className="relative">
                  <img
                    src="/female-doctor-pediatrician.jpg"
                    alt="Doctors"
                    className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-600 rounded-full" />
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

            <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-base" size="lg">
              Marcar consulta
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
                  {services.map((service) => (
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
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor} value={doctor}>
                      {doctor}
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
                  <SelectItem value="Hospital Central de Maputo">Hospital Central de Maputo</SelectItem>
                  <SelectItem value="Centro de Saúde A">Centro de Saúde A</SelectItem>
                  <SelectItem value="Centro de Saúde B">Centro de Saúde B</SelectItem>
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
                disabled={isLoadingAI}
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
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
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
                  {timeSlots.map((time) => (
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
        >
          Continuar para Confirmação
        </Button>
      </form>
    </div>
  )
}
