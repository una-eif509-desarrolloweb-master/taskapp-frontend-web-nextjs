"use client"
import React from "react"
import Box from "@mui/material/Box";
import {Button, ButtonGroup, TextField} from "@mui/material";
import style from "./taskDetails.module.css"

const TaskDetails = ({task}) => {
    return (
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
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                </ButtonGroup>
            </div>
        </Box>
    )
}

export default TaskDetails
