import Layout from '@/components/Layout'
import UserSettings from '@/components/user-settings'


export default function SettingsPage() {
  return (
    <Layout>
      <UserSettings />
    </Layout>
  )
}

export const dynamic = 'force-dynamic'