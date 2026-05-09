import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "../lib/supabase";

import Header from "../components/Header";
import AuthLayout from "../components/AuthLayout";
import DownloadCard from "../components/DownloadCard";
import WhatsAppButton from "../components/WhatsAppButton";
import Footer from "../components/Footer";

export default function Signin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        navigate("/dashboard");
      }
    };

    checkSession();
  }, [navigate]);

  const validateForm = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }

    if (!password.trim()) {
      setError("Password is required");
      return false;
    }

    return true;
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
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
            <h2 className="text-white font-bold text-[20px] mb-5">
              Login to Betpro wallet
            </h2>

            {error && (
              <div className="mb-3 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSignin} className="space-y-3">
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

              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? "Please wait..." : "Sign in"}
              </button>
            </form>

            <div className="text-right mt-[20px]">
              <button
                type="button"
                className="text-white text-[14px] font-medium hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <p className="auth-small-text mt-[6px] mb-[17px]">
              Don&apos;t have an account?
            </p>

            <button
              type="button"
              onClick={() => navigate("/signup")}
              disabled={loading || googleLoading}
              className="btn-green"
            >
              Create account
            </button>

            <button
              type="button"
              onClick={handleGoogleSignin}
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