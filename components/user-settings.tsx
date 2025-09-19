"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Bell, Shield, Globe, Moon, MessageSquare, Mail } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Notificações
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    medicationReminders: true,
    
    // Privacidade
    dataSharing: false,
    healthRecordsAccess: "me",
    
    // Aparência
    theme: "light",
    language: "portuguese",
    
    // Conta
    email: "ana.beatriz@email.com",
    phone: "+258 84 123 4567",
  })

  const handleSwitchChange = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSelectChange = (key: keyof typeof settings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleInputChange = (key: keyof typeof settings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    // Simular salvamento das configurações
    console.log("Configurações salvas:", settings)
    // Aqui você implementaria a lógica real para salvar no backend
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600 mt-2">Gerencie suas preferências e configurações da conta</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Notificações */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-blue-600" />
                Notificações
              </CardTitle>
              <CardDescription>Controle como e quando receber notificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Notificações por Email</Label>
                  <p className="text-sm text-gray-500">Receba notificações importantes por email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={() => handleSwitchChange("emailNotifications")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">Notificações por SMS</Label>
                  <p className="text-sm text-gray-500">Receba lembretes por mensagem de texto</p>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={settings.smsNotifications}
                  onCheckedChange={() => handleSwitchChange("smsNotifications")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="appointment-reminders">Lembretes de Consultas</Label>
                  <p className="text-sm text-gray-500">Notificações antes das consultas agendadas</p>
                </div>
                <Switch
                  id="appointment-reminders"
                  checked={settings.appointmentReminders}
                  onCheckedChange={() => handleSwitchChange("appointmentReminders")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="medication-reminders">Lembretes de Medicamentos</Label>
                  <p className="text-sm text-gray-500">Alertas para tomar seus medicamentos</p>
                </div>
                <Switch
                  id="medication-reminders"
                  checked={settings.medicationReminders}
                  onCheckedChange={() => handleSwitchChange("medicationReminders")}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacidade */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-green-600" />
                Privacidade e Segurança
              </CardTitle>
              <CardDescription>Controle sua privacidade e dados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="data-sharing">Compartilhamento de Dados Anônimos</Label>
                  <p className="text-sm text-gray-500">Permitir uso de dados anônimos para pesquisas médicas</p>
                </div>
                <Switch
                  id="data-sharing"
                  checked={settings.dataSharing}
                  onCheckedChange={() => handleSwitchChange("dataSharing")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="health-records">Acesso aos Registros de Saúde</Label>
                <Select
                  value={settings.healthRecordsAccess}
                  onValueChange={(value) => handleSelectChange("healthRecordsAccess", value)}
                >
                  <SelectTrigger id="health-records">
                    <SelectValue placeholder="Quem pode acessar seus registros" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="me">Apenas eu</SelectItem>
                    <SelectItem value="doctors">Médicos autorizados</SelectItem>
                    <SelectItem value="all">Todos os profissionais de saúde</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">Controle quem pode visualizar seu histórico de saúde</p>
              </div>
            </CardContent>
          </Card>

          {/* Preferências de Conta */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-purple-600" />
                Informações de Contato
              </CardTitle>
              <CardDescription>Atualize suas informações de contato</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                <p className="text-sm text-gray-500">Seu endereço de email principal</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={settings.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
                <p className="text-sm text-gray-500">Seu número de telefone para contato</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna lateral */}
        <div className="space-y-6">
          {/* Aparência */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Moon className="h-5 w-5 mr-2 text-indigo-600" />
                Aparência
              </CardTitle>
              <CardDescription>Personalize a aparência do aplicativo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Tema</Label>
                <Select
                  value={settings.theme}
                  onValueChange={(value) => handleSelectChange("theme", value)}
                >
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Selecione um tema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Claro</SelectItem>
                    <SelectItem value="dark">Escuro</SelectItem>
                    <SelectItem value="system">Sistema</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Idioma</Label>
                <Select
                  value={settings.language}
                  onValueChange={(value) => handleSelectChange("language", value)}
                >
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Selecione um idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="portuguese">Português</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Suporte */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-orange-600" />
                Suporte
              </CardTitle>
              <CardDescription>Precisa de ajuda?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Central de Ajuda
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Enviar Feedback
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Fale Conosco
              </Button>
            </CardContent>
          </Card>

          {/* Ações Importantes */}
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-yellow-800">Ações Importantes</CardTitle>
              <CardDescription className="text-yellow-600">Operações críticas da conta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start text-yellow-700 border-yellow-300">
                Exportar Meus Dados
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 border-red-300 hover:text-red-700">
                Excluir Minha Conta
              </Button>
            </CardContent>
          </Card>

          {/* Botão Salvar */}
          <Button onClick={handleSave} className="w-full" size="lg">
            <Save className="h-4 w-4 mr-2" />
            Salvar Configurações
          </Button>
        </div>
      </div>
    </div>
  )
}