# Betpro Wallet - Complete Setup Guide

## ✅ Project Successfully Created!

Your complete React + Vite + Tailwind CSS Betpro Wallet application is ready. All files have been generated and the development server is running.

## 📁 Project Structure

```
f:\Betpro/
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Top navigation header with logo
│   │   ├── Footer.jsx              # Footer with payment methods
│   │   ├── AuthLayout.jsx          # Layout wrapper for auth pages
│   │   ├── DownloadCard.jsx        # App download promotion card
│   │   ├── WhatsAppButton.jsx      # Floating WhatsApp button
│   │   ├── ProtectedRoute.jsx      # Route protection for logged-in users
│   │   └── LoadingButton.jsx       # Reusable button with loading state
│   ├── pages/
│   │   ├── Signup.jsx              # User registration page
│   │   ├── Signin.jsx              # User login page
│   │   └── Dashboard.jsx           # Protected user dashboard
│   ├── lib/
│   │   └── supabase.js             # Supabase client configuration
│   ├── App.jsx                     # Main app with routing
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Tailwind styles
├── index.html                      # HTML entry point
├── .env                            # Environment variables (your credentials)
├── .env.example                    # Template for env variables
├── package.json                    # Dependencies
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS config
├── postcss.config.js               # PostCSS config
└── README.md                       # Project documentation
```

## 🚀 Getting Started

### Step 1: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and sign in or create an account
2. Create a new project
3. Go to **Settings > API** and copy:
   - **Project URL** 
   - **Anonymous Key (anon key)**

### Step 2: Configure Environment Variables

Edit `f:\Betpro\.env` with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anonymous-key
```

### Step 3: Create Database Tables

In your Supabase project:

1. Go to **SQL Editor**
2. Create a new query
3. Run this SQL:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  whatsapp TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);
```

### Step 4: Enable Google OAuth (Optional but Recommended)

1. In Supabase, go to **Authentication > Providers**
2. Click **Google**
3. Get Google OAuth credentials from [Google Cloud Console](https://console.cloud.google.com/)
4. Enable the following APIs:
   - Google+ API
   - Google Identity Service
5. Create OAuth 2.0 credentials (Web application)
6. Add authorized redirect URIs:
   - `https://your-project-id.supabase.co/auth/v1/callback`
   - `http://localhost:5173/` (for local development)
   - `http://localhost:5174/` (for local development alternative port)
7. Add your Google Client ID and Secret in Supabase

### Step 5: Run Development Server

The server is already running on **http://localhost:5174** (or port 5173 if available).

To restart it manually:
```bash
cd f:\Betpro
npm run dev
```

## 📝 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 🎨 Design Colors Used

```
Header Navy:    #263957
Card Navy:      #17213d
Deep Dark:      #1f2947
Primary Blue:   #6683d7
Success Green:  #59bf64
Accent Cyan:    #6ef7e7
White:          #ffffff
```

## 🔐 Features Implemented

### Authentication
- ✅ Email/Password Signup
- ✅ Email/Password Signin
- ✅ Google OAuth (Sign up or Sign in)
- ✅ Automatic profile creation on signup
- ✅ Secure password handling (stored only in Supabase Auth)

### User Features
- ✅ User registration with Full Name, Email, WhatsApp
- ✅ Protected Dashboard (requires login)
- ✅ User profile display
- ✅ Logout functionality
- ✅ Automatic redirect based on auth state

### UI Components
- ✅ Responsive Header with logo
- ✅ Beautiful auth cards (Signup/Signin)
- ✅ Download app promotion card
- ✅ Floating WhatsApp button
- ✅ Dark theme footer with payment methods
- ✅ Form validation with error messages
- ✅ Loading states on buttons

### Responsiveness
- ✅ Mobile-first design
- ✅ Desktop layout (max-width cards)
- ✅ Tablet optimization
- ✅ Touch-friendly interface

## 🔌 API Endpoints Used

The app uses Supabase API endpoints for:
- User authentication (signup, signin, logout, OAuth)
- Session management
- Profile data storage and retrieval

## 📱 Routes

- `/` - Redirects to `/signup`
- `/signup` - User registration page
- `/signin` - User login page
- `/dashboard` - Protected user dashboard (requires login)
- `/*` - Redirects to `/signup`

## 🛡️ Security Features

- ✅ Protected routes (ProtectedRoute component)
- ✅ Session-based authentication
- ✅ Environment variables for sensitive data
- ✅ Supabase Row Level Security (RLS) policies
- ✅ Password stored only in Supabase Auth
- ✅ OAuth for third-party authentication

## 🐛 Testing the Application

### Test Signup:
1. Visit `http://localhost:5174/signup`
2. Fill in all fields
3. Click "Sign up"
4. Check email confirmation (if enabled in Supabase)
5. Should redirect to dashboard on success

### Test Signin:
1. Visit `http://localhost:5174/signin`
2. Enter email and password
3. Click "Sign in"
4. Should redirect to dashboard on success

### Test Google OAuth:
1. Click "Continue with Google" button
2. Select Google account
3. Should create profile and redirect to dashboard

### Test Protected Route:
1. Without logging in, try to access `http://localhost:5174/dashboard`
2. Should redirect to signin page

### Test Logout:
1. Log in to dashboard
2. Click "Logout" button
3. Should redirect to signin page

## 🚨 Troubleshooting

### Issue: "Missing Supabase environment variables"
**Solution**: Check that `.env` file exists and has:
```
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

### Issue: Port 5173/5174 already in use
**Solution**: The app will automatically use the next available port. Check terminal output for the actual URL.

### Issue: Google OAuth redirects to wrong page
**Solution**: Verify redirect URIs in Google Cloud Console and Supabase match your app URL.

### Issue: Can't insert data into profiles table
**Solution**: 
1. Check if `profiles` table exists in Supabase
2. Verify RLS policies allow inserts
3. Ensure user ID matches auth.users(id)

### Issue: Supabase connection fails
**Solution**:
1. Verify VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are correct
2. Check if Supabase project is active
3. Check network connectivity

## 📚 Documentation Links

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Supabase Documentation](https://supabase.com/docs)
- [React Router Documentation](https://reactrouter.com)
- [React Icons Documentation](https://react-icons.github.io/react-icons/)

## 🎯 Next Steps

1. ✅ Install dependencies (Done)
2. ✅ Set up Supabase project (In Progress)
3. ✅ Configure environment variables (In Progress)
4. ✅ Create database tables (In Progress)
5. ✅ Enable Google OAuth (Optional - In Progress)
6. ✅ Test all features
7. Deploy to production (Firebase Hosting, Vercel, Netlify, etc.)

## 📦 Dependencies Installed

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.18.0",
  "@supabase/supabase-js": "^2.38.0",
  "react-icons": "^4.12.0",
  "tailwindcss": "^3.3.6"
}
```

## 🎓 Learning Resources

- How to use Supabase with React: The app uses the `supabase.js` client in `src/lib/`
- Protected routes: See `ProtectedRoute.jsx` for pattern
- Form handling: Check `Signup.jsx` and `Signin.jsx` for patterns
- State management: Uses React hooks (useState, useEffect)
- Routing: React Router v6 with dynamic redirects

## 💡 Customization Ideas

- Add email verification page
- Implement password reset
- Add user profile editing
- Create admin dashboard
- Add notifications
- Implement 2FA
- Add payment integration
- Create mobile app version

## 📞 Support

For issues:
1. Check the Troubleshooting section above
2. Review console logs (F12 in browser)
3. Check Supabase dashboard for errors
4. Verify environment variables
5. Check React Router and Supabase documentation

---

**Project Created**: May 9, 2025  
**Version**: 1.0.0  
**Status**: ✅ Ready for Development
