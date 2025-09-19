"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Stethoscope, User, ArrowRight, Bell, CalendarDays, Heart, TrendingUp } from "lucide-react"

export default function HomePage() {
  // Dados de exemplo para a dashboard
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. José Guimarães",
      specialty: "Clínica Geral",
      date: "2024-11-21",
      time: "14:30 - 15:30",
      hospital: "Hospital Central de Maputo",
      status: "confirmado"
    },
    {
      id: 2,
      doctor: "Dra. Maria Fernandes",
      specialty: "Dermatologia",
      date: "2024-12-05",
      time: "10:00 - 10:30",
      hospital: "Centro de Saúde A",
      status: "pendente"
    }
  ]

  const healthStats = [
    { name: "Pressão Arterial", value: "120/80 mmHg", status: "normal" },
    { name: "Frequência Cardíaca", value: "72 bpm", status: "normal" },
    { name: "Açúcar no Sangue", value: "98 mg/dL", status: "normal" },
  ]

  const quickActions = [
    { title: "Agendar Consulta", icon: Calendar, description: "Marque uma nova consulta", link: "/appointments" },
    { title: "Ver Receitas", icon: Heart, description: "Acesse suas receitas médicas", link: "/prescriptions" },
    { title: "Histórico", icon: TrendingUp, description: "Visualize seu histórico médico", link: "/history" },
    { title: "Meu Perfil", icon: User, description: "Gerencie suas informações", link: "/profile" },
  ]

  return (
    <div className="space-y-6">
      {/* Header da Home */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Bem-vindo de volta, Ana!</h1>
        <p className="text-gray-600 mt-2">Aqui está um resumo da sua saúde e agendamentos</p>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {healthStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`rounded-full px-2 py-1 text-xs ${stat.status === 'normal' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {stat.status === 'normal' ? 'Normal' : 'Atenção'}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ações Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>Acesse rapidamente as funcionalidades principais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <Button key={index} variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" asChild>
                      <a href={action.link}>
                        <Icon className="h-6 w-6 mb-2 text-blue-600" />
                        <span className="font-medium">{action.title}</span>
                        <span className="text-xs text-gray-500 mt-1">{action.description}</span>
                      </a>
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Próximas Consultas */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Próximas Consultas</CardTitle>
                <CardDescription>Suas consultas agendadas</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <a href="/appointments">
                  Ver todas <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardHeader>
            <CardContent>
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-start p-3 border rounded-lg">
                      <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                        <CalendarDays className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{appointment.doctor}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${appointment.status === 'confirmado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {appointment.status === 'confirmado' ? 'Confirmado' : 'Pendente'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{appointment.specialty}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{new Date(appointment.date).toLocaleDateString('pt-MZ')}</span>
                          <Clock className="h-4 w-4 ml-3 mr-1" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{appointment.hospital}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Stethoscope className="h-12 w-12 text-gray-300 mx-auto" />
                  <p className="mt-2 text-gray-500">Nenhuma consulta agendada</p>
                  <Button className="mt-4" asChild>
                    <a href="/appointments">Agendar primeira consulta</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Coluna lateral */}
        <div className="space-y-6">
          {/* Lembretes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-blue-600" />
                Lembretes
              </CardTitle>
              <CardDescription>Suas notificações importantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium">Consulta com cardiologista</p>
                  <p className="text-xs text-gray-600">Em 2 dias - 10:00 AM</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm font-medium">Tomar medicamento</p>
                  <p className="text-xs text-gray-600">Todos os dias - 08:00 AM</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium">Exame de sangue</p>
                  <p className="text-xs text-gray-600">Próxima semana</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dicas de Saúde */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2 text-red-600" />
                Dicas de Saúde
              </CardTitle>
              <CardDescription>Cuide bem da sua saúde</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm">Hidratação</h4>
                  <p className="text-xs text-gray-600">Beba pelo menos 2L de água por dia</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm">Atividade Física</h4>
                  <p className="text-xs text-gray-600">30 minutos de exercício 5x por semana</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm">Alimentação</h4>
                  <p className="text-xs text-gray-600">Prefira alimentos naturais e evite processados</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Atendimento de Emergência */}
          <Card className="bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-700">Atendimento de Emergência</CardTitle>
              <CardDescription className="text-red-600">Em caso de urgência</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm font-medium">SAMU: 119</p>
                <p className="text-sm font-medium">Bombeiros: 198</p>
                <p className="text-sm font-medium">Polícia: 190</p>
                <Button variant="outline" className="w-full mt-3 text-red-700 border-red-300" size="sm">
                  Ligar para emergência
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}