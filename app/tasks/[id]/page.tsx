"use client";
import { Calendar22 } from "@/components/datePicker";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTasks } from "@/hooks/useTasks";
import { assignees, statuses } from "@/lib/constants";
import { formatDateString, showMissingDetailsErrorToast } from "@/lib/helper";
import { Task } from "@/types/types";
import { Select,SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";
import {
  ArrowLeft,
  Calendar,
  LoaderIcon,
  PenToolIcon,
  User,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function TaskPage() {
  const params = useParams();
  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : "";
  const { taskQuery, updateTask } = useTasks(id);

  const task: Task | undefined = taskQuery.data;

  const [formData, setFormData] = useState<Task | undefined>(task);
  const [edit, setEdit] = useState(false);
  const [errors, setErrors] = useState({
    priority: false,
    assignee: false,
    status: false,
    dueDate: false,
  });

  const submitChanges = () => {
    if (!formData){
      return
    }
    if (!formData.priority) {
      showMissingDetailsErrorToast("Priority is required.");
      setErrors({ ...errors, priority: true });
      return;
    }
    if (!formData.assignee) {
      showMissingDetailsErrorToast("You must assign the task to someone.");
      setErrors({ ...errors, assignee: true });
      return;
    }
    if (!formData.status) {
      showMissingDetailsErrorToast("Task Status is required");
      setErrors({ ...errors, status: true });
      return;
    }

    if (!formData.dueDate) {
      showMissingDetailsErrorToast("Due Date is required");
      setErrors({ ...errors, dueDate: true });
      return;
    }

    if (formData.dueDate && new Date(formData.dueDate) < new Date()) {
      showMissingDetailsErrorToast("Due Date cannot be in the past.");
      setErrors({ ...errors, dueDate: true });
      return;
    }

    updateTask.mutate(formData, {
      onSuccess: () => {
        toast.success("Task updated successfully");
        setEdit(false);
      },
      onError: () => {
        toast.error("Failed to update task");
      },
    });
  };

    if (taskQuery.isLoading) {
    return <div>Loading...</div>;
  }


   if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 py-8">
      <div
        className="flex cursor-pointer text-gray-500 hover:text-gray-700"
        onClick={() => window.history.back()}
      >
        <ArrowLeft /> Back to Board
      </div>
      
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">{task.title}</h1>
        <div className="flex gap-4 ">
          <Button onClick={(e)=>{setEdit(!edit)}}>{edit ? "Cancel" : "Edit"}</Button>
          <Button variant="destructive">Delete</Button>
          {
            edit && <Button className="bg-green-600" onClick={submitChanges}>Save changes</Button>
          }
        </div>
      </div>
       <div className="flex-1 overflow-y-auto space-y-6">
            <div className="flex gap-8 items-center">
              <PenToolIcon />
              <div className="w-full">
                <h4 className="text-sm text-gray-400">Description</h4>

                {edit ? (
                  <Textarea
                    id="description"
                    name="description"
                    value={formData!.description}
                    onChange={(e) =>
                      setFormData({ ...formData!, description: e.target.value })
                    }
                  />
                ) : (
                  <p>{task.description}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-8 items-center">
            <User />
            <div className="w-full">
              <h4 className="text-sm text-gray-400">Assigned to</h4>
              {edit ? (
                <Select
                  value={formData!.assignee}
                  required
                  onValueChange={(v) =>
                    setFormData({ ...formData!, assignee: v })
                  }
                >
                  <SelectTrigger
                    className={`w-full  ${
                      errors.assignee
                        ? "border-red-500 ring-red-500 ring-2"
                        : ""
                    }`}
                  >
                    <SelectValue placeholder="Select an assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Assignee</SelectLabel>
                      {assignees.map((a) => (
                        <SelectItem key={a} value={a}>
                          {a}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <p>{task.assignee}</p>
              )}
            </div>
          </div>
          <div className="flex gap-8 items-center">
            <LoaderIcon />
            <div className="w-full">
              <h4 className="text-sm text-gray-400">Status</h4>
              {edit ? (
                <Select
                  required
                  value={formData!.status}
                  onValueChange={(v) =>
                    setFormData({ ...formData!, status: v as Task["status"] })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      {statuses.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <p>{task.status}</p>
              )}
            </div>
          </div>
          <div className="flex gap-8 items-center">
            <Calendar />
            <div className="w-full">
              <h4 className="text-sm text-gray-400">Due date</h4>
              {edit ? (
                <div className="w-full">
                  <Calendar22
                    error={errors.dueDate}
                    value={formData!.dueDate}
                    onChange={(date) =>
                      setFormData({ ...formData!, dueDate: date })
                    }
                  />
                </div>
              ) : (
                <p>{formatDateString(task.dueDate)}</p>
              )}
            </div>
          </div>
    </div>
  );
}
