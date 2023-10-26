import TaskDetails from "@/app/tasks/[id]/components/TaskDetails";

async function getTask(id) {
    const url = `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/${id}`
    // This is SSR
    const res = await fetch(url, { cache: "no-store" })

    if (!res.ok) {
        return undefined
    }

    return res.json()
}

const TaskDetailsPage = async ({ params }) => {
    const tasks = await getTask(params.id)

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
