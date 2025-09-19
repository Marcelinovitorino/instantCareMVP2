import Layout from '@/components/Layout'

import AppointmentBooking from "@/components/appointment-booking"

export default function AppointmentPage() {
  return (
    <Layout>
      <AppointmentBooking />
    </Layout>
  )
}

export const dynamic = 'force-dynamic'