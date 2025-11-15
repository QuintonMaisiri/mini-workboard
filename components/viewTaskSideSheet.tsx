import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { formatDateString, showMissingDetailsErrorToast } from "@/lib/helper";
import { PenToolIcon, User, LoaderIcon, Calendar, Trash } from "lucide-react";
import { Task } from "@/types/types";
import { useTasks } from "@/hooks/useTasks";
import { toast } from "sonner";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { assignees, statuses } from "@/lib/constants";
import { Calendar22 } from "./datePicker";

export default function ViewTaskSideSheet({
  children,
  task,
}: {
  children?: React.ReactNode;
  task: Task;
}) {
  
    const { deleteTask,updateTask } = useTasks();
  const handleDelete = (id: string) => {
    deleteTask.mutate(id, {
      onSuccess: () => {
        toast.success("Task deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete task");
      },
    });
  };

  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState<Task>(task);
  const [errors, setErrors] = useState<{
    title?: boolean;
    priority?: boolean;
    assignee?: boolean;
    status?: boolean;
    dueDate?: boolean;
  }>({});

  const submitChanges = () => {
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

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="fixed bottom-0 right-0 mt-0 h-full w-[600px] rounded-l-lg after:!hidden">
        <DrawerHeader>
          <DrawerTitle className="flex items-center justify-between">
            <p className="text-4xl font-bold">{task.title}</p>

            <Button onClick={() => setEdit(!edit)}>
              {edit ? "Cancel" : "Edit"}
            </Button>
          </DrawerTitle>
          <DrawerDescription>View and edit task</DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="text-sm ">
            <div className="flex gap-8 items-center">
              <PenToolIcon />
              <div className="w-full">
                <h4 className="text-sm text-gray-400">Description</h4>

                {edit ? (
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
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
                  value={formData.assignee}
                  required
                  onValueChange={(v) =>
                    setFormData({ ...formData, assignee: v })
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
                    value={formData.dueDate}
                    onChange={(date) =>
                      setFormData({ ...formData, dueDate: date })
                    }
                  />
                </div>
              ) : (
                <p>{formatDateString(task.dueDate)}</p>
              )}
            </div>
          </div>
        </div>

        <DrawerFooter>
          <div className="flex gap-4 ">
            {edit ? (
              <Button onClick={submitChanges}>
                Save changes
              </Button>
            ) : (
              <Button
                onClick={() => {
                  handleDelete(task.id);
                }}
                variant={"destructive"}
              >
                <Trash /> Delete
              </Button>
            )}
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
