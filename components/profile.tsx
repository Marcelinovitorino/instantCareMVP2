"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { User, Calendar, Clock, MapPin, Stethoscope, Edit3, Save, X, FileText, Heart, Pill } from "lucide-react"

interface UserData {
  name: string
  email: string
  phone: string
  birthDate: string
  gender: string
  address: string
  emergencyContact: string
  bloodType: string
}

interface Appointment {
  id: string
  consultationCode: string
  doctor: string
  specialty: string
  hospital: string
  date: string
  time: string
  status: "completed" | "scheduled" | "cancelled"
  diagnosis?: string
  prescription?: string[]
  notes?: string
}

export default function UserProfile() {
  const [userData, setUserData] = useState<UserData>({
    name: "Ana Beatriz",
    email: "ana.beatriz@email.com",
    phone: "+258 84 123 4567",
    birthDate: "1990-05-15",
    gender: "Feminino",
    address: "Av. 25 de Setembro, Maputo",
    emergencyContact: "+258 82 987 6543",
    bloodType: "A+"
  })

  const [isEditing, setIsEditing] = useState(false)
  const [tempUserData, setTempUserData] = useState<UserData>(userData)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const appointmentHistory: Appointment[] = [
    {
      id: "1",
      consultationCode: "CONS-092056",
      doctor: "Dr. José Guimarães",
      specialty: "Clínica Geral",
      hospital: "Hospital Central de Maputo",
      date: "2024-10-15",
      time: "14:30 - 15:30",
      status: "completed",
      diagnosis: "Hipertensão estágio 1",
      prescription: ["Losartana 50mg - 1x ao dia", "Hidroclorotiazida 25mg - 1x ao dia"],
      notes: "Paciente orientada sobre redução de sal na alimentação e prática regular de exercícios físicos."
    },
    {
      id: "2",
      consultationCode: "CONS-078431",
      doctor: "Dra. Maria Fernandes",
      specialty: "Dermatologia",
      hospital: "Centro de Saúde A",
      date: "2024-09-22",
      time: "10:00 - 10:30",
      status: "completed",
      diagnosis: "Dermatite atópica",
      prescription: ["Hidratante corporal - 2x ao dia", "Corticóide tópico - 1x ao dia (aplicar nas lesões)"],
      notes: "Agendar retorno em 30 dias para acompanhamento."
    },
    {
      id: "3",
      consultationCode: "CONS-105728",
      doctor: "Dr. Carlos Santos",
      specialty: "Cardiologia",
      hospital: "Hospital Central de Maputo",
      date: "2024-11-28",
      time: "11:00 - 12:00",
      status: "scheduled"
    }
  ]

  const handleEdit = () => {
    setTempUserData(userData)
    setIsEditing(true)
  }

  const handleSave = () => {
    setUserData(tempUserData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setTempUserData({ ...tempUserData, [name]: value })
  }

  const openAppointmentDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsModalOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Realizada</Badge>
      case "scheduled":
        return <Badge className="bg-blue-500">Agendada</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">Cancelada</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Meu Perfil</h1>
        <p className="text-gray-600">Gerencie suas informações pessoais e visualize seu histórico de consultas</p>
      </div>

      {/* User Information Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5 text-blue-600" />
            <span>Informações Pessoais</span>
          </CardTitle>
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <Edit3 className="h-4 w-4 mr-2" />
              Editar
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome Completo</Label>
              {isEditing ? (
                <Input
                  id="name"
                  name="name"
                  value={tempUserData.name}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              ) : (
                <div className="mt-1 p-2 border border-transparent rounded-md">{userData.name}</div>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              {isEditing ? (
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={tempUserData.email}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              ) : (
                <div className="mt-1 p-2 border border-transparent rounded-md">{userData.email}</div>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Telefone</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  name="phone"
                  value={tempUserData.phone}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              ) : (
                <div className="mt-1 p-2 border border-transparent rounded-md">{userData.phone}</div>
              )}
            </div>

            <div>
              <Label htmlFor="birthDate">Data de Nascimento</Label>
              {isEditing ? (
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={tempUserData.birthDate}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              ) : (
                <div className="mt-1 p-2 border border-transparent rounded-md">
                  {new Date(userData.birthDate).toLocaleDateString('pt-MZ')}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="gender">Gênero</Label>
              {isEditing ? (
                <select
                  id="gender"
                  name="gender"
                  value={tempUserData.gender}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                >
                  <option value="Feminino">Feminino</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Outro">Outro</option>
                  <option value="Prefiro não informar">Prefiro não informar</option>
                </select>
              ) : (
                <div className="mt-1 p-2 border border-transparent rounded-md">{userData.gender}</div>
              )}
            </div>

            <div>
              <Label htmlFor="bloodType">Tipo Sanguíneo</Label>
              {isEditing ? (
                <select
                  id="bloodType"
                  name="bloodType"
                  value={tempUserData.bloodType}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              ) : (
                <div className="mt-1 p-2 border border-transparent rounded-md">{userData.bloodType}</div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="address">Endereço</Label>
            {isEditing ? (
              <Input
                id="address"
                name="address"
                value={tempUserData.address}
                onChange={handleInputChange}
                className="mt-1"
              />
            ) : (
              <div className="mt-1 p-2 border border-transparent rounded-md">{userData.address}</div>
            )}
          </div>

          <div>
            <Label htmlFor="emergencyContact">Contato de Emergência</Label>
            {isEditing ? (
              <Input
                id="emergencyContact"
                name="emergencyContact"
                value={tempUserData.emergencyContact}
                onChange={handleInputChange}
                className="mt-1"
              />
            ) : (
              <div className="mt-1 p-2 border border-transparent rounded-md">{userData.emergencyContact}</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Appointment History Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span>Histórico de Consultas</span>
          </CardTitle>
          <CardDescription>
            Visualize o histórico de suas consultas médicas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointmentHistory.map((appointment) => (
              <div 
                key={appointment.id} 
                className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => openAppointmentDetails(appointment)}
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Stethoscope className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">{appointment.doctor}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {new Date(appointment.date).toLocaleDateString('pt-MZ')} • {appointment.time}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{appointment.hospital}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    {getStatusBadge(appointment.status)}
                    <span className="text-sm font-mono text-gray-500">{appointment.consultationCode}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Appointment Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedAppointment && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span>Detalhes da Consulta</span>
                </DialogTitle>
                <DialogDescription>
                  {selectedAppointment.consultationCode}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Médico</Label>
                    <p className="font-medium">{selectedAppointment.doctor}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Especialidade</Label>
                    <p>{selectedAppointment.specialty}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Data e Hora</Label>
                    <p>
                      {new Date(selectedAppointment.date).toLocaleDateString('pt-MZ')} • {selectedAppointment.time}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Local</Label>
                    <p>{selectedAppointment.hospital}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Status</Label>
                    <div className="mt-1">{getStatusBadge(selectedAppointment.status)}</div>
                  </div>
                </div>

                {selectedAppointment.diagnosis && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500 flex items-center space-x-2 mb-2">
                      <Heart className="h-4 w-4" />
                      <span>Diagnóstico</span>
                    </Label>
                    <p className="bg-gray-50 p-3 rounded-md">{selectedAppointment.diagnosis}</p>
                  </div>
                )}

                {selectedAppointment.prescription && selectedAppointment.prescription.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500 flex items-center space-x-2 mb-2">
                      <Pill className="h-4 w-4" />
                      <span>Prescrição Médica</span>
                    </Label>
                    <ul className="bg-gray-50 p-3 rounded-md space-y-1">
                      {selectedAppointment.prescription.map((med, index) => (
                        <li key={index} className="text-sm">• {med}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedAppointment.notes && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Observações</Label>
                    <p className="bg-gray-50 p-3 rounded-md">{selectedAppointment.notes}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}