"use client";

import TaskDetails from "@/app/admin/tasks/[id]/components/TaskDetails";
import axiosInstance from "@/components/utils/axiosInstance";
import {useEffect, useState} from "react";

const TaskDetailsPage = ({params}) => {
    const [tasks, setTasks] = useState([]); // State to store tasks
    const [loading, setLoading] = useState(true); // State to handle loading status

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axiosInstance.get(`/tasks/${params.id}`);
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
        <div className='pageGeneralClass'>
            <TaskDetails task={tasks}/>
        </div>
    )
}

export default TaskDetailsPage
