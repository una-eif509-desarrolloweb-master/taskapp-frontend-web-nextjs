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

export const metadata = {
    title: "Task List | TaskApp",
    description: "Test Description for task list page"
}

// As a Default Rule, All of your fetched data would be cached (SSG)
// SSG -> Static Site Generation
// ISR -> Incremental Site Regeneration
// SSR -> Server Side Rendering
// CSR -> Client Side Rendering
// This is an external API call, and it is better to be outside your component
// But in this tutorial, we place it here for easier understanding
async function getTickets(url) {
    // This is SSR
    const res = await fetch(url, {cache: 'no-store'});
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

const TicketsListPage = async ({searchParams}) => {
    let url = process.env.NEXT_PUBLIC_API_BACKEND_URL;
    if (searchParams.q) {
        url = `${url}?q=${searchParams.q}`;
    }
    // Fetch data from url
    const tickets = await getTickets(url);

    return (
        <>
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