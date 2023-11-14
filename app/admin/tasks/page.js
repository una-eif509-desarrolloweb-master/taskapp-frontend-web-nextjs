"use client";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Link from "next/link";
import {Button, Chip} from "@mui/material";
import Divider from "@mui/material/Divider";
import axiosInstance from "@/components/utils/axiosInstance";
import {useEffect, useState} from "react";

/**
 * Task List Page, displays a list of tasks
 * This page is protected by authentication and using in client side
 * @param searchParams
 * @returns {JSX.Element}
 * @constructor
 */
const TaskListPage = ({searchParams}) => {

    const [tasks, setTasks] = useState([]); // State to store tasks
    const [loading, setLoading] = useState(true); // State to handle loading status

    // Fetch tasks on mount using useEffect hook
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                // We are using axiosInstance to make authenticated requests
                const res = await axiosInstance.get('/tasks');
                setTasks(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                setLoading(false);
            }
        };

        fetchTasks().then(r => console.log(r));
    }, []); // Empty dependency array means this effect runs once on mount

    if (loading) {
        return <div>Loading tasks...</div>;
    }

    return (
        <>
            <div>
                <Button variant="outlined" href={`/admin/tasks/create/`} startIcon={<AddBoxIcon/>}>
                    Create new Task
                </Button>
                <Divider>
                    <Chip label="Task List"/>
                </Divider>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell align="right">Notes</TableCell>
                                <TableCell align="right">Created</TableCell>
                                <TableCell align="right">Due Date</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {tasks.map((task) => (
                                <TableRow
                                    key={task.title}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {task.title}
                                    </TableCell>
                                    <TableCell align="right">{task.notes}</TableCell>
                                    <TableCell align="right">{task.createDate}</TableCell>
                                    <TableCell align="right">{task.dueDate}</TableCell>
                                    <TableCell align="right">{task.status.label}</TableCell>
                                    <TableCell align="center">
                                        <Link
                                            href={`/admin/tasks/${task.id}`}
                                            className='bg-green-600 p-1 rounded-md mx-1'
                                        >
                                            <PreviewIcon className='text-xl'/>
                                        </Link>
                                        <Link
                                            href={`/admin/tasks/edit/${task.id}`}
                                            className='bg-green-600 p-1 rounded-md mx-1'
                                        >
                                            <EditIcon className='text-xl'/>
                                        </Link>
                                        <Link
                                            href={`/admin/tasks/delete/${task.id}`}
                                            className='bg-green-600 p-1 rounded-md mx-1'
                                        >
                                            <DeleteIcon className='text-xl'/>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
};

export default TaskListPage;