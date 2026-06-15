"use client";

import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

interface QRClientProps {
  menuUrl: string;
}

export default function QRClient({ menuUrl }: QRClientProps) {
  const [copied, setCopied] = useState(false);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(menuUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const downloadQR = () => {
    const svg = document.querySelector("#amor-fati-qr svg") as SVGElement;
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 500;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new window.Image();
    img.onload = () => {
      ctx.fillStyle = "#F8F4EE";
      ctx.fillRect(0, 0, 500, 500);
      ctx.drawImage(img, 50, 50, 400, 400);
      const link = document.createElement("a");
      link.download = "amor-fati-menu-qr.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
      style={{ backgroundColor: "var(--cream)" }}
    >
      {/* Card */}
      <div
        className="w-full max-w-sm rounded-3xl p-8 text-center shadow-2xl"
        style={{
          background: "white",
          boxShadow: "0 20px 60px rgba(124,58,237,0.12)",
        }}
      >
        {/* Header */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-lg font-black mx-auto mb-4"
          style={{
            background: "linear-gradient(135deg, #7C3AED, #9F67F5)",
          }}
        >
          AF
        </div>
        <h1
          className="text-2xl font-bold mb-1"
          style={{
            fontFamily: "var(--font-playfair)",
            color: "var(--charcoal)",
          }}
        >
          Amor Fati
        </h1>
        <p className="text-sm mb-1" style={{ color: "var(--gray)" }}>
          Coffee & Eatery
        </p>
        <p className="text-xs mb-6" style={{ color: "#9CA3AF" }}>
          Scan to browse our full menu
        </p>

        {/* QR Code */}
        <div
          id="amor-fati-qr"
          className="p-4 rounded-2xl mx-auto mb-6 inline-block"
          style={{
            background: "var(--cream)",
            border: "2px solid #F3F0FF",
          }}
        >
          <QRCodeSVG
            value={menuUrl}
            size={220}
            bgColor="#F8F4EE"
            fgColor="#5B21B6"
            level="H"
            imageSettings={{
              src: "",
              x: undefined,
              y: undefined,
              height: 0,
              width: 0,
              excavate: false,
            }}
          />
        </div>

        {/* URL display */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl mb-6 text-left"
          style={{
            background: "#F3F0FF",
            border: "1px solid #DDD6FE",
          }}
        >
          <span className="text-xs truncate flex-1" style={{ color: "var(--purple)" }}>
            {menuUrl}
          </span>
          <button
            onClick={copyUrl}
            className="text-xs font-semibold px-2 py-0.5 rounded-lg flex-shrink-0 transition-all"
            style={{
              background: copied ? "#16a34a" : "var(--purple)",
              color: "white",
            }}
          >
            {copied ? "✓" : "Copy"}
          </button>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={downloadQR}
            className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #7C3AED, #9F67F5)",
            }}
          >
            ⬇ Download QR Code
          </button>
          <a
            href="/menu"
            className="w-full py-3 rounded-xl font-semibold text-sm border-2 text-center transition-all hover:scale-105 active:scale-95"
            style={{
              borderColor: "var(--purple)",
              color: "var(--purple)",
            }}
          >
            Open Menu →
          </a>
        </div>

        {/* Instructions */}
        <div
          className="mt-6 p-4 rounded-xl text-left"
          style={{ background: "#F9F7FF" }}
        >
          <p
            className="text-xs font-semibold mb-2"
            style={{ color: "var(--purple)" }}
          >
            How to use:
          </p>
          {[
            "Print this QR code",
            "Place it on each table",
            "Guests scan to instantly view the menu",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-2 mb-1.5 last:mb-0">
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5"
                style={{
                  background: "var(--purple)",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                }}
              >
                {i + 1}
              </span>
              <span className="text-xs" style={{ color: "var(--gray)" }}>
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <p className="mt-6 text-xs text-center" style={{ color: "#9CA3AF" }}>
        One QR code for all tables · Amor Fati, Tirupati
      </p>
    </div>
  );
}
