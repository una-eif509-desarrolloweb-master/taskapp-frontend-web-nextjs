"use client";
import React, {useState} from "react"
import {useRouter} from "next/navigation"
import {useForm} from "react-hook-form"
import {Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import style from "./editTaskForm.module.css";
import Box from "@mui/material/Box";
import axiosInstance from "@/components/utils/axiosInstance";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const EditTaskForm = ({task: task}) => {
    const [, setLoading] = useState(true)
    const router = useRouter()
    const form = useForm({})
    const {
        register, handleSubmit,
        formState, setValue
    } = form
    const {errors} = formState

    const onSubmitFunction = async (data) => {

        // Transform data to match API requirements
        const transformedData = {
            id: data.id,
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
            // Replace with your API endpoint and adjust HTTP method as needed
            const response = await axiosInstance.put(`/tasks`, transformedData);
            console.log('Form submitted successfully:', response.data);
            router.push("/admin/tasks")
            router.refresh()
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    async function onSubmitFunction22(data) {
        console.log(data)
        try {
            // Replace '/your-endpoint' with the actual endpoint you want to hit
            const response = await axiosInstance.put(`/tasks/${task.id}`, data);

            // Handle the response here
            console.log('Update successful:', response.data);
        } catch (error) {
            // Handle any errors here
            console.error('Error updating data:', error);
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
                    id={'editTaskForm'}
                >
                    <div>
                        <TextField
                            id="taskId"
                            label="Task Id"
                            defaultValue={task.id}
                            InputProps={{
                                readOnly: true,
                            }}
                            {...register('id')}
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
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                id="dueDate"
                                label="Due Date"
                                defaultValue={dayjs(task.dueDate)}
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
                                defaultValue={task.status.id}
                                autoWidth
                                {...register('status')}
                                label={task.status.label}

                            >
                                <MenuItem value="1">Pending</MenuItem>
                                <MenuItem value="2">In Progress</MenuItem>
                                <MenuItem value="3">Done</MenuItem>
                            </Select>
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
                                        defaultValue={task.priority.id}
                                        label="Priority"
                                        {...register('priority')}
                                    >
                                        <MenuItem value="3">Low</MenuItem>
                                        <MenuItem value="2">Medium</MenuItem>
                                        <MenuItem value="1">High</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
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

export default EditTaskForm
