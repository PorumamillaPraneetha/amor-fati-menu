"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

type Step = "details" | "otp";

export default function LandingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("details");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [token, setToken] = useState("");
  const [expiry, setExpiry] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  /* Web OTP API — auto-reads OTP on Android Chrome */
  useEffect(() => {
    if (step !== "otp" || !("OTPCredential" in window)) return;
    const ac = new AbortController();
    (navigator.credentials.get as (opts: object) => Promise<{ code: string } | null>)({
      otp: { transport: ["sms"] },
      signal: ac.signal,
    })
      .then((cred) => {
        if (cred?.code) {
          const digits = cred.code.replace(/\D/g, "").slice(0, 6).split("");
          setOtp([...digits, ...Array(6 - digits.length).fill("")]);
        }
      })
      .catch(() => {});
    return () => ac.abort();
  }, [step]);

  /* Resend cooldown */
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setInterval(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [resendCooldown]);

  const sendOtp = async () => {
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (!/^[6-9]\d{9}$/.test(phone.trim())) { setError("Enter a valid 10-digit mobile number."); return; }

    setLoading(true);
    setError("");

    const res = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: phone.trim() }),
    });
    const data = await res.json();

    if (!res.ok) { setError(data.error || "Failed to send OTP."); setLoading(false); return; }

    setToken(data.token);
    setExpiry(data.expiry);
    setStep("otp");
    setResendCooldown(30);
    setLoading(false);
    setTimeout(() => otpRefs.current[0]?.focus(), 300);
  };

  const verifyOtp = async () => {
    const code = otp.join("");
    if (code.length < 6) { setError("Enter the 6-digit OTP."); return; }

    setLoading(true);
    setError("");

    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: phone.trim(), otp: code, token, expiry }),
    });
    const data = await res.json();

    if (!res.ok) { setError(data.error || "Invalid OTP."); setLoading(false); return; }

    await supabase.from("customers").insert({ name: name.trim(), phone: phone.trim() });
    router.push("/menu");
  };

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    setError("");
    if (digit && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKey = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) otpRefs.current[index - 1]?.focus();
    if (e.key === "Enter" && otp.join("").length === 6) verifyOtp();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (digits.length === 6) {
      setOtp(digits.split(""));
      otpRefs.current[5]?.focus();
    }
  };

  const filled = otp.join("").length === 6;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5 relative overflow-hidden"
      style={{ background: "#0A0A0A" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.18) 0%, transparent 70%)" }}
      />

      {/* Logo + brand */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center mb-8 relative z-10"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.jpeg"
          alt="Amor Fati"
          className="rounded-2xl object-cover mb-5"
          style={{
            width: 80, height: 80,
            objectPosition: "center top",
            border: "2px solid rgba(124,58,237,0.6)",
            boxShadow: "0 0 32px rgba(124,58,237,0.35)",
          }}
        />
        <p className="text-[11px] font-black uppercase tracking-[0.28em] mb-2" style={{ color: "#A78BFA" }}>
          Welcome to
        </p>
        <h1
          className="text-white text-center"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "2.6rem", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1 }}
        >
          Amor Fati
        </h1>
        <p className="text-stone-500 text-sm font-medium mt-1.5 tracking-wide">Coffee &amp; Eatery · Tirupati</p>
      </motion.div>

      <div className="w-full max-w-sm relative z-10">
        <AnimatePresence mode="wait">

          {/* ── Step 1: Name + Phone ── */}
          {step === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="rounded-3xl p-6"
              style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 24px 64px rgba(0,0,0,0.6)" }}
            >
              <p className="text-white font-bold text-lg mb-1" style={{ fontFamily: "Georgia, serif" }}>
                Before you dive in
              </p>
              <p className="text-stone-500 text-sm mb-5">We&apos;d love to know who you are.</p>

              <div className="space-y-3">
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-600 pointer-events-none">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <input
                    type="text" value={name}
                    onChange={(e) => { setName(e.target.value); setError(""); }}
                    placeholder="Your name" autoComplete="given-name"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl text-white text-sm outline-none transition-all"
                    style={{ background: "#1E1E1E", border: "1.5px solid #2a2a2a", caretColor: "#7C3AED" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#7C3AED")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#2a2a2a")}
                  />
                </div>

                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-600 pointer-events-none">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  <input
                    type="tel" value={phone}
                    onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 10)); setError(""); }}
                    placeholder="Phone number" autoComplete="tel" inputMode="numeric"
                    onKeyDown={(e) => { if (e.key === "Enter") sendOtp(); }}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl text-white text-sm outline-none transition-all"
                    style={{ background: "#1E1E1E", border: "1.5px solid #2a2a2a", caretColor: "#7C3AED" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#7C3AED")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#2a2a2a")}
                  />
                </div>

                {error && <p className="text-red-400 text-xs px-1">{error}</p>}

                <button
                  onClick={sendOtp} disabled={loading}
                  className="w-full py-3.5 rounded-xl text-white font-bold text-sm transition-all active:scale-95"
                  style={{
                    background: loading ? "#4B2995" : "linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)",
                    boxShadow: "0 8px 28px rgba(124,58,237,0.4)",
                    opacity: loading ? 0.8 : 1,
                  }}
                >
                  {loading ? "Sending OTP…" : "Send OTP →"}
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Step 2: OTP ── */}
          {step === "otp" && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="rounded-3xl p-6"
              style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 24px 64px rgba(0,0,0,0.6)" }}
            >
              <button
                onClick={() => { setStep("details"); setOtp(["","","","","",""]); setError(""); }}
                className="flex items-center gap-1.5 text-stone-500 text-xs mb-5 hover:text-stone-400 transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
                Change number
              </button>

              <p className="text-white font-bold text-lg mb-1" style={{ fontFamily: "Georgia, serif" }}>
                Verify your number
              </p>
              <p className="text-stone-500 text-sm mb-6">
                OTP sent to <span className="text-white font-semibold">+91 {phone}</span>
              </p>

              <div className="flex gap-2 mb-5" onPaste={handlePaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { otpRefs.current[i] = el; }}
                    type="text" inputMode="numeric" maxLength={1} value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKey(i, e)}
                    className="flex-1 text-center text-white font-bold text-xl rounded-xl py-4 outline-none transition-all"
                    style={{
                      background: digit ? "rgba(124,58,237,0.18)" : "#1E1E1E",
                      border: digit ? "1.5px solid #7C3AED" : "1.5px solid #2a2a2a",
                      caretColor: "#7C3AED",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#7C3AED")}
                    onBlur={(e) => { if (!digit) e.currentTarget.style.borderColor = "#2a2a2a"; }}
                  />
                ))}
              </div>

              {error && <p className="text-red-400 text-xs px-1 mb-3">{error}</p>}

              <button
                onClick={verifyOtp} disabled={loading || !filled}
                className="w-full py-3.5 rounded-xl text-white font-bold text-sm transition-all active:scale-95"
                style={{
                  background: filled ? "linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)" : "#222",
                  boxShadow: filled ? "0 8px 28px rgba(124,58,237,0.4)" : "none",
                  opacity: loading ? 0.8 : 1,
                  color: filled ? "white" : "#555",
                }}
              >
                {loading ? "Verifying…" : "Verify & Enter Menu →"}
              </button>

              <div className="text-center mt-4">
                {resendCooldown > 0 ? (
                  <p className="text-stone-600 text-xs">Resend in {resendCooldown}s</p>
                ) : (
                  <button onClick={sendOtp} className="text-purple-400 text-xs font-semibold hover:text-purple-300 transition-colors">
                    Resend OTP
                  </button>
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
