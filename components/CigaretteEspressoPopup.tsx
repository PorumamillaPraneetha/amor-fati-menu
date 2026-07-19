"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onTryNow: () => void;
}

export default function CigaretteEspressoPopup({ onTryNow }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 300);
    return () => clearTimeout(t);
  }, []);

  const close = () => setOpen(false);

  const handleTryNow = () => {
    close();
    setTimeout(() => onTryNow(), 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          style={{ background: "rgba(5,5,5,0.88)" }}
        >
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={close} />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative w-full max-w-sm rounded-3xl overflow-hidden z-10"
            style={{ background: "#0E0E0E", boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(124,58,237,0.2)" }}
          >
            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-3.5 right-3.5 z-30 w-9 h-9 rounded-full flex items-center justify-center text-white text-xl leading-none transition-all hover:scale-110 active:scale-90"
              style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(4px)" }}
              aria-label="Close"
            >
              ×
            </button>

            {/* Image */}
            <div className="relative w-full overflow-hidden" style={{ paddingBottom: "105%" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/coffee/cigarette-espresso-popup.png"
                alt="Just Dropped"
                className="absolute inset-0 w-full h-full"
                style={{ objectFit: "contain", objectPosition: "center center", transform: "scale(1.45)", transformOrigin: "center center" }}
              />
              {/* Bottom fade */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, transparent 45%, #0E0E0E 100%)" }}
              />

              {/* Badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{ background: "rgba(124,58,237,0.92)", backdropFilter: "blur(6px)" }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-200 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                <span className="text-white text-[10px] font-black uppercase tracking-[0.18em]">Just Dropped</span>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-7 -mt-5 relative z-10">
              <p
                className="text-[9px] font-black uppercase tracking-[0.22em] mb-2"
                style={{ color: "#A78BFA" }}
              >
                New · Bold · Limited
              </p>

              <h2
                className="text-white leading-none mb-3"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "2.4rem",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  lineHeight: 0.95,
                }}
              >
                Something new<br />
                <span style={{ fontStyle: "italic", color: "#C4B5FD" }}>just dropped.</span>
              </h2>

              <p className="text-[14px] leading-snug mb-5 font-semibold" style={{ color: "#E5E7EB" }}>
                The menu just got an upgrade.<br />
                <span style={{ color: "#6B7280", fontWeight: 400 }}>You're welcome.</span>
              </p>

              {/* CTA */}
              <button
                onClick={handleTryNow}
                className="w-full py-3.5 rounded-2xl text-white font-bold text-sm transition-all hover:opacity-90 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)",
                  boxShadow: "0 8px 28px rgba(124,58,237,0.45)",
                }}
              >
                See What&apos;s New →
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
