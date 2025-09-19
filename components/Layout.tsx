"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, User, Calendar, Settings, LogOut, Menu, X } from "lucide-react"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-gray-900">FOLISSA+</h1>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              Meu Perfil
            </Button>
            <Button variant="ghost" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`bg-white border-r border-gray-200 w-64 fixed h-full md:static transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-200 ease-in-out z-20 md:z-0 flex flex-col`}
        >
          <div className="flex-1 p-4 space-y-1">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="/">
                <Home className="h-4 w-4 mr-2" />
                Início
              </a>
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              <User className="h-4 w-4 mr-2" />
              Perfil
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="/appointments">
                <Calendar className="h-4 w-4 mr-2" />
                Consultas
              </a>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
          </div>
          
          {/* Botão Sair - Agora posicionado corretamente */}
          <div className="p-4 border-t border-gray-200 mt-auto">
            <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 ml-0 md:ml-0">
          {/* Overlay for mobile sidebar */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">F</span>
              </div>
              <span className="text-sm font-medium">FOLISSA+ © 2024</span>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                Termos
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                Privacidade
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                Contato
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}   