import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { supabase } from "../lib/supabase";

import Header from "../components/Header";
import AuthLayout from "../components/AuthLayout";
import DownloadCard from "../components/DownloadCard";
import WhatsAppButton from "../components/WhatsAppButton";
import Footer from "../components/Footer";

export default function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    if (!fullName.trim()) {
      setError("Full Name is required");
      return false;
    }

    if (!email.trim()) {
      setError("Email is required");
      return false;
    }

    if (!whatsapp.trim()) {
      setError("WhatsApp number is required");
      return false;
    }

    if (!password.trim()) {
      setError("Password is required");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const { data: authData, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (signUpError) throw signUpError;

      if (authData?.user) {
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: authData.user.id,
            full_name: fullName,
            email,
            whatsapp,
            created_at: new Date().toISOString(),
          },
        ]);

        if (profileError) throw profileError;

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          navigate("/dashboard");
        } else {
          setSuccessMessage(
            "Account created successfully! Please check your email to confirm your account."
          );
        }
      }
    } catch (err) {
      setError(err.message || "An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (oauthError) throw oauthError;
    } catch (err) {
      setError(err.message || "Failed to continue with Google");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <WhatsAppButton />

      <AuthLayout>
        <div className="flex flex-col items-center gap-5 w-full px-1 sm:px-4">
          <div className="auth-card">
            <h2 className="text-white font-normal text-[22px] mb-5">
              Register your Betpro account
            </h2>

            {error && (
              <div className="mb-3 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="mb-3 p-2 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="input-field"
                disabled={loading}
              />

              <div className="relative">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pr-10"
                  disabled={loading}
                />

                <MdEmail className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 text-[18px]" />
              </div>

              <input
                type="tel"
                placeholder="Whatsapp Number"
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

              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? "Please wait..." : "Sign up"}
              </button>
            </form>

            <p className="auth-small-text mt-5 mb-4">
              Already have an account?
            </p>

            <button
              type="button"
              onClick={() => navigate("/signin")}
              disabled={loading || googleLoading}
              className="btn-green"
            >
              Sign in
            </button>

            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={loading || googleLoading}
              className="btn-white flex items-center justify-center gap-3 mt-4"
            >
              <FcGoogle size={23} />
              {googleLoading ? "Please wait..." : "Continue with Google"}
            </button>
          </div>

          <DownloadCard />
        </div>
      </AuthLayout>

      <Footer />
    </div>
  );
}