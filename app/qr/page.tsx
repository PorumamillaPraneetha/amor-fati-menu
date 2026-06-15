import { headers } from "next/headers";
import QRClient from "./QRClient";

export default async function QRPage() {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const proto = host.includes("localhost") ? "http" : "https";
  const menuUrl = `${proto}://${host}/menu`;

  return <QRClient menuUrl={menuUrl} />;
}
