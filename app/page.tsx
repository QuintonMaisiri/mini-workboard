"use client";

import { AddTaskDialog } from "@/components/addTaskButton";
import Image from "next/image";
import TaskFilters from "@/components/taskFilters";
import TaskList from "@/components/taskList";
import { useTaskFilters } from "@/hooks/useTaskFilters";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/types/types";
import { LoadingSpinner } from "@/components/loading";
import { Error } from "@/components/error";

export default function Home() {
  const { tasksQuery } = useTasks();
  const filtersState = useTaskFilters();

  let data: Task[] = tasksQuery.data;

  return (
    <div className="min-h-screen flex flex-col max-w-[1400px] mx-auto p-8 gap-8 bg-gray-100 ">
      <TaskFilters {...filtersState} />
      <div className="w-full bg-white p-8 py-16  rounded-lg flex items-center justify-between relative">
        <div className="space-y-4">
         <div>
           <h1 className="text-[40px] font-bold">Task Board</h1>
          <p >Manage your tasks efficiently</p>
         </div>
          <AddTaskDialog tasks={data} />
        </div>
        <Image
          src="/images/time-management.png"
          alt="time management illustration"
          width={300}
          height={300}
          className="absolute right-8 bottom-0"
        />
      </div>
     {
      tasksQuery.isLoading ? <LoadingSpinner /> : tasksQuery.error ? <Error />: <TaskList tasks={data} {...filtersState} />
     }
    </div>
  );
}
