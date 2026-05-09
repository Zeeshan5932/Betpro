# Supabase Setup Verification Checklist

## ✅ Step 1: Run Updated SQL in Supabase
1. Go to **Supabase Dashboard** → **SQL Editor**
2. Copy entire content from `DATABASE_TRIGGER_SETUP.sql`
3. **Paste aur Run karo** (Ctrl+Enter)
4. **Output mein koi error na ho** - check karo

## ✅ Step 2: Verify Profiles Table Structure
1. Go to **Supabase Dashboard** → **Table Editor**
2. Select **profiles** table
3. **Columns verify karo:**
   - `id` (UUID, Primary Key) ✓
   - `full_name` (Text) ✓
   - `email` (Text) ✓
   - `whatsapp` (Text) ✓
   - `created_at` (Timestamp) ✓

## ✅ Step 3: Check RLS Policies
1. Go to **Supabase Dashboard** → **Authentication** → **Policies**
2. Select **profiles** table
3. **Verify 4 policies exist:**
   - ✓ "Enable insert for authenticated users"
   - ✓ "Users can select own profile"
   - ✓ "Users can update own profile"
   - ✓ "Users can delete own profile"

## ✅ Step 4: Test Signup
1. **Clear browser cache** (Ctrl+Shift+Delete)
2. Go to signup page
3. Fill form:
   - Full Name: Test User
   - Email: test@example.com
   - WhatsApp: 1234567890
   - Password: test123
4. Click **Sign up**
5. **Check Supabase:**
   - Go to **Authentication** tab → check if user created ✓
   - Go to **Table Editor** → **profiles** → check if row added ✓

## 🔍 Troubleshooting

### Issue: User created but profile not saved
**Solution 1:**
- Check if trigger ran (check logs in Functions)
- Code mein fallback `createProfileFallback()` automatically try karega

**Solution 2:**
- Open browser DevTools (F12)
- Go to **Console** tab
- Check for error messages
- Copy full error and show here

**Solution 3:**
- Go to Supabase → **SQL Editor**
- Run this query:
```sql
SELECT COUNT(*) FROM auth.users;
SELECT COUNT(*) FROM public.profiles;
```
- Dono count same hone chahiye

### Issue: RLS Error "row-level security policy"
**Solution:**
- Run SQL again from `DATABASE_TRIGGER_SETUP.sql`
- Make sure all DROP POLICY statements run without error
- Policies must be exact as shown

## 📝 Important Notes

1. **Email verification:** Agar email verification enabled hai Supabase settings mein, to user redirect nahi hoga dashboard par jab tak email confirm na kare
2. **Trigger timing:** Trigger automatically 500ms wait karta hai (in code) for profile creation
3. **Fallback:** Agar trigger fail ho to code manually profile create karega

## Need Help?

1. Copy **Signup Error Message** from browser console
2. Check **Supabase Logs** (Functions section)
3. Run the verification queries above
4. Report with all details
