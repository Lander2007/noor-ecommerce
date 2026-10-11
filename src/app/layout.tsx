import type { Metadata, Viewport } from "next"
import { Aref_Ruqaa, IBM_Plex_Sans_Arabic, Readex_Pro } from "next/font/google"
import AppShell from "@/components/AppShell"
import "./globals.css"

const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
})

const readex = Readex_Pro({
  subsets: ["arabic", "latin"],
  weight: ["600", "700"],
  variable: "--font-readex",
  display: "swap",
})

const aref = Aref_Ruqaa({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-aref",
  display: "swap",
})

export const metadata: Metadata = {
  title: "NOoOR Farm - خضار وفاكهة",
  description: "الخضار جاهز. فاضل الطبخ.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/brand/favicon.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#FBF8EE",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${plex.variable} ${readex.variable} ${aref.variable}`}
    >
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
