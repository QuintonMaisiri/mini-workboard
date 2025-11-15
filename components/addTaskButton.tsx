import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar22 } from "@/components/datePicker";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useEffect, useRef, useState } from "react";
import { Priority, Task } from "@/types/types";
import { useTasks } from "@/hooks/useTasks";
import { generateTaskId } from "@/lib/helper";

export function AddTaskDialog({tasks} : {tasks: Task[]}) {
  const { createTask } = useTasks();

  const priorities = ["Low", "Medium", "High"];
  const statuses = ["Todo", "Doing", "Done"];
  const assignees = ["Thandi", "Ayo", "Mia"];
  const [formData, setFormData] = useState<Partial<Task>>({
    title: "",
    description: "",
    priority: "Low",
    status: "Todo",
    assignee: "",
    dueDate: "",
  });
  const [errors, setErrors] = useState<{
    title?: boolean;
    priority?: boolean;
    assignee?: boolean;
    status?: boolean;
    dueDate?: boolean;
  }>({});

  useEffect(() => {
    setErrors({});
  }, [formData]);

  const showMissingDetailsErrorToast = (err: string) => {
    toast.error("Not enough details", {
      description: err,
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      showMissingDetailsErrorToast("Title is required.");
      setErrors({ ...errors, title: true });
      return;
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
    
    const id = generateTaskId(tasks)

    createTask.mutate({...formData,id}, {
      onSuccess: () => {
        toast.success("Task created!");
      },
      onError: () => {
        toast.error("Could not create task");
      },
    });
    clearInputs();
  };

  const clearInputs = () => {
    setFormData({
      title: "",
      description: "",
      priority: "Low",
      status: "Todo",
      assignee: "",
      dueDate: "",
    });
  };

  return (
    <Dialog>
      <form id="newTaskForm" onSubmit={onSubmit}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Fill in the details for your new task.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                required={true}
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className={
                  errors.title ? "border-red-500 ring-red-500 ring-2" : ""
                }
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="priority">Priority</Label>
              <Select
                required
                value={formData.priority}
                onValueChange={(v) =>
                  setFormData({ ...formData, priority: v as Priority })
                }
              >
                <SelectTrigger
                  className={`w-full  ${
                    errors.priority ? "border-red-500 ring-red-500 ring-2" : ""
                  }`}
                >
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Priority</SelectLabel>
                    {priorities.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="status">Status</Label>
              <Select
                required
                value={formData.status}
                onValueChange={(v) =>
                  setFormData({ ...formData, status: v as Task["status"] })
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
            </div>
            <div className="grid gap-3">
              <Label htmlFor="assignee">Assignee</Label>
              <Select
                value={formData.assignee}
                required
                onValueChange={(v) => setFormData({ ...formData, assignee: v })}
              >
                <SelectTrigger
                  className={`w-full  ${
                    errors.assignee ? "border-red-500 ring-red-500 ring-2" : ""
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
            </div>
            <div className="grid gap-3">
              <Label htmlFor="dueDate">Due Date</Label>
              <div className="w-full">
                <Calendar22
                  error={errors.dueDate}
                  value={formData.dueDate}
                  onChange={(date) =>
                    setFormData({ ...formData, dueDate: date })
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" form="newTaskForm">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
