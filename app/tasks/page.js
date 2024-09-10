import React from 'react';
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
import Link from "next/link";

/**
 * Tips for Students:
 *
 * Separation of Concerns: Although we placed getTasks inside the component file for demonstration purposes,
 * in production, it’s better to separate API logic into a different module or service.
 * Use of Keys: React requires a unique key for each element rendered inside a loop, which improves performance
 * and ensures stable DOM updates. In this example, task.id is used as the key.
 * SSR vs. CSR: This example showcases SSR, but students should explore CSR (Client-Side Rendering) and understand
 * when each is appropriate based on use cases.
 */

// Metadata for SEO purposes in a Next.js app
export const metadata = {
    title: "Task List | TaskApp",
    description: "This page displays a list of tasks fetched from an external API."
};

/**
 * Fetches task data from the provided API endpoint using SSR (Server Side Rendering).
 * The 'cache: no-store' option prevents caching, ensuring fresh data on every request.
 * @param {string} url - The API URL from which to fetch the tasks.
 * @returns {Promise<Object[]>} - Returns the fetched task data as an array of objects.
 * @throws Will throw an error if the fetch request fails.
 */
async function getTasks(url) {
    const res = await fetch(url, {cache: 'no-store'}); // SSR: Server-Side Rendering
    if (!res.ok) {
        throw new Error('Failed to fetch data'); // Error handling for failed API requests
    }
    return res.json(); // Parse and return the JSON data
}

/**
 * TicketsListPage Component - Displays a list of tasks in a table format.
 * @param {Object} props - The component's props.
 * @param {Object} props.searchParams - The search parameters passed in the URL.
 * @returns {JSX.Element} - Returns the JSX code to render the table of tasks.
 */
const TicketsListPage = async ({searchParams}) => {
    // Construct the API URL
    let url = process.env.NEXT_PUBLIC_API_BACKEND_URL;
    if (searchParams.q) {
        url = `${url}?q=${searchParams.q}`; // Add search query to the URL if present
    }

    // Fetch task data from the API
    const tasks = await getTasks(url);

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="task table">
                {/* Table Head - Defines the columns of the table */}
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

                {/* Table Body - Populates the rows of the table with task data */}
                <TableBody>
                    {tasks.map((task) => (
                        <TableRow
                            key={task.id} // Use a unique key based on task ID
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {task.title} {/* Task title */}
                            </TableCell>
                            <TableCell align="right">{task.notes}</TableCell>
                            <TableCell align="right">{task.createDate}</TableCell>
                            <TableCell align="right">{task.dueDate}</TableCell>
                            <TableCell align="right">{task.status.label}</TableCell>
                            <TableCell align="center">
                                {/* Preview, Edit, and Delete buttons */}
                                <Link href={`/tasks/${task.id}`} className='bg-green-600 p-1 rounded-md mx-1'>
                                    <PreviewIcon className='text-xl'/>
                                </Link>
                                <EditIcon className='mx-1 text-blue-600'/>
                                <Link href={`/tasks/delete/${task.id}`} className='bg-green-600 p-1 rounded-md mx-1'>
                                    <DeleteIcon className='text-xl'/>
                                </Link>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tickets.map((task) => (
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
                                        href={`/tasks/${task.id}`}
                                        className='bg-green-600 p-1 rounded-md mx-1'
                                    >
                                        <PreviewIcon className='text-xl'/>
                                    </Link>
                                    <Link
                                        href={`/tasks/edit/${task.id}`}
                                        className='bg-green-600 p-1 rounded-md mx-1'
                                    >
                                        <EditIcon className='text-xl'/>
                                    </Link>
                                    <Link
                                        href={`/tasks/delete/${task.id}`}
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
        </>
    );
};

export default TicketsListPage;