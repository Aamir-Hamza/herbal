import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google"
import { ExperienceRoot } from "@/components/providers/experience-root"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Vana — Botanical Luxury, Rooted in Nature",
  description:
    "An immersive flagship for organic whole-herb teas, tonics, and kitchen essentials — grown with care, never isolates or extracts.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#0F291E",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} light`}
    >
      <body className="bg-stone font-sans text-forest antialiased">
        <ExperienceRoot>{children}</ExperienceRoot>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
