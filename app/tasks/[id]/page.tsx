"use client";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/hooks/useTasks";
import { formatDateString } from "@/lib/helper";
import { Task } from "@/types/types";
import { ArrowLeft, Calendar, LoaderIcon, PenToolIcon, User } from "lucide-react";
import { useParams } from "next/navigation";

export default function TaskPage() {
  const params = useParams();
  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : "";
  const { taskQuery } = useTasks(id);

  if (taskQuery.isLoading) {
    return <div>Loading...</div>;
  }

  const task: Task | undefined = taskQuery.data
  if (!task) {
    return <div>Task not found</div>;
  }
  return (
    <div className="max-w-[1400px] mx-auto space-y-6 py-8">
      <div className="flex cursor-pointer text-gray-500 hover:text-gray-700" onClick={()=> window.history.back()}>
        <ArrowLeft /> Back to Board
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">{task.title}</h1>
        <div className="flex gap-4 ">
          <Button>Edit</Button>
          <Button variant="outline">Mark as Done</Button>
        </div>
      </div>
      <div className="flex gap-8 items-center">
        <PenToolIcon />
      <div>
        <h4 className="text-sm text-gray-400">Description</h4>
        <p>{task.description}</p>
      </div>
      </div>
      <div className="flex gap-8 items-center">
        <User />
        <div>
          <h4 className="text-sm text-gray-400">Assigned to</h4>
          <p>{task.assignee}</p>
        </div>
      </div>
       <div className="flex gap-8 items-center">
          <LoaderIcon />
          <div>
            <h4 className="text-sm text-gray-400">Status</h4>
            <p>{task.status}</p>
          </div>
        </div>
       <div className="flex gap-8 items-center">
          <Calendar />
          <div>
            <h4 className="text-sm text-gray-400">Due date</h4>
            <p>{formatDateString(task.dueDate)}</p>
          </div>
        </div>
    </div>
  );
}
