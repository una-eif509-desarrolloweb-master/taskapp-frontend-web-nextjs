"use client";

import Link from 'next/link';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ChecklistIcon from '@mui/icons-material/Checklist';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportIcon from '@mui/icons-material/Support';
import LogoutIcon from '@mui/icons-material/Logout';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import {SessionProvider} from "next-auth/react";
import ToolBar from "@/app/ToolBar";

const DRAWER_WIDTH = 240;

const LINKS = [
    {text: 'Home', href: '/', icon: HomeIcon},
    {text: 'Tasks', href: '/tasks', icon: ChecklistIcon},
];

const PLACEHOLDER_LINKS = [
    {text: 'Settings', href: '/settings', icon: SettingsIcon},
    {text: 'Support', href: '/support', icon: SupportIcon},
    {text: 'Logout', icon: LogoutIcon},
];


export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body>
        <SessionProvider>
            <ThemeRegistry>
                <ToolBar/>
                <Drawer
                    sx={{
                        width: DRAWER_WIDTH,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: DRAWER_WIDTH,
                            boxSizing: 'border-box',
                            top: ['48px', '56px', '64px'],
                            height: 'auto',
                            bottom: 0,
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Divider/>
                    <List>
                        {LINKS.map(({text, href, icon: Icon}) => (
                            <ListItem key={href} disablePadding>
                                <ListItemButton component={Link} href={href}>
                                    <ListItemIcon>
                                        <Icon/>
                                    </ListItemIcon>
                                    <ListItemText primary={text}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider sx={{mt: 'auto'}}/>
                    <List>
                        {PLACEHOLDER_LINKS.map(({text, href, icon: Icon}) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton href={href}>
                                    <ListItemIcon>
                                        <Icon/>
                                    </ListItemIcon>
                                    <ListItemText primary={text}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
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
