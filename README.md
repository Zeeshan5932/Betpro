# Betpro Wallet

A modern, responsive React + Vite + Tailwind CSS web application for Betpro Wallet with secure authentication, database integration, and a beautiful UI.

## Features

- ✨ Modern, responsive design with Tailwind CSS
- 🔐 Secure authentication with Supabase
- 👤 User profile management
- 🔑 Email/password authentication
- 🔑 Google OAuth integration
- 📱 Mobile-first responsive layout
- 🎨 Dark theme with custom color scheme
- 💬 WhatsApp integration
- 📲 Download app promotion card
- 🛡️ Protected routes for authenticated users

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Routing**: React Router DOM v6
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Icons**: React Icons
- **Styling**: Tailwind CSS

## Project Structure

```
betpro-wallet/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── AuthLayout.jsx
│   │   ├── DownloadCard.jsx
│   │   ├── WhatsAppButton.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── LoadingButton.jsx
│   ├── pages/
│   │   ├── Signup.jsx
│   │   ├── Signin.jsx
│   │   └── Dashboard.jsx
│   ├── lib/
│   │   └── supabase.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── .env.example
├── .gitignore
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── index.html
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Get your project URL and anonymous key from the project settings
3. Create the following database table:

**Table: `profiles`**

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  whatsapp TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

4. Enable Google OAuth in Supabase:
   - Go to Authentication > Providers
   - Enable Google
   - Add your Google OAuth credentials

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env`
2. Fill in your Supabase credentials:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features Walkthrough

### Authentication

- **Signup**: Users can register with email, password, full name, and WhatsApp number
- **Signin**: Users can log in with email and password
- **Google OAuth**: One-click sign up/sign in with Google
- **Auto Profile Creation**: User profiles are automatically created upon signup

### Protected Dashboard

- Only logged-in users can access the dashboard
- Displays user information
- Shows profile details
- Logout functionality

### Responsive Design

- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface
- Adaptive layout

## Color Scheme

```
Header Navy: #263957
Card Navy: #17213d
Deep Dark: #1f2947
Primary Blue: #6683d7
Success Green: #59bf64
Accent Cyan: #6ef7e7
White: #ffffff
```

## Database Schema

### profiles table

```
- id (UUID, Primary Key)
- full_name (TEXT)
- email (TEXT)
- whatsapp (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## Error Handling

The application includes comprehensive error handling:
- Form validation
- Supabase error messages
- Loading states
- User-friendly error messages

## Performance

- Code splitting with Vite
- Optimized bundle size
- Fast page transitions
- Minimal dependencies

## Troubleshooting

### "Missing Supabase environment variables"
Make sure you have created the `.env` file and filled in your Supabase credentials.

### "Cannot read property 'session'"
This usually means there's a connection issue with Supabase. Check your environment variables.

### Google OAuth not working
Ensure you have:
1. Configured Google OAuth in Supabase
2. Set the correct redirect URL
3. Added valid Google OAuth credentials

## Security

- Passwords are never stored in the database
- All sensitive operations use Supabase Auth
- Protected routes prevent unauthorized access
- Environment variables keep secrets safe

## Future Enhancements

- Email verification
- Password reset functionality
- User profile editing
- Two-factor authentication
- Advanced dashboard features

## Support

For issues or questions, please contact Betpro Exchange.

## License

This project is proprietary to Betpro Exchange.

---

**Version**: 1.0.0  
**Last Updated**: 2025
