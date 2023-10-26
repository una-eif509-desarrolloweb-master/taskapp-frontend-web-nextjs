"use client"
import React, {useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import {useForm} from "react-hook-form"
import axios from "axios"
import Box from "@mui/material/Box";
import {Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import style from "./createTaskForm.module.css";

const CreateTaskForm = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const form = useForm({})
    const {register, handleSubmit, formState, reset, setValue} = form
    const {errors} = formState

    const onSubmitFunction = async data => {
        console.log(data)
        try {
            setLoading(true)
            await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}`, data)
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

        setValue("status", "");
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
                            required
                            id="taskTitle"
                            label="Title"
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
                            <InputLabel id="taskStatusLbl">Status</InputLabel>
                            <Select
                                labelId="taskStatusLbl"
                                id="taskStatus"
                                autoWidth
                                defaultValue={0}
                                label="Status"
                                onChange={handleStatusChange}
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

export default CreateTaskForm
