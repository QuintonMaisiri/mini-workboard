"use client";

import { AddTaskDialog } from "@/components/addTaskButton";
import TaskCard from "@/components/taskCard";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/types/types";

export const taskStatusList = ["Todo", "Doing", "Done"];

export default function Home() {
  const { tasksQuery } = useTasks();
  return (
    <div className="min-h-screen flex flex-col max-w-[1400px] mx-auto p-8 gap-8 ">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Board</h1>
        <AddTaskDialog />
      </div>
      <div className="flex-1 grid grid-cols-3 gap-4">
        {taskStatusList.map((section) => (
          <div
            key={section}
            className="flex flex-col p-4 bg-[#EEF2F5] text-gray-600 rounded-lg min-h-0 h-full"
            style={{ minHeight: 0 }}
          >
            <h2 className="text-xl mb-4">{section}</h2>
            {tasksQuery.data
              ?.filter((task: Task) => task.status === section)
              .map((task: Task) => (
                <TaskCard key={task.id} task={task} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
