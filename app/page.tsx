"use client";

import { AddTaskDialog } from "@/components/addTaskButton";
import TaskCard from "@/components/taskCard";
import TaskFilters from "@/components/taskFilters";
import TaskList from "@/components/taskList";
import RightDrawer from "@/components/viewTaskSideSheet";
import { useTaskFilters } from "@/hooks/useTaskFilters";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/types/types";

export const taskStatusList = ["Todo", "Doing", "Done"];

export default function Home() {
  const { tasksQuery } = useTasks();
  const filtersState = useTaskFilters();

  if (tasksQuery.isLoading) return <p>Loading tasks...</p>;
  if (tasksQuery.isError) return <p>Error loading tasks</p>;

  let data: Task[] = tasksQuery.data;

  return (
    <div className="min-h-screen flex flex-col max-w-[1400px] mx-auto p-8 gap-8 ">
      <TaskFilters {...filtersState} />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Board</h1>
        <AddTaskDialog tasks={data} />
      </div>
      <TaskList tasks={data} filters={filtersState.filters} />
    </div>
  );
}
