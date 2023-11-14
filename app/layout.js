"use client";

import Box from '@mui/material/Box';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import {SessionProvider} from "next-auth/react";
import ToolBarH from "@/app/ToolBarH";
import ToolBarV from "@/app/ToolBarV";

const DRAWER_WIDTH = 240;
export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body>
        <SessionProvider>
            <ThemeRegistry>
                <ToolBarH/>
                <ToolBarV/>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        bgcolor: 'background.default',
                        ml: `${DRAWER_WIDTH}px`,
                        mt: ['48px', '56px', '64px'],
                        p: 3,
                    }}
                >
                    {children}
                </Box>
            </ThemeRegistry>
        </SessionProvider>
        </body>
        </html>
    );
}
