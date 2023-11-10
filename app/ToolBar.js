import {signIn, signOut, useSession} from "next-auth/react";
import React from "react";
import Toolbar from "@mui/material/Toolbar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Typography from "@mui/material/Typography";
import {AppBar, Button} from "@mui/material";

const ToolBar = () => {
    const {data: session} = useSession();
    console.log({session});

    return (
        <AppBar position="fixed" sx={{zIndex: 2000}}>
            <Toolbar sx={{backgroundColor: 'background.paper'}}>
                <DashboardIcon sx={{color: '#444', mr: 2, transform: 'translateY(-2px)'}}/>
                <Typography variant="h6" noWrap component="div" color="black">
                    Task App | Universidad de Nacional de Costa Rica |
                </Typography>
                <div>
                    {session?.user ? (
                        <Button onClick={() => signOut()}>Sign Out</Button>
                    ) : (
                        <Button onClick={() => signIn()}>Sign In</Button>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default ToolBar;