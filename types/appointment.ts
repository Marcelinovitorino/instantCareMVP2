// src/types/appointment.ts
export interface AppointmentFormData {
  patientName: string
  service: string
  doctor: string
  hospital: string
  date: string
  time: string
}

export interface AppointmentData {
  consultationCode: string
  patientName: string
  service: string
  doctor: string
  hospital: string
  dateTime: string
}

export interface AIRecommendation {
  time: string
  reason: string
  confidence: number
  waitTime: string
}