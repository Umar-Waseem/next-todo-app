/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import './globals.css'
import { Toaster } from "react-hot-toast";

const inter = Noto_Sans({ weight:"400", subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todo List App',
  description: 'Manage your tasks and boost your productivity!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>

      </head>
      <body className={inter.className}>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  )
}
