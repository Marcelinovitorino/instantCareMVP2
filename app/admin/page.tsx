"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LayoutDashboard,
  Users,
  Building2,
  Calendar,
  BarChart3,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Activity,
  TrendingUp,
  UserCheck,
  Clock,
  CheckCircle,
  Edit,
  Trash2,
  Filter,
  Download,
  Shield,
  Mail,
  Phone,
  MapPin,
  Star,
  Plus,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userFilter, setUserFilter] = useState("all")
  const [hospitalFilter, setHospitalFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [hospitalSearchTerm, setHospitalSearchTerm] = useState("")

  const navigationItems = [
    { id: "overview", label: "Visão Geral", icon: LayoutDashboard },
    { id: "users", label: "Gestão de Usuários", icon: Users },
    { id: "hospitals", label: "Gestão de Hospitais", icon: Building2 },
    { id: "appointments", label: "Agendamentos", icon: Calendar },
    { id: "analytics", label: "Análises e Relatórios", icon: BarChart3 },
    { id: "monitoring", label: "Monitoramento", icon: Activity },
    { id: "settings", label: "Configurações", icon: Settings },
  ]

  const stats = [
    {
      title: "Total de Usuários",
      value: "12,847",
      change: "+12.5%",
      trend: "up",
      description: "Usuários ativos no sistema",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Consultas Hoje",
      value: "1,247",
      change: "+8.2%",
      trend: "up",
      description: "Consultas agendadas",
      icon: Calendar,
      color: "text-green-600",
    },
    {
      title: "Tempo de Atividade",
      value: "99.9%",
      change: "0%",
      trend: "stable",
      description: "Disponibilidade nos últimos 30 dias",
      icon: Activity,
      color: "text-emerald-600",
    },
    {
      title: "Tempo de Resposta",
      value: "245ms",
      change: "-15.3%",
      trend: "down",
      description: "Tempo médio de resposta da API",
      icon: Clock,
      color: "text-orange-600",
    },
  ]

  const recentActivity = [
    {
      type: "user",
      message: "Novo registro de usuário: Ana Beatriz",
      time: "há 2 min",
      status: "success",
    },
    {
      type: "appointment",
      message: "Consulta confirmada: José Guimarães",
      time: "há 5 min",
      status: "success",
    },
    {
      type: "system",
      message: "Backup da base de dados concluído",
      time: "há 15 min",
      status: "info",
    },
    {
      type: "alert",
      message: "Alta carga do servidor detectada",
      time: "há 1 hora",
      status: "warning",
    },
  ]

  const users = [
    {
      id: 1,
      name: "Ana Beatriz",
      email: "ana.beatriz@email.com",
      phone: "+258 84 123 4567",
      role: "Patient",
      status: "Active",
      joinDate: "2024-01-15",
      lastLogin: "2024-01-18 14:30",
      appointments: 3,
    },
    {
      id: 2,
      name: "Dr. José Guimarães",
      email: "jose.guimaraes@hospital.com",
      phone: "+258 82 987 6543",
      role: "Doctor",
      status: "Active",
      joinDate: "2023-08-20",
      lastLogin: "2024-01-18 09:15",
      appointments: 45,
    },
    {
      id: 3,
      name: "Helena Hills",
      email: "helena.hills@support.com",
      phone: "+258 87 456 7890",
      role: "Support",
      status: "Active",
      joinDate: "2023-12-10",
      lastLogin: "2024-01-18 16:45",
      appointments: 0,
    },
    {
      id: 4,
      name: "Maria Santos",
      email: "maria.santos@email.com",
      phone: "+258 85 234 5678",
      role: "Patient",
      status: "Inactive",
      joinDate: "2023-11-05",
      lastLogin: "2024-01-10 11:20",
      appointments: 1,
    },
    {
      id: 5,
      name: "Dr. Carlos Mendes",
      email: "carlos.mendes@hospital.com",
      phone: "+258 83 345 6789",
      role: "Doctor",
      status: "Active",
      joinDate: "2023-09-15",
      lastLogin: "2024-01-18 08:00",
      appointments: 38,
    },
  ]

  const hospitals = [
    {
      id: 1,
      name: "Hospital Central de Maputo",
      address: "Av. Agostinho Neto, Maputo",
      phone: "+258 21 431 720",
      email: "info@hcm.gov.mz",
      type: "Public",
      status: "Active",
      rating: 4.2,
      doctors: 45,
      departments: 12,
      beds: 350,
      joinDate: "2020-01-15",
      lastUpdate: "2024-01-18 10:30",
    },
    {
      id: 2,
      name: "Clínica Sommerschield",
      address: "Av. Julius Nyerere, Maputo",
      phone: "+258 21 492 797",
      email: "info@clinicasommerschield.co.mz",
      type: "Private",
      status: "Active",
      rating: 4.8,
      doctors: 28,
      departments: 8,
      beds: 120,
      joinDate: "2021-03-20",
      lastUpdate: "2024-01-18 14:15",
    },
    {
      id: 3,
      name: "Hospital Militar de Maputo",
      address: "Av. das FPLM, Maputo",
      phone: "+258 21 430 130",
      email: "info@hospitalmilitar.gov.mz",
      type: "Military",
      status: "Active",
      rating: 4.0,
      doctors: 32,
      departments: 10,
      beds: 200,
      joinDate: "2020-08-10",
      lastUpdate: "2024-01-17 16:45",
    },
    {
      id: 4,
      name: "Clínica Girassol",
      address: "Av. Vladimir Lenine, Maputo",
      phone: "+258 21 303 200",
      email: "info@clinicagirassol.co.mz",
      type: "Private",
      status: "Pending",
      rating: 4.5,
      doctors: 15,
      departments: 6,
      beds: 80,
      joinDate: "2024-01-10",
      lastUpdate: "2024-01-18 09:20",
    },
    {
      id: 5,
      name: "Hospital José Macamo",
      address: "Av. de Moçambique, Maputo",
      phone: "+258 21 431 531",
      email: "info@hjm.gov.mz",
      type: "Public",
      status: "Inactive",
      rating: 3.8,
      doctors: 38,
      departments: 11,
      beds: 280,
      joinDate: "2020-05-25",
      lastUpdate: "2024-01-15 11:10",
    },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesFilter = userFilter === "all" || user.role.toLowerCase() === userFilter.toLowerCase()
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesFilter = hospitalFilter === "all" || hospital.type.toLowerCase() === hospitalFilter.toLowerCase()
    const matchesSearch =
      hospital.name.toLowerCase().includes(hospitalSearchTerm.toLowerCase()) ||
      hospital.address.toLowerCase().includes(hospitalSearchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "doctor":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "patient":
        return "bg-green-100 text-green-800 border-green-200"
      case "support":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    return status === "Active"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200"
  }

  const getHospitalTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "public":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "private":
        return "bg-green-100 text-green-800 border-green-200"
      case "military":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getHospitalStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-gray-800 border-r border-gray-700 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-2xl font-bold">
              InstantCare <span className="text-blue-400">Admin</span>
            </h1>
          </div>
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left transition-colors",
                      activeTab === item.id
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    )}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <h1 className="text-xl font-bold">
                  InstantCare <span className="text-blue-400">Admin</span>
                </h1>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id)
                        setSidebarOpen(false)
                      }}
                      className={cn(
                        "group flex items-center px-2 py-2 text-base font-medium rounded-md w-full text-left transition-colors",
                        activeTab === item.id
                          ? "bg-blue-600 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      )}
                    >
                      <Icon className="mr-4 h-6 w-6" />
                      {item.label}
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Header */}
        <div className="bg-gray-800 shadow-sm border-b border-gray-700 sticky top-0 z-40">
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-300 hover:text-white">
                <Menu className="h-6 w-6" />
              </button>
              <div className="hidden sm:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Pesquisar..."
                    className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 w-64"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold text-white">Painel de Controle</h1>
                <p className="text-gray-400 mt-2">Monitor your InstantCare system performance and metrics</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <Card key={index} className="bg-gray-800 border-gray-700">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                            <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                            <div className="flex items-center mt-2">
                              <TrendingUp
                                className={cn(
                                  "h-4 w-4 mr-1",
                                  stat.trend === "up"
                                    ? "text-green-500"
                                    : stat.trend === "down"
                                      ? "text-red-500"
                                      : "text-gray-400",
                                )}
                              />
                              <span
                                className={cn(
                                  "text-sm font-medium",
                                  stat.trend === "up"
                                    ? "text-green-500"
                                    : stat.trend === "down"
                                      ? "text-red-500"
                                      : "text-gray-400",
                                )}
                              >
                                {stat.change}
                              </span>
                            </div>
                          </div>
                          <Icon className={cn("h-8 w-8", stat.color)} />
                        </div>
                        <p className="text-xs text-gray-500 mt-3">{stat.description}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Charts and Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* System Performance Chart */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">System Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gray-900 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Activity className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                        <p className="text-gray-400">Performance metrics visualization</p>
                        <p className="text-sm text-gray-500 mt-2">Real-time system monitoring</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div
                            className={cn(
                              "w-2 h-2 rounded-full mt-2",
                              activity.status === "success"
                                ? "bg-green-500"
                                : activity.status === "warning"
                                  ? "bg-yellow-500"
                                  : activity.status === "info"
                                    ? "bg-blue-500"
                                    : "bg-gray-500",
                            )}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white">{activity.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-lg">User Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-white">+2,847</p>
                        <p className="text-sm text-gray-400">New users this month</p>
                      </div>
                      <UserCheck className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-lg">Appointments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-white">15,247</p>
                        <p className="text-sm text-gray-400">Total this month</p>
                      </div>
                      <Calendar className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-lg">System Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-green-400">Healthy</p>
                        <p className="text-sm text-gray-400">Todos os sistemas operacionais</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* User Management Section */}
          {activeTab === "users" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white">Gestão de Usuários</h1>
                  <p className="text-gray-400 mt-2">Gerir usuários, funções e permissões</p>
                </div>
                <div className="mt-4 sm:mt-0 flex space-x-3">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Usuário
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>

              {/* User Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-400">Total de Usuários</p>
                        <p className="text-2xl font-bold text-white mt-2">12,847</p>
                      </div>
                      <Users className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-400">Médicos</p>
                        <p className="text-2xl font-bold text-white mt-2">247</p>
                      </div>
                      <Shield className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-400">Pacientes</p>
                        <p className="text-2xl font-bold text-white mt-2">12,456</p>
                      </div>
                      <UserCheck className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-400">Usuários Ativos</p>
                        <p className="text-2xl font-bold text-white mt-2">1,847</p>
                      </div>
                      <Activity className="h-8 w-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Filters and Search */}
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Pesquisar usuários por nome ou email..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        />
                      </div>
                    </div>
                    <Select value={userFilter} onValueChange={setUserFilter}>
                      <SelectTrigger className="w-full sm:w-48 bg-gray-700 border-gray-600 text-white">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filtrar por função" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="all">Todas as Funções</SelectItem>
                        <SelectItem value="patient">Pacientes</SelectItem>
                        <SelectItem value="doctor">Médicos</SelectItem>
                        <SelectItem value="support">Suporte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Users Table */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Users ({filteredUsers.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-700">
                          <TableHead className="text-gray-300">User</TableHead>
                          <TableHead className="text-gray-300">Contact</TableHead>
                          <TableHead className="text-gray-300">Role</TableHead>
                          <TableHead className="text-gray-300">Status</TableHead>
                          <TableHead className="text-gray-300">Appointments</TableHead>
                          <TableHead className="text-gray-300">Last Login</TableHead>
                          <TableHead className="text-gray-300">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map((user) => (
                          <TableRow key={user.id} className="border-gray-700">
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                                  <span className="text-sm font-medium text-white">
                                    {user.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </span>
                                </div>
                                <div>
                                  <p className="text-white font-medium">{user.name}</p>
                                  <p className="text-gray-400 text-sm">Joined {user.joinDate}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center text-gray-300">
                                  <Mail className="h-4 w-4 mr-2" />
                                  <span className="text-sm">{user.email}</span>
                                </div>
                                <div className="flex items-center text-gray-300">
                                  <Phone className="h-4 w-4 mr-2" />
                                  <span className="text-sm">{user.phone}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={cn("border", getRoleColor(user.role))}>{user.role}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={cn("border", getStatusColor(user.status))}>{user.status}</Badge>
                            </TableCell>
                            <TableCell>
                              <span className="text-white">{user.appointments}</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-gray-300 text-sm">{user.lastLogin}</span>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="ghost" className="text-gray-300 hover:text-white">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Hospital Management Section */}
          {activeTab === "hospitals" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white">Gestão de Hospitais</h1>
                  <p className="text-gray-400 mt-2">Gerir hospitais, clínicas e centros de saúde</p>
                </div>
                <div className="mt-4 sm:mt-0 flex space-x-3">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Hospital
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>

              {/* Hospital Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-400">Total de Hospitais</p>
                        <p className="text-2xl font-bold text-white mt-2">47</p>
                      </div>
                      <Building2 className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-400">Hospitais Públicos</p>
                        <p className="text-2xl font-bold text-white mt-2">28</p>
                      </div>
                      <Shield className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-400">Hospitais Privados</p>
                        <p className="text-2xl font-bold text-white mt-2">19</p>
                      </div>
                      <UserCheck className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-400">Hospitais Militares</p>
                        <p className="text-2xl font-bold text-white mt-2">5</p>
                      </div>
                      <Activity className="h-8 w-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Filters and Search */}
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Pesquisar hospitais por nome ou localização..."
                          value={hospitalSearchTerm}
                          onChange={(e) => setHospitalSearchTerm(e.target.value)}
                          className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        />
                      </div>
                    </div>
                    <Select value={hospitalFilter} onValueChange={setHospitalFilter}>
                      <SelectTrigger className="w-full sm:w-48 bg-gray-700 border-gray-600 text-white">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filtrar por tipo" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="all">Todos os Tipos</SelectItem>
                        <SelectItem value="public">Público</SelectItem>
                        <SelectItem value="private">Privado</SelectItem>
                        <SelectItem value="military">Militar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Hospitals Table */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Hospitais ({filteredHospitals.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-700">
                          <TableHead className="text-gray-300">Nome</TableHead>
                          <TableHead className="text-gray-300">Tipo</TableHead>
                          <TableHead className="text-gray-300">Localização</TableHead>
                          <TableHead className="text-gray-300">Telefone</TableHead>
                          <TableHead className="text-gray-300">Avaliação</TableHead>
                          <TableHead className="text-gray-300">Capacidade</TableHead>
                          <TableHead className="text-gray-300">Status</TableHead>
                          <TableHead className="text-gray-300">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredHospitals.map((hospital) => (
                          <TableRow key={hospital.id} className="border-gray-700">
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                                  <Building2 className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                  <p className="text-white font-medium">{hospital.name}</p>
                                  <div className="flex items-center text-gray-400 text-sm mt-1">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    <span>{hospital.address}</span>
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={cn("border", getHospitalTypeColor(hospital.type))}>
                                {hospital.type}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center text-gray-300">
                                  <Mail className="h-4 w-4 mr-2" />
                                  <span className="text-sm">{hospital.email}</span>
                                </div>
                                <div className="flex items-center text-gray-300">
                                  <Phone className="h-4 w-4 mr-2" />
                                  <span className="text-sm">{hospital.phone}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                                <span className="text-white">{hospital.rating}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="text-white text-sm">{hospital.beds} beds</div>
                                <div className="text-gray-400 text-xs">{hospital.doctors} doctors</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={cn("border", getHospitalStatusColor(hospital.status))}>
                                {hospital.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="ghost" className="text-gray-300 hover:text-white">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Hospital Performance Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Hospitais Mais Bem Avaliados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {hospitals
                        .sort((a, b) => b.rating - a.rating)
                        .slice(0, 3)
                        .map((hospital, index) => (
                          <div key={hospital.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-white">{index + 1}</span>
                              </div>
                              <div>
                                <p className="text-white font-medium">{hospital.name}</p>
                                <p className="text-gray-400 text-sm">{hospital.type}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                              <span className="text-white">{hospital.rating}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Distribuição por Categoria</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Hospitais Públicos</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-700 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                          </div>
                          <span className="text-white text-sm">28</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Hospitais Privados</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-700 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: "40%" }}></div>
                          </div>
                          <span className="text-white text-sm">19</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Hospitais Militares</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-700 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: "20%" }}></div>
                          </div>
                          <span className="text-white text-sm">5</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Other sections placeholder */}
          {activeTab !== "overview" && activeTab !== "users" && activeTab !== "hospitals" && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-white mb-2">
                {navigationItems.find((nav) => nav.id === activeTab)?.label}
              </h2>
              <p className="text-gray-400">Esta seção estará disponível em breve.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
