import type React from "react"
import Metadata from "next"
import { Inter } from "next/font/google"
import { Providers } from "../components/providers"
import { Navbar } from "../components/navbar"
import { Footer } from "@/components/footer"
import "./globals.css"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Health Analytics Platform",
  description: "Track your health metrics and improve your longevity",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>

      {/*Testing*/}
      {/*<body className="bg-white text-gray-900 font-sans">*/}
      {/*<h1 className="text-3xl font-bold underline">*/}
      {/*    Hello world!*/}
      {/*</h1>*/}
      {/*</body>*/}
    </html>
  )
}
