import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TaskApp Universidad Nacional de Costa Rica',
  description: 'Aplicación de Guía de Tareas para la Universidad Nacional de Costa Rica',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
