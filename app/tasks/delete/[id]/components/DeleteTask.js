"use client";  // Ensure this is a client-side component

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Alert, AlertTitle, Button, ButtonGroup, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import style from "./deleteTask.module.css";

/**
 * DeleteTicket Component
 *
 * This component renders a form displaying task details along with an option to delete the task.
 * It includes a confirmation dialog to prevent accidental deletions.
 *
 * @param {Object} props - Component properties
 * @param {Object} props.task - The task object containing details like id, title, notes, etc.
 *
 * @returns {JSX.Element} The rendered component
 */
const DeleteTicket = ({ task }) => {
    // State for controlling the dialog open/close state
    const [open, setOpen] = useState(false);
    // State for controlling the loading indicator during the delete process
    const [loading, setLoading] = useState(false);

    // Router instance for navigation
    const router = useRouter();

    /**
     * deleteHandlerFunction
     *
     * This function sends a DELETE request to the backend API to delete the task.
     * It then closes the confirmation dialog, navigates back to the tasks list, and refreshes the page.
     */
    const deleteHandlerFunction = async () => {
        try {
            setLoading(true); // Start loading state
            // Sending DELETE request to the backend API
            await axios.delete(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/${task.id}`);
            setOpen(false);  // Close the dialog on success
            router.push("/tasks");  // Navigate back to the tasks list
            router.refresh();  // Refresh the page to reflect changes
        } catch (error) {
            // Handle error case (can be improved with better error handling and UI feedback)
            console.log(error);
        } finally {
            setLoading(false);  // Stop loading state
        }
    };

    /**
     * handleClickOpen
     *
     * Opens the confirmation dialog when the delete button is clicked.
     */
    const handleClickOpen = () => {
        setOpen(true);
    };

    /**
     * handleClose
     *
     * Closes the confirmation dialog without deleting the task.
     */
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {/* Confirmation Dialog */}
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
                    <Button onClick={deleteHandlerFunction} autoFocus disabled={loading}>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Alert indicating the deletion action */}
            <Alert severity="error" className={style.alert}>
                <AlertTitle>Delete</AlertTitle>
                You will delete this task!
            </Alert>

            {/* Task details form, read-only */}
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '50ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        id="task-id"
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
                        id="task-title"
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
                        id="task-notes"
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
                        id="task-created-date"
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
                        id="task-due-date"
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
                        id="task-status"
                        label="Status"
                        defaultValue={task.status.label}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />
                </div>

                {/* Buttons to cancel or trigger the delete confirmation */}
                <div className={style.buttonsArea}>
                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <Button href={'/tasks'}>Cancel</Button>
                        <Button onClick={handleClickOpen} disabled={loading}>
                            Delete
                        </Button>
                    </ButtonGroup>
                </div>
            </Box>
        </>
    );
};

export default DeleteTicket;