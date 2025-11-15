"use client";

import { AddTaskDialog } from "@/components/addTaskButton";
import TaskCard from "@/components/taskCard";
import TaskFilters from "@/components/taskFilters";
import RightDrawer from "@/components/viewTaskSideSheet";
import { Filters, useTaskFilters } from "@/hooks/useTaskFilters";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/types/types";

export const taskStatusList = ["Todo", "Doing", "Done"];

interface TaskListProps {
  tasks: Task[];
  filters: Filters;
}

export default function TaskList({ tasks, filters }: TaskListProps) {
  if (filters.search) {
    tasks = tasks.filter((t) =>
      t.title.toLowerCase().includes(filters.search.toLowerCase())
    );
  }

  // Filter by status
  if (filters.status) {
    tasks = tasks.filter((t) => t.status === filters.status);
  }

  // Filter by assignee
  if (filters.assignee) {
    tasks = tasks.filter((t) =>
      t.assignee.toLowerCase().includes(filters.assignee.toLowerCase())
    );
  }

  // Sorting
  if (filters.sort === "due") {
    tasks = tasks.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  }

  if (filters.sort === "priority") {
    const order = { High: 1, Medium: 2, Low: 3 };
    tasks = tasks.sort((a, b) => order[a.priority] - order[b.priority]);
  }

  if (!tasks.length) return <p>No tasks match your filters.</p>;

  return (
    <div className="flex-1 grid grid-cols-4 gap-4">
      {tasks.map((task: Task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
