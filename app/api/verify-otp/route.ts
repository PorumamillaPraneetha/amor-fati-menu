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
    const { phone, otp, token, expiry } = await req.json();

    if (Date.now() > expiry) {
      return NextResponse.json({ error: "OTP expired. Request a new one." }, { status: 400 });
    }

    const expected = signToken(phone, otp, expiry);

    if (
      token.length !== expected.length ||
      !crypto.timingSafeEqual(Buffer.from(token, "hex"), Buffer.from(expected, "hex"))
    ) {
      return NextResponse.json({ error: "Incorrect OTP. Try again." }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
