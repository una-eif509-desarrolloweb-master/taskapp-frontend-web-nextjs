import {Open_Sans} from 'next/font/google'
import Link from "next/link";

import './globals.css'

const inter = Open_Sans({
    subsets: ['latin'],
    weight: ["400"],
})

export const metadata = {
    title: 'TaskApp Universidad Nacional de Costa Rica',
    description: 'Aplicación de Guía de Tareas para la Universidad Nacional de Costa Rica',
}

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <head/>
        <body>
        <header>
            <h1>Task App | Universidad Nacional de Costa Rica</h1>
            <ul>
                <li>
                    <Link href={"/home"}>
                        Task App
                    </Link>
                </li>
                <li>
                    <Link href="/settings">
                        Settings
                    </Link>
                </li>
                <li>
                    <Link href="/tasks">
                        Tasks
                    </Link>
                </li>
            </ul>
        </header>
        <div>
            {children}
        </div>
        </body>
        </html>
    )
}
