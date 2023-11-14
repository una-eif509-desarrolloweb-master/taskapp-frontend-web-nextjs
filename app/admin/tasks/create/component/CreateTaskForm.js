"use client";

import React from "react"
import {useRouter} from "next/navigation"
import {useForm} from "react-hook-form"
import Box from "@mui/material/Box";
import dayjs from 'dayjs';
import {Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import style from "./createTaskForm.module.css";
import axiosInstance from "@/components/utils/axiosInstance";

const CreateTaskForm = () => {
    const router = useRouter()
    const form = useForm({})
    const {register, handleSubmit, formState, setValue} = form
    const {errors} = formState

    const onSubmitFunction = async data => {
        console.log("Create Task", data)

        // Transform data to match API requirements
        const transformedData = {
            id: 0,
            title: data.title,
            notes: data.notes,
            dueDate: data.dueDate,
            priority: {
                id: data.priority
            },
            status: {
                id: data.status
            }
        };

        console.log("Transformed Task", transformedData)

        try {
            await axiosInstance.post('/tasks', transformedData);
            router.push("/admin/tasks")
            router.refresh()
        } catch (error) {
            // Handled
            console.log(error)
        }
    }
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
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                id="dueDate"
                                label="Due Date"
                                defaultValue={dayjs('2023-04-17')}
                                {...register('dueDate', {
                                    required: 'Due Date is required',
                                })}
                            />
                        </LocalizationProvider>
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
                                defaultValue="1"
                                label="Status"
                                {...register('status')}
                            >
                                <MenuItem value="1">Pending</MenuItem>
                                <MenuItem value="2">In Progress</MenuItem>
                                <MenuItem value="3">Done</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className={style.FormControl}>
                        <FormControl
                            margin="normal"
                            variant="outlined"

                        >
                            <InputLabel id="taskPriorityLbl">Priority</InputLabel>
                            <Select
                                labelId="taskPriorityLbl"
                                id="taskPriority"
                                autoWidth
                                defaultValue="3"
                                label="Priority"
                                {...register('priority')}
                            >
                                <MenuItem value="3">Low</MenuItem>
                                <MenuItem value="2">Medium</MenuItem>
                                <MenuItem value="1">High</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className={style.buttonsArea}>
                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                            <Button href={'/admin/tasks'}>Cancel</Button>
                            <Button type="submit">Save</Button>
                        </ButtonGroup>
                    </div>
                </form>
            </Box>
        </>
    )
}

export default CreateTaskForm
