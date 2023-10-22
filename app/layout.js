import {Open_Sans} from 'next/font/google'
import Link from "next/link";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import './globals.css'
import styles from "./rootStyle.module.css";

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
        <html lang="en" className={inter.className}>
        <head>
            <title>Task App | Universidad Nacional de Costa Rica</title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" href="/favicon.ico"/>
        </head>
        <body>
        <header>
            <h1 className={styles.h1}>Task App | Universidad Nacional de Costa Rica</h1>
            <Stack spacing={2} direction="row">
                <Button variant="contained" href={"/home"}>Home</Button>
                <Button variant="contained" href="/tasks">Tasks</Button>
                <Button variant="outlined" href="/settings">Settings</Button>
            </Stack>
        </header>
        <div className={styles.container}>
            {children}
        </div>
        <footer className={styles.footer}>
            <p>Task App | Universidad Nacional de Costa Rica</p>
        </footer>
        </body>
        </html>
    )
}
