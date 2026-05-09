import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'
import { supabase } from '../lib/supabase'
import Header from '../components/Header'
import AuthLayout from '../components/AuthLayout'
import DownloadCard from '../components/DownloadCard'
import WhatsAppButton from '../components/WhatsAppButton'
import Footer from '../components/Footer'
import LoadingButton from '../components/LoadingButton'

export default function Signin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        navigate('/dashboard')
      }
    }
    checkSession()
  }, [navigate])

  const validateForm = () => {
    if (!email.trim()) {
      setError('Email is required')
      return false
    }
    if (!password.trim()) {
      setError('Password is required')
      return false
    }
    return true
  }

  const handleSignin = async (e) => {
    e.preventDefault()
    setError('')

    // Check if Supabase is configured
    if (import.meta.env.VITE_SUPABASE_URL?.includes('placeholder')) {
      setError('⚠️ Supabase not configured yet. Please set up your .env file with Supabase credentials to enable authentication.')
      return
    }

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        throw signInError
      }

      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignin = async () => {
    setError('')
    setLoading(true)

    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      })

      if (oauthError) {
        throw oauthError
      }
    } catch (err) {
      setError(err.message || 'Failed to sign in with Google')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <WhatsAppButton />

      <AuthLayout>
        <div className="flex flex-col items-center gap-8">
          <div className="auth-card">
            <h2 className="text-white font-bold text-xl mb-6">Sign in to your Betpro account</h2>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSignin} className="space-y-4">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                disabled={loading}
              />

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                disabled={loading}
              />

              <LoadingButton
                loading={loading}
                type="submit"
                className="btn-primary"
              >
                Sign in
              </LoadingButton>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-600"></div>
              <span className="text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-600"></div>
            </div>

            <button
              onClick={handleGoogleSignin}
              disabled={loading}
              className="btn-white flex items-center justify-center gap-2 mb-4"
            >
              <FaGoogle size={18} />
              Continue with Google
            </button>

            <p className="text-gray-400 text-sm text-center mb-3">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="text-accent hover:underline font-semibold"
                disabled={loading}
              >
                Sign up
              </button>
            </p>
          </div>

          <DownloadCard />
        </div>
      </AuthLayout>

      <Footer />
    </div>
  )
}
