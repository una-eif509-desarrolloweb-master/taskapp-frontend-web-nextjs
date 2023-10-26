import { notFound } from "next/navigation"
import EditTaskForm from "@/app/tasks/edit/[id]/components/EditTaskForm";

async function getTask(id) {
    const url = `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/${id}`
    // This is SSR
    const res = await fetch(url, { cache: "no-store" })

    if (!res.ok) {
        return undefined
    }

    return res.json()
}

const TaskEditPage = async ({ params }) => {
    const task = await getTask(params.id)

    if (!task) {
        notFound()
    }

    return (
        <div className="pageGeneralClass">
            <EditTaskForm task={task} />
        </div>
    )
}

export default TaskEditPage
