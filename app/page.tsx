"use client";

import TaskCard from "@/components/taskCard";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/types/types";
import Image from "next/image";

export default function Home() {
  const { tasksQuery } = useTasks();
  console.log(tasksQuery.data);
  return (
    <div className="grid grid-cols-3 gap-4">
      {
        tasksQuery.data?.map((task: Task) => (
          <TaskCard key={task.id} task={task} />
        ))
      }
    </div>
  );
}
