import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import LoadingButton from '../components/LoadingButton'

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [signingOut, setSigningOut] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()

        if (!session) {
          navigate('/signin')
          return
        }

        setUser(session.user)

        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching profile:', error)
        }

        if (profileData) {
          setProfile(profileData)
        }
      } catch (error) {
        console.error('Error:', error)
        navigate('/signin')
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [navigate])

  const handleLogout = async () => {
    setSigningOut(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      navigate('/signin')
    } catch (error) {
      console.error('Error signing out:', error)
      setSigningOut(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Loading...</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <WhatsAppButton />

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full bg-navy-dark rounded-lg p-8 card-shadow">
          <h2 className="text-white font-bold text-2xl mb-6">Welcome! 🎉</h2>

          <div className="space-y-4 mb-8">
            <div className="bg-navy-deeper rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Email</p>
              <p className="text-white font-semibold break-all">{user?.email}</p>
            </div>

            {profile?.full_name && (
              <div className="bg-navy-deeper rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">Name</p>
                <p className="text-white font-semibold">{profile.full_name}</p>
              </div>
            )}

            {profile?.whatsapp && (
              <div className="bg-navy-deeper rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">WhatsApp</p>
                <p className="text-white font-semibold">{profile.whatsapp}</p>
              </div>
            )}

            {profile?.created_at && (
              <div className="bg-navy-deeper rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">Joined</p>
                <p className="text-white font-semibold">
                  {new Date(profile.created_at).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          <LoadingButton
            loading={signingOut}
            onClick={handleLogout}
            className="btn-primary"
          >
            Logout
          </LoadingButton>
        </div>
      </div>

      <Footer />
    </div>
  )
}
