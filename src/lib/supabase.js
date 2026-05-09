import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabase = null

try {
  if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('your_')) {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
  } else {
    console.warn('⚠️ Supabase not configured. UI will load but authentication will not work.')
    // Create a dummy client that will show errors
    supabase = {
      auth: {
        signUp: async () => {
          throw new Error('Supabase not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env')
        },
        signInWithPassword: async () => {
          throw new Error('Supabase not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env')
        },
        signInWithOAuth: async () => {
          throw new Error('Supabase not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env')
        },
        signOut: async () => {
          throw new Error('Supabase not configured.')
        },
        getSession: async () => ({ data: { session: null } }),
        onAuthStateChange: () => ({ data: { subscription: null } }),
      },
      from: () => ({
        insert: async () => ({ error: { message: 'Supabase not configured' } }),
        select: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      }),
    }
  }
} catch (error) {
  console.error('Error initializing Supabase:', error.message)
  // Create dummy client
  supabase = {
    auth: {
      signUp: async () => {
        throw new Error('Supabase initialization failed: ' + error.message)
      },
      signInWithPassword: async () => {
        throw new Error('Supabase initialization failed: ' + error.message)
      },
      signInWithOAuth: async () => {
        throw new Error('Supabase initialization failed: ' + error.message)
      },
      signOut: async () => {
        throw new Error('Supabase initialization failed')
      },
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: () => ({ data: { subscription: null } }),
    },
    from: () => ({
      insert: async () => ({ error: { message: 'Supabase not configured' } }),
      select: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
    }),
  }
}

export { supabase }
