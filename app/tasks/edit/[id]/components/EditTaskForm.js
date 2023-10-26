"use client"
import React, {useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import {useForm} from "react-hook-form"
import axios from "axios"
import {Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import style from "./editTaskForm.module.css";
import Box from "@mui/material/Box";

const EditTaskForm = ({task: task}) => {
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const form = useForm({})
    const {register, handleSubmit, formState, reset, setValue} = form
    const {errors} = formState

    const onSubmitFunction = async data => {
        console.log(data)
        try {
            setLoading(true)
            await axios.put(
                `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/${task.id}`,
                data
            )
            router.push("/tasks")
            router.refresh()
        } catch (error) {
            // Handled
            console.log(error)
        }
    }

    const handleStatusChange = (event) => {
        let statusVal = {
            id: event.target.value,
            label: event.target.value === 0 ? 'ToDo' : 'Pending'
        }
        console.log(statusVal)
        setValue("status", statusVal);
    };


    useEffect(() => {
        // For more info, Look at these values
        console.log(task.id)

        setValue("id", task.id);
        setValue("title", task.title);
        setValue("notes", task.notes);
        setValue("status", task.status);
        setLoading(false)
    }, [])

    return (
        <>
            <Box
                sx={{
                    '& .MuiTextField-root': {m: 1, width: '50ch'},
                }}
            >
                <form
                    onSubmit={handleSubmit(onSubmitFunction)}
                    noValidate
                >
                    <div>
                        <TextField
                            id="taskId"
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
                            required
                            id="taskTitle"
                            label="Title"
                            defaultValue={task.title}
                            variant="outlined"
                            {...register('title', {
                                required: 'Title is required',
                            })}
                            helperText={errors?.title?.message}
                        />
                    </div>
                    <div>
                        <TextField
                            required
                            id="taskNotes"
                            label="Notes"
                            defaultValue={task.notes}
                            variant="outlined"
                            {...register('notes', {
                                required: 'Notes is required',
                            })}
                            helperText={errors?.notes?.message}
                        />
                    </div>
                    <div className={style.FormControl}>
                        <FormControl
                            margin="normal"
                            variant="outlined"

                        >
                            <InputLabel id="taskStatusLbl">Age</InputLabel>
                            <Select
                                labelId="taskStatusLbl"
                                id="taskStatus"
                                defaultValue={task.status.id}
                                autoWidth
                                onChange={handleStatusChange}
                                label={task.status.label}

                            >
                                <MenuItem value={0}>ToDo</MenuItem>
                                <MenuItem value={1}>Pending</MenuItem>

                            </Select>
                        </FormControl>

                    </div>
                    <div className={style.buttonsArea}>
                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                            <Button href={'/tasks'}>Cancel</Button>
                            <Button
                                type="submit"
                            >Save</Button>
                        </ButtonGroup>
                    </div>
                </form>
            </Box>
        </>
    )
}

export default EditTaskForm
