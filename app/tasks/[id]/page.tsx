"use client";
import { Calendar22 } from "@/components/datePicker";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTasks } from "@/hooks/useTasks";
import { assignees, priorities, statuses } from "@/lib/constants";
import { formatDateString, showMissingDetailsErrorToast } from "@/lib/helper";
import { Task } from "@/types/types";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Calendar,
  Flag,
  LoaderIcon,
  PenToolIcon,
  User,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/loading";

export default function TaskPage() {
  const params = useParams();
  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : "";

  const { taskQuery, updateTask, deleteTask } = useTasks(id);
  const task: Task | undefined = taskQuery.data;

  const [formData, setFormData] = useState<Task | null>(null);
  const [edit, setEdit] = useState(false);

  const [errors, setErrors] = useState({
    dueDate: false,
  });

  useEffect(() => {
    if (task) setFormData(task);
  }, [task]);

  const setField = (key: keyof Task, value: any) => {
    setFormData((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const submitChanges = () => {
    if (!formData) return;

    const newErrors = {
      dueDate: !formData.dueDate,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).includes(true)) {
      showMissingDetailsErrorToast("Please fill in all required fields.");
      return;
    }

    if (new Date(formData.dueDate) < new Date()) {
      setErrors((e) => ({ ...e, dueDate: true }));
      showMissingDetailsErrorToast("Due Date cannot be in the past.");
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

  // Loaders
  if (taskQuery.isLoading || !formData) {
    return (
      <div className="w-screen h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 py-8">
      <div className="w-full bg-white p-8 py-16 rounded-lg flex items-center justify-between relative">
        <div className="space-y-4 w-full">
          <div
            className="flex cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={() => window.history.back()}
          >
            <ArrowLeft /> Back to Board
          </div>

          <div className="flex items-center justify-between w-full">
            <h1 className="text-[40px] font-bold">{formData.title}</h1>

            <div className="flex gap-4">
              <Button onClick={() => setEdit((prev) => !prev)}>
                {edit ? "Cancel" : "Edit"}
              </Button>

              {!edit && <Button variant="destructive" onClick={()=>{
                deleteTask.mutate(id, {
                  onSuccess: () => {
                    window.history.back();
                    toast.success("Task deleted!");
                  },
                  onError: () => {
                    toast.error("Failed to delete task");
                  },
                });
              }}>Delete</Button>}

              {edit && (
                <Button className="bg-green-600" onClick={submitChanges}>
                  Save changes
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="flex gap-8 items-center">
        <PenToolIcon />
        <div className="w-full">
          <h4 className="text-sm text-gray-400">Description</h4>

          {edit ? (
            <Textarea
              value={formData.description}
              onChange={(e) => setField("description", e.target.value)}
            />
          ) : (
            <p>{formData.description}</p>
          )}
        </div>
      </div>

      {/* Priority */}
      <div className="flex gap-8 items-center">
        <Flag />
        <div className="w-full">
          <h4 className="text-sm text-gray-400">Priority</h4>
          {edit ? (
            <Select
              value={formData.priority}
              onValueChange={(v) => setField("priority", v)}
            >
              <SelectTrigger className={`w-full `}>
                <SelectValue placeholder="Select a priority" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Priority</SelectLabel>
                  {priorities.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <p>{formData.priority}</p>
          )}
        </div>
      </div>

      

      {/* ASSIGNEE */}
      <div className="flex gap-8 items-center">
        <User />
        <div className="w-full">
          <h4 className="text-sm text-gray-400">Assigned to</h4>

          {edit ? (
            <Select
              value={formData.assignee}
              onValueChange={(v) => setField("assignee", v)}
            >
              <SelectTrigger className={`w-full `}>
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
            <p>{formData.assignee}</p>
          )}
        </div>
      </div>

      {/* STATUS */}
      <div className="flex gap-8 items-center">
        <LoaderIcon />
        <div className="w-full">
          <h4 className="text-sm text-gray-400">Status</h4>

          {edit ? (
            <Select
              value={formData.status}
              onValueChange={(v) => setField("status", v as Task["status"])}
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
            <p>{formData.status}</p>
          )}
        </div>
      </div>

      {/* DUE DATE */}
      <div className="flex gap-8 items-center">
        <Calendar />
        <div className="w-full">
          <h4 className="text-sm text-gray-400">Due date</h4>

          {edit ? (
            <Calendar22
              error={errors.dueDate}
              value={formData.dueDate}
              onChange={(d) => setField("dueDate", d)}
            />
          ) : (
            <p>{formatDateString(formData.dueDate)}</p>
          )}
        </div>
      </div>
    </div>
  );
}
