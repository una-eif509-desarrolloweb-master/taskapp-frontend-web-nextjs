"use client"
import React, {useState} from "react"
import {useRouter} from "next/navigation"
import axios from "axios"
import {Alert, AlertTitle, Button, ButtonGroup, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import style from "./deleteTask.module.css";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteTicket = ({task: task}) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const deleteHandlerFunction = async () => {
        try {
            setLoading(true)
            await axios.delete(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/${task.id}`)
            setOpen(false);
            router.push("/tasks")
            router.refresh()
        } catch (error) {
            // Handled
            console.log(error)
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete the task?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please confirm if you want to delete the task.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={deleteHandlerFunction} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>

            <Alert severity="error" className={style.alert}>
                <AlertTitle>Delete</AlertTitle>
                You will delete this task!
            </Alert>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': {m: 1, width: '50ch'},
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        id="standard-read-only-input"
                        label="Task Id"
                        defaultValue={task.id}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        id="standard-read-only-input"
                        label="Title"
                        defaultValue={task.title}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        id="standard-read-only-input"
                        label="Notes"
                        defaultValue={task.notes}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        id="standard-read-only-input"
                        label="Date Created"
                        defaultValue={task.createDate}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        id="standard-read-only-input"
                        label="Due Date"
                        defaultValue={task.dueDate}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        id="standard-read-only-input"
                        label="Status"
                        defaultValue={task.status.label}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />
                </div>
                <div className={style.buttonsArea}>
                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <Button href={'/tasks'}>Cancel</Button>
                        <Button
                            onClick={handleClickOpen}>Delete</Button>
                    </ButtonGroup>
                </div>
            </Box>
        </>

    )
}

export default DeleteTicket
