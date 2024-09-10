"use client"; // Mark this component as a Client Component

import React from "react";
import Box from "@mui/material/Box";
import { Button, ButtonGroup, TextField } from "@mui/material";
import style from "./taskDetails.module.css"; // Importing CSS module for scoped styling

/**
 * TaskDetails Component - Displays the details of a single task in a read-only form.
 * This component uses Material-UI components for styling and layout.
 * @param {Object} props - The props object containing the task data.
 * @param {Object} props.task - The task object with its details (id, title, notes, etc.).
 * @returns {JSX.Element} - The JSX for rendering the task details form.
 */
const TaskDetails = ({ task }) => {
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '50ch' }, // Inline styling for text fields
            }}
            noValidate
            autoComplete="off"
        >
            {/* Task ID - Read-Only Field */}
            <div>
                <TextField
                    id="task-id"
                    label="Task Id"
                    defaultValue={task.id} // Displays the task ID
                    InputProps={{
                        readOnly: true, // Makes the field read-only
                    }}
                    variant="outlined"
                />
            </div>

            {/* Task Title - Read-Only Field */}
            <div>
                <TextField
                    id="task-title"
                    label="Title"
                    defaultValue={task.title} // Displays the task title
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                />
            </div>

            {/* Task Notes - Read-Only Field */}
            <div>
                <TextField
                    id="task-notes"
                    label="Notes"
                    defaultValue={task.notes} // Displays the task notes
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                />
            </div>

            {/* Date Created - Read-Only Field */}
            <div>
                <TextField
                    id="date-created"
                    label="Date Created"
                    defaultValue={task.createDate} // Displays the creation date
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                />
            </div>

            {/* Due Date - Read-Only Field */}
            <div>
                <TextField
                    id="due-date"
                    label="Due Date"
                    defaultValue={task.dueDate} // Displays the due date
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                />
            </div>

            {/* Task Status - Read-Only Field */}
            <div>
                <TextField
                    id="task-status"
                    label="Status"
                    defaultValue={task.status.label} // Displays the task status
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                />
            </div>

            {/* Button Group - Cancel, Edit, Delete */}
            <div className={style.buttonsArea}>
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    {/* Cancel Button - Navigates back to the task list */}
                    <Button href="/tasks">Cancel</Button>

                    {/* Edit Button - For future functionality to edit task details */}
                    <Button>Edit</Button>

                    {/* Delete Button - For future functionality to delete the task */}
                    <Button>Delete</Button>
                </ButtonGroup>
            </div>
        </Box>
    );
};

export default TaskDetails;