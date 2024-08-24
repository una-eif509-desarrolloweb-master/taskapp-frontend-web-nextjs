import TaskDetails from "@/app/tasks/[id]/components/TaskDetails";
import {notFound} from "next/navigation";

// Fetch task data from the API based on the task ID
/**
 * Fetches the task details based on the provided task ID using SSR (Server-Side Rendering).
 * The 'cache: no-store' option is used to ensure fresh data is retrieved on each request.
 * @param {string} id - The ID of the task to be fetched.
 * @returns {Promise<Object|undefined>} - The task data as a JSON object, or undefined if not found.
 */
async function getTask(id) {
    const url = `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/${id}`;

    // Perform the API request
    const res = await fetch(url, { cache: "no-store" });

    // If the response is not OK (e.g., 404 or other errors), return undefined
    if (!res.ok) {
        return undefined;
    }

    // Return the parsed JSON data
    return res.json();
}

/**
 * TaskDetailsPage Component - Displays the details of a single task.
 * This page uses SSR to fetch the task details before rendering the component.
 * @param {Object} props - The props object containing route parameters.
 * @param {Object} props.params - The route parameters, including the task ID.
 * @returns {JSX.Element} - The JSX for rendering the task details, or a 404 page if the task is not found.
 */
const TaskDetailsPage = async ({ params }) => {
    // Fetch task data based on the provided ID
    const task = await getTask(params.id);

    // If the task is not found, trigger a 404 page
    if (!task) {
        notFound(); // This function should be provided by Next.js to render a 404 page
        return; // Return early to stop further rendering
    }

    // Render the TaskDetails component with the fetched task data
    return (
        <div className='pageGeneralClass'>
            <TaskDetails task={task} />
        </div>
    );
};

export default TaskDetailsPage;