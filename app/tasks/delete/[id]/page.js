import DeleteTask from "@/app/tasks/delete/[id]/components/DeleteTask";

/**
 * getTask Function
 *
 * Fetches task details from the backend API using the provided task ID.
 * This function is intended for server-side rendering (SSR).
 *
 * @param {string} id - The unique identifier of the task to be fetched.
 * @returns {Object|undefined} The task data if the fetch is successful, otherwise undefined.
 */
async function getTask(id) {
    const url = `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/${id}`;

    // Fetch task data from the API without caching (to ensure fresh data)
    const res = await fetch(url, { cache: "no-store" });

    // If the response is not ok (e.g., 404), return undefined
    if (!res.ok) {
        return undefined;
    }

    // Parse the JSON response and return the task data
    return res.json();
}

/**
 * TaskDeletePage Component
 *
 * This is a server-side rendered page component that fetches a task by its ID
 * and displays the DeleteTask component to allow users to delete the task.
 *
 * @param {Object} props - Component properties
 * @param {Object} props.params - The parameters object containing route parameters
 * @param {string} props.params.id - The unique identifier of the task from the route
 *
 * @returns {JSX.Element} The rendered page component
 */
const TaskDeletePage = async ({ params }) => {
    // Fetch the task data using the provided ID
    const task = await getTask(params.id);

    // If no task is found, trigger the notFound function (assumes Next.js routing)
    if (!task) {
        notFound(); // This would typically render a 404 page or similar
    }

    return (
        <div className="pageGeneralClass">
            {/* Render the DeleteTask component with the fetched task data */}
            <DeleteTask task={task} />
        </div>
    );
};

export default TaskDeletePage;