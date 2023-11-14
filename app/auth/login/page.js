"use client";

import React, {useRef} from "react";
import style from "@/app/admin/tasks/edit/[id]/components/editTaskForm.module.css";
import {Button, ButtonGroup, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {useForm} from "react-hook-form";
import {signIn} from "next-auth/react";
import axios from "axios";

const LoginPage = ({searchParams}) => {
    const form = useForm({})
    const {register, handleSubmit, formState, reset, setValue} = form
    const userName = useRef("");
    const pass = useRef("");

    const onSubmitFunction = async data => {
        console.log(data)
        try {
            const result = await signIn("credentials", {
                username: data.username,
                password: data.password,
                redirect: true,
                callbackUrl: "/",
            });
        } catch (error) {
            // Handled
            console.log(error)
        }

    };

    return (
        <>
            <Box
                sx={{
                    '& .MuiTextField-root': {m: 1, width: '50ch'},
                }}
            >
                {searchParams?.message &&
                    <p className="text-red-700 bg-red-100 py-2 px-5 rounded-md">{searchParams?.message}</p>}

                <form
                    onSubmit={handleSubmit(onSubmitFunction)}
                    noValidate
                >
                    <div>
                        <TextField
                            id="username"
                            label="User Name"
                            defaultValue="admin@guzmanalan.com"
                            variant="outlined"
                            {...register('username', {
                                required: 'UserName is required',
                            })}
                        />
                    </div>
                    <div>
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            defaultValue="12345"
                            variant="outlined"
                            {...register('password', {
                                required: 'Password is required',
                            })}
                        />
                    </div>
                    <div className={style.buttonsArea}>
                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                            <Button
                                type="submit"
                            >Login</Button>
                        </ButtonGroup>
                    </div>
                </form>
            </Box>
        </>
    );
};

export default LoginPage;
