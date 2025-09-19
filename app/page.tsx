"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, User, Star, Calendar, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import AppointmentBooking from "@/components/appointment-booking"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { id: "home", label: "Início", icon: Home },
    { id: "appointments", label: "Consultas", icon: Calendar },
    { id: "profile", label: "Perfil", icon: User },
  ]

  const categories = [
    { name: "Pediatria", color: "bg-blue-100 text-blue-700" },
    { name: "Dentista", color: "bg-green-100 text-green-700" },
    { name: "Terapia", color: "bg-purple-100 text-purple-700" },
  ]

  const doctors = [
    {
      name: "Suzana Lima",
      specialty: "Especialista em pediatria é a escolha ideal para o seu filho",
      image: "/female-doctor-pediatrician.jpg",
      rating: 4.9,
      reviews: 245,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-2xl font-bold">
              Instant<span className="text-blue-600">Care</span>
            </h1>
          </div>
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left",
                      activeTab === item.id
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
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
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
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
                <h1 className="text-2xl font-bold">
                  Instant<span className="text-blue-600">Care</span>
                </h1>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id)
                        setSidebarOpen(false)
                      }}
                      className={cn(
                        "group flex items-center px-2 py-2 text-base font-medium rounded-md w-full text-left",
                        activeTab === item.id
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
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
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => setSidebarOpen(true)} className="text-gray-500 hover:text-gray-900">
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg sm:text-xl font-bold">
              Instant<span className="text-blue-600">Care</span>
            </h1>
            <div className="w-6 h-6" /> {/* Spacer for alignment */}
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 pb-16 lg:pb-0">
          {activeTab === "home" && (
            <div className="px-4 py-6 lg:px-8">
              {/* Welcome Section - Enhanced mobile responsiveness */}
              <div className="bg-instantcare-gradient rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-xl sm:text-2xl font-bold mb-2">Seja</h2>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                    Bem vindo á <span className="text-blue-200">InstantCare.</span>
                  </h3>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-white/10 to-transparent" />
                <img
                  src="/female-doctor-smiling.png"
                  alt="Doctor"
                  className="absolute right-2 sm:right-4 top-2 sm:top-4 h-24 w-24 sm:h-32 sm:w-32 object-cover rounded-full border-4 border-white/20"
                />
              </div>

              {/* Doctors Section - Improved mobile layout */}
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Os melhores médicos.</h3>

                  {doctors.map((doctor, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-4 bg-blue-50 rounded-xl"
                    >
                      <img
                        src={doctor.image || "/placeholder.svg"}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover mx-auto sm:mx-0"
                      />
                      <div className="flex-1 text-center sm:text-left">
                        <h4 className="font-semibold text-gray-900 mb-1">{doctor.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{doctor.specialty}</p>
                        <div className="flex items-center justify-center sm:justify-start space-x-2">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium ml-1">{doctor.rating}</span>
                          </div>
                          <span className="text-sm text-gray-500">({doctor.reviews} avaliações)</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
                        onClick={() => setActiveTab("appointments")}
                      >
                        Marque uma consulta
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Appointment Booking */}
          {activeTab === "appointments" && (
            <div className="h-full">
              <AppointmentBooking />
            </div>
          )}

          {/* Other tab content */}
          {activeTab !== "home" && activeTab !== "appointments" && (
            <div className="px-4 py-6 lg:px-8">
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {navigation.find((nav) => nav.id === activeTab)?.label}
                </h2>
                <p className="text-gray-600">Esta seção será implementada em breve.</p>
              </div>
            </div>
          )}
        </main>

        <div className="lg:hidden bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50">
          <div className="flex justify-around py-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "flex flex-col items-center py-2 px-1 text-xs font-medium min-w-0 flex-1",
                    activeTab === item.id ? "text-blue-600" : "text-gray-500",
                  )}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="mt-1 truncate text-[10px] sm:text-xs">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
