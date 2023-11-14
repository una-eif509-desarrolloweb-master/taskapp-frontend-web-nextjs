"use client";

import DeleteTask from "@/app/admin/tasks/delete/[id]/components/DeleteTask";
import {useEffect, useState} from "react";
import axiosInstance from "@/components/utils/axiosInstance";

const TaskDeletePage = ({params}) => {
    const [task, setTask] = useState([]); // State to store tasks
    const [loading, setLoading] = useState(true); // State to handle loading status

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axiosInstance.get(`/tasks/${params.id}`);
                setTask(res.data);
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
        <div className="pageGeneralClass">
            <DeleteTask task={task}/>
        </div>
    )
}

export default TaskDeletePage
