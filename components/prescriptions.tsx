"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, User, Pill } from "lucide-react"

export default function PrescriptionsPage() {
  // Dados de exemplo para receitas
  const prescriptions = [
    {
      id: 1,
      date: "2024-10-15",
      doctor: "Dr. José Guimarães",
      medication: "Losartana 50mg",
      dosage: "1 comprimido ao dia",
      duration: "30 dias"
    },
    {
      id: 2,
      date: "2024-09-22",
      doctor: "Dra. Maria Fernandes",
      medication: "Hidratante corporal",
      dosage: "Aplicar 2x ao dia",
      duration: "Uso contínuo"
    },
    {
      id: 3,
      date: "2024-08-10",
      doctor: "Dr. Carlos Santos",
      medication: "Aspirina 100mg",
      dosage: "1 comprimido ao dia",
      duration: "30 dias"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Receitas Médicas</h1>
        <p className="text-gray-600 mt-2">Suas prescrições e medicamentos</p>
      </div>

      {/* Receitas Ativas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Pill className="h-5 w-5 mr-2 text-green-600" />
            Receitas Ativas
          </CardTitle>
          <CardDescription>Medicamentos em uso no momento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {prescriptions.map((prescription) => (
              <div key={prescription.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="font-medium">{prescription.medication}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-1" />
                      <span>{prescription.doctor}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(prescription.date).toLocaleDateString('pt-MZ')}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{prescription.dosage}</p>
                    <p className="text-xs text-gray-500">{prescription.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Histórico de Receitas */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Receitas</CardTitle>
          <CardDescription>Prescrições médicas anteriores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Pill className="h-12 w-12 mx-auto text-gray-300" />
            <p className="mt-2">Nenhuma receita anterior encontrada</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}