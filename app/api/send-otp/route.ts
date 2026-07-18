import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

function signToken(phone: string, otp: string, expiry: number): string {
  const data = `${phone}:${otp}:${expiry}`;
  return crypto
    .createHmac("sha256", process.env.OTP_SECRET || "fallback-secret")
    .update(data)
    .digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    if (!/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json({ error: "Invalid phone number." }, { status: 400 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes
    const token = signToken(phone, otp, expiry);

    // Send via Fast2SMS Quick route (no website verification needed)
    const smsRes = await fetch("https://www.fast2sms.com/dev/bulkV2", {
      method: "POST",
      headers: {
        authorization: process.env.FAST2SMS_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        route: "q",
        message: `Your Amor Fati OTP is ${otp}. Valid for 5 minutes.`,
        language: "english",
        numbers: phone,
      }),
    });

    if (!smsRes.ok) {
      const err = await smsRes.text();
      console.error("Fast2SMS error:", err);
      return NextResponse.json({ error: "Failed to send OTP. Try again." }, { status: 500 });
    }

    return NextResponse.json({ token, expiry });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
