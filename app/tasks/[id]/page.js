import TaskDetails from "@/app/tasks/[id]/components/TaskDetails";

async function getTicket(id) {
    const url = `${process.env.API_BACKEND_URL}/${id}`
    // This is SSR
    const res = await fetch(url, { cache: "no-store" })

    if (!res.ok) {
        return undefined
    }

    return res.json()
}

const TaskDetailsPage = async ({ params }) => {
    const tasks = await getTicket(params.id)

    if (!tasks) {
        notFound()
    }

    return (
        <div className='pageGeneralClass'>
            <TaskDetails task={tasks} />
        </div>
    )
}

export default TaskDetailsPage
