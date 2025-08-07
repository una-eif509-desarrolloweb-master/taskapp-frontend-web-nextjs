import {Inter} from "next/font/google";
import Link from "next/link";

import "./globals.css";
import styles from "./rootStyle.module.css";

const inter = Inter({subsets: ["latin"]});
const APP_NAME = 'Task App | Universidad Nacional de Costa Rica';

export const metadata = {
    title: APP_NAME,
    description: 'Aplicación de Guía de Tareas para la Universidad Nacional de Costa Rica',
}

function Navigation() {
    return (
        <nav className={styles.navigation}>
            <Link className={styles.menuBarLinks} href="/">Home</Link>
            <span> - </span>
            <Link className={styles.menuBarLinks} href="/tasks">Tasks</Link>
            <span> - </span>
            <Link className={styles.menuBarLinks} href="/settings">Settings</Link>
        </nav>
    );
}

export default function RootLayout({children}) {
    return (
        <html lang="en" className={inter.className}>
        <body>
        <header className={styles.header}>
            <h1 className={styles.h1}>{APP_NAME}</h1>
            <Navigation/>
        </header>
        <main className={styles.container}>
            {children}
        </main>
        <footer className={styles.footer}>
            <p>{APP_NAME}</p>
        </footer>
        </body>
        </html>
    );
}