import Layout from '@/components/Layout'
import UserProfile from '@/components/history'

export default function ProfilePage() {
  return (
    <Layout>
      <UserProfile />
    </Layout>
  )
}

export const dynamic = 'force-dynamic'