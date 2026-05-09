import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope } from "react-icons/fa";
import { supabase } from "../lib/supabase";

import Header from "../components/Header";
import AuthLayout from "../components/AuthLayout";
import DownloadCard from "../components/DownloadCard";
import VideoSection from "../components/VideoSection";
import WhatsAppButton from "../components/WhatsAppButton";
import Footer from "../components/Footer";

export default function Signin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Forgot password states
  const [forgotMode, setForgotMode] = useState(false);
  const [resetIdentifier, setResetIdentifier] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const [error, setError] = useState("");

  // Check session
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) navigate("/dashboard");
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

  // Normal email/password login
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

  // Google OAuth login
  const handleGoogleSignin = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/dashboard` },
      });
      if (oauthError) throw oauthError;
    } catch (err) {
      setError(err.message || "Failed to continue with Google");
      setGoogleLoading(false);
    }
  };

  // Forgot password submit
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setResetError("");
    setResetMessage("");

    const value = resetIdentifier.trim();
    if (!value) {
      setResetError("Email is required");
      return;
    }

    setResetLoading(true);
    try {
      const { error: resetErrorSup } = await supabase.auth.resetPasswordForEmail(
        value,
        { redirectTo: `${window.location.origin}/signin` }
      );
      if (resetErrorSup) throw resetErrorSup;
      setResetMessage("Reset link has been sent. Please check your email.");
      setResetIdentifier("");
    } catch (err) {
      setResetError(err.message || "Failed to send reset instructions");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <WhatsAppButton />

      <AuthLayout>
        <div className="flex flex-col items-center gap-5 w-full px-1 sm:px-4">
          <div className="auth-card">
            {!forgotMode ? (
              <>
                <h2 className="text-white font-bold text-[20px] mb-5">
                  Login to Betpro wallet
                </h2>

                {error && (
                  <div className="mb-3 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSignin} className="space-y-3" autoComplete="off">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    disabled={loading}
                    autoComplete="username"
                    data-lpignore="true"
                    data-1p-ignore="true"
                  />
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    disabled={loading}
                    autoComplete="new-password"
                    data-lpignore="true"
                    data-1p-ignore="true"
                  />

                  <button type="submit" disabled={loading} className="btn-primary">
                    {loading ? "Please wait..." : "Sign in"}
                  </button>
                </form>

                <div className="text-right mt-[20px]">
                  <button
                    type="button"
                    onClick={() => setForgotMode(true)}
                    className="text-white text-[14px] font-medium hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="mt-[6px] mb-[17px] text-center">
                  <button
                    type="button"
                    onClick={() => navigate("/signup")}
                    disabled={loading || googleLoading}
                    className="text-[#6ef7e7] text-[14px] font-medium hover:underline cursor-pointer"
                  >
                    Don&apos;t have an account?
                  </button>
                </div>

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
              </>
            ) : (
              <>
                <h2 className="text-white font-bold text-[22px] mb-2 text-center">
                  Forgot Password?
                </h2>
                <p className="text-white text-[14px] mb-4 text-center">
                  You will receive instructions for resetting your password.
                </p>

                {resetError && (
                  <div className="mb-3 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                    {resetError}
                  </div>
                )}

                {resetMessage && (
                  <div className="mb-3 p-2 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
                    {resetMessage}
                  </div>
                )}

                <form onSubmit={handleForgotSubmit} className="space-y-3" autoComplete="off">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Email"
                      value={resetIdentifier}
                      onChange={(e) => setResetIdentifier(e.target.value)}
                      className="input-field pr-10"
                      disabled={resetLoading}
                    />
                    <FaEnvelope
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#17936F]"
                    />
                  </div>

                  <button type="submit" disabled={resetLoading} className="btn-primary">
                    {resetLoading ? "Please wait..." : "Send my Password"}
                  </button>
                </form>

                <div className="text-center mt-3">
                  <button
                    type="button"
                    onClick={() => setForgotMode(false)}
                    className="text-white text-[13px] font-medium hover:underline"
                  >
                    Back to Sign in
                  </button>
                </div>
              </>
            )}
          </div>

          <DownloadCard />
          <VideoSection />
        </div>
      </AuthLayout>

      <Footer />
    </div>
  );
}