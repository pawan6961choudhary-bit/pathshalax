import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import IntroAnimation from "@/components/IntroAnimation"
import GlobalFooter from "@/components/GlobalFooter"
import ChatBot from "@/components/ChatBot"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "PathshalaX - Transform Your Learning Journey",
  description:
    "Prepare for UPSC CSE with top educators and best classroom experience on India's largest learning platform",
  generator: "PathshalaX",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <IntroAnimation />
        <div className="flex-1 flex flex-col">{children}</div>
        <GlobalFooter />
        <ChatBot />
        <Analytics />
      </body>
    </html>
  )
}
