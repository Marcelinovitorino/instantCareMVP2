"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Calendar, Clock, MapPin, Stethoscope, Edit3, Save, X, FileText, Heart, Pill, Loader2 } from "lucide-react"

interface UserData {
  id: number
  name: string
  email: string
  phone: string | null
  birth_date: string | null
  gender: string | null
  address: string | null
  emergency_contact: string | null
  blood_type: string | null
}

interface Appointment {
  id: number
  consultation_code: string
  doctor: {
    name: string
    specialty: string
  }
  hospital: {
    name: string
  }
  scheduled_date: string
  start_time: string
  end_time: string
  status: "scheduled" | "completed" | "cancelled" | "no_show"
  diagnosis: string | null
  notes: string | null
}

interface Prescription {
  id: number
  issue_date: string
  doctor: {
    name: string
  }
  medications: {
    medication_name: string
    dosage: string | null
    frequency: string | null
    duration: string | null
    instructions: string | null
  }[]
}

export default function UserProfile() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [tempUserData, setTempUserData] = useState<Partial<UserData>>({})
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  useEffect(() => {
    fetchUserData()
    fetchAppointments()
    fetchPrescriptions()
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const data = await response.json()
        setUserData(data.user)
        setTempUserData(data.user)
      } else if (response.status === 401) {
        router.push('/login')
      }
    } catch (error) {
      setError("Erro ao carregar dados do usuário")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/appointments?status=completed&limit=10')
      if (response.ok) {
        const data = await response.json()
        setAppointments(data.appointments)
      }
    } catch (error) {
      console.error("Erro ao carregar consultas:", error)
    }
  }

  const fetchPrescriptions = async () => {
    try {
      const response = await fetch('/api/prescriptions?limit=5')
      if (response.ok) {
        const data = await response.json()
        setPrescriptions(data.prescriptions)
      }
    } catch (error) {
      console.error("Erro ao carregar prescrições:", error)
    }
  }

  const handleEdit = () => {
    setTempUserData(userData || {})
    setIsEditing(true)
    setError("")
    setSuccess("")
  }

  const handleSave = async () => {
    if (!userData) return
    
    setIsSaving(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch(`/api/users/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tempUserData),
      })

      if (response.ok) {
        const updatedUser = await response.json()
        setUserData(updatedUser)
        setIsEditing(false)
        setSuccess("Dados atualizados com sucesso!")
        setTimeout(() => setSuccess(""), 3000)
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Erro ao atualizar dados")
      }
    } catch (error) {
      setError("Erro de conexão. Tente novamente.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setTempUserData(userData || {})
    setIsEditing(false)
    setError("")
    setSuccess("")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setTempUserData(prev => ({ ...prev, [name]: value }))
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
      case "no_show":
        return <Badge className="bg-orange-500">Não Compareceu</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-MZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert variant="destructive">
          <AlertDescription>Erro ao carregar perfil do usuário</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Meu Perfil</h1>
        <p className="text-gray-600">Gerencie suas informações pessoais e visualize seu histórico</p>
      </div>

      {/* Mensagens de status */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

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
              <Button size="sm" onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
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
                  value={tempUserData.name || ""}
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
                  value={tempUserData.email || ""}
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
                  value={tempUserData.phone || ""}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              ) : (
                <div className="mt-1 p-2 border border-transparent rounded-md">{userData.phone || "Não informado"}</div>
              )}
            </div>

            <div>
              <Label htmlFor="birth_date">Data de Nascimento</Label>
              {isEditing ? (
                <Input
                  id="birth_date"
                  name="birth_date"
                  type="date"
                  value={tempUserData.birth_date || ""}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              ) : (
                <div className="mt-1 p-2 border border-transparent rounded-md">
                  {userData.birth_date ? formatDate(userData.birth_date) : "Não informado"}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="gender">Gênero</Label>
              {isEditing ? (
                <select
                  id="gender"
                  name="gender"
                  value={tempUserData.gender || ""}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                >
                  <option value="">Selecione...</option>
                  <option value="male">Masculino</option>
                  <option value="female">Feminino</option>
                  <option value="other">Outro</option>
                  <option value="prefer_not_to_say">Prefiro não informar</option>
                </select>
              ) : (
                <div className="mt-1 p-2 border border-transparent rounded-md">
                  {userData.gender === 'male' ? 'Masculino' : 
                   userData.gender === 'female' ? 'Feminino' : 
                   userData.gender === 'other' ? 'Outro' : 
                   userData.gender === 'prefer_not_to_say' ? 'Prefiro não informar' : 
                   'Não informado'}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="blood_type">Tipo Sanguíneo</Label>
              {isEditing ? (
                <select
                  id="blood_type"
                  name="blood_type"
                  value={tempUserData.blood_type || ""}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                >
                  <option value="">Selecione...</option>
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
                <div className="mt-1 p-2 border border-transparent rounded-md">{userData.blood_type || "Não informado"}</div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="address">Endereço</Label>
            {isEditing ? (
              <Input
                id="address"
                name="address"
                value={tempUserData.address || ""}
                onChange={handleInputChange}
                className="mt-1"
              />
            ) : (
              <div className="mt-1 p-2 border border-transparent rounded-md">{userData.address || "Não informado"}</div>
            )}
          </div>

          <div>
            <Label htmlFor="emergency_contact">Contato de Emergência</Label>
            {isEditing ? (
              <Input
                id="emergency_contact"
                name="emergency_contact"
                value={tempUserData.emergency_contact || ""}
                onChange={handleInputChange}
                className="mt-1"
              />
            ) : (
              <div className="mt-1 p-2 border border-transparent rounded-md">{userData.emergency_contact || "Não informado"}</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Appointment History Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span>Últimas Consultas</span>
          </CardTitle>
          <CardDescription>
            Seu histórico de consultas médicas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div 
                  key={appointment.id} 
                  className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => openAppointmentDetails(appointment)}
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Stethoscope className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">{appointment.doctor.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {formatDate(appointment.scheduled_date)} • {appointment.start_time} - {appointment.end_time}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{appointment.hospital.name}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      {getStatusBadge(appointment.status)}
                      <span className="text-sm font-mono text-gray-500">{appointment.consultation_code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto text-gray-300" />
              <p className="mt-2">Nenhuma consulta encontrada</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Prescriptions Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Pill className="h-5 w-5 text-green-600" />
            <span>Últimas Prescrições</span>
          </CardTitle>
          <CardDescription>
            Suas prescrições médicas recentes
          </CardDescription>
        </CardHeader>
        <CardContent>
          {prescriptions.length > 0 ? (
            <div className="space-y-4">
              {prescriptions.map((prescription) => (
                <div key={prescription.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="font-medium">Prescrição #{prescription.id}</h3>
                      <p className="text-sm text-gray-600">Emitida em: {formatDate(prescription.issue_date)}</p>
                      <p className="text-sm text-gray-600">Médico: {prescription.doctor.name}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{prescription.medications.length} medicamento(s)</Badge>
                    </div>
                  </div>
                  {prescription.medications.length > 0 && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-md">
                      <h4 className="font-medium text-sm mb-2">Medicamentos:</h4>
                      <ul className="space-y-1">
                        {prescription.medications.map((med, index) => (
                          <li key={index} className="text-sm">
                            • {med.medication_name} {med.dosage && `- ${med.dosage}`}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Pill className="h-12 w-12 mx-auto text-gray-300" />
              <p className="mt-2">Nenhuma prescrição encontrada</p>
            </div>
          )}
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
                  {selectedAppointment.consultation_code}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Médico</Label>
                    <p className="font-medium">{selectedAppointment.doctor.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Especialidade</Label>
                    <p>{selectedAppointment.doctor.specialty}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Data e Hora</Label>
                    <p>
                      {formatDate(selectedAppointment.scheduled_date)} • {selectedAppointment.start_time} - {selectedAppointment.end_time}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Local</Label>
                    <p>{selectedAppointment.hospital.name}</p>
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