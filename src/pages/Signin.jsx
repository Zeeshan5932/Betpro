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

  const closeForgotPasswordModal = () => {
    setForgotMode(false);
    setResetError("");
    setResetMessage("");
    setResetIdentifier("");
  };

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

            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="auth-small-text mt-[6px] mb-[17px] w-full bg-transparent border-0 cursor-pointer hover:underline"
            >
              Don&apos;t have an account?
            </button>

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
          <VideoSection />
        </div>

        {forgotMode && (
          <div
            className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4"
            onClick={closeForgotPasswordModal}
          >
            <div
              className="modal-panel w-full max-w-[560px] rounded-[5px] px-5 py-6 shadow-[0_16px_40px_rgba(0,0,0,0.35)] sm:px-8 bg-[#2a3f54]"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="mb-2 text-center text-[22px] font-bold text-white">
                Forgot Password?
              </h2>
              <p className="mb-5 text-center text-[14px] text-white/90">
                You will receive instructions for resetting your password.
              </p>

              {resetError && (
                <div className="mb-3 rounded border border-red-400 bg-red-100 p-2 text-sm text-red-700">
                  {resetError}
                </div>
              )}

              {resetMessage && (
                <div className="mb-3 rounded border border-green-400 bg-green-100 p-2 text-sm text-green-700">
                  {resetMessage}
                </div>
              )}

              <form onSubmit={handleForgotSubmit} className="space-y-3" autoComplete="off">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email or phone number"
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

              <div className="mt-4 flex items-center justify-between gap-4 text-sm">
                <button
                  type="button"
                  onClick={closeForgotPasswordModal}
                  className="text-white font-medium hover:underline"
                >
                  Back to Sign in
                </button>
                <button
                  type="button"
                  onClick={closeForgotPasswordModal}
                  className="text-white/80 font-medium hover:text-white hover:underline"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </AuthLayout>

      <Footer />
    </div>
  );
}