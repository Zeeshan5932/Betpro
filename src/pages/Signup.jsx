import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'
import { supabase } from '../lib/supabase'
import Header from '../components/Header'
import AuthLayout from '../components/AuthLayout'
import DownloadCard from '../components/DownloadCard'
import WhatsAppButton from '../components/WhatsAppButton'
import Footer from '../components/Footer'
import LoadingButton from '../components/LoadingButton'

export default function Signup() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const validateForm = () => {
    if (!fullName.trim()) {
      setError('Full Name is required')
      return false
    }
    if (!email.trim()) {
      setError('Email is required')
      return false
    }
    if (!whatsapp.trim()) {
      setError('WhatsApp number is required')
      return false
    }
    if (!password.trim()) {
      setError('Password is required')
      return false
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    return true
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')

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
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (signUpError) {
        throw signUpError
      }

      if (authData?.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              full_name: fullName,
              email,
              whatsapp,
              created_at: new Date().toISOString(),
            },
          ])

        if (profileError) {
          throw profileError
        }

        setSuccessMessage('Account created successfully! Please check your email to confirm your account.')
        setFullName('')
        setEmail('')
        setWhatsapp('')
        setPassword('')

        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          setTimeout(() => navigate('/dashboard'), 2000)
        }
      }
    } catch (err) {
      setError(err.message || 'An error occurred during signup')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
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
      setError(err.message || 'Failed to sign up with Google')
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
            <h2 className="text-white font-bold text-xl mb-6">Register your Betpro account</h2>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="input-field"
                disabled={loading}
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                disabled={loading}
              />

              <input
                type="tel"
                placeholder="WhatsApp Number"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
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
                Sign up
              </LoadingButton>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-600"></div>
              <span className="text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-600"></div>
            </div>

            <button
              onClick={handleGoogleSignup}
              disabled={loading}
              className="btn-white flex items-center justify-center gap-2 mb-4"
            >
              <FaGoogle size={18} />
              Continue with Google
            </button>

            <p className="text-gray-400 text-sm text-center mb-3">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/signin')}
                className="text-accent hover:underline font-semibold"
                disabled={loading}
              >
                Sign in
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
