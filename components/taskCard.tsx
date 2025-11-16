import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Task, TaskStatus } from "@/types/types";
import { Calendar, Ellipsis, Flag, LoaderIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDateString, getInitials } from "@/lib/helper";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import ViewTaskSideSheet from "./viewTaskSideSheet";
import { useTasks } from "@/hooks/useTasks";
import { toast } from "sonner";
import Link from "next/link";
import { statuses } from "@/lib/constants";

const getStatusChangeOptions = (currentStatus: string) => {
  return statuses.filter((status) => status !== currentStatus);
};

function CardEllipseDropdownMenu({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const { deleteTask, updateTask } = useTasks();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          <Link href={`/tasks/${id}`}>
            <DropdownMenuItem>Open</DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            onClick={() =>
              deleteTask.mutate(id, {
                onSuccess: () => {
                  toast.success("Task deleted!");
                },
                onError: () => {
                  toast.error("Could not delete task");
                },
              })
            }
          >
            Delete
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Mark as</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {getStatusChangeOptions(status).map((status) => (
                  <DropdownMenuItem
                    onClick={() =>
                      updateTask.mutate(
                        { id, status: status as TaskStatus },
                        {
                          onSuccess: () => {
                            toast.success("Task status updated!");
                          },
                          onError: () => {
                            toast.error("Could not update task status");
                          },
                        }
                      )
                    }
                    key={status}
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AvatarHoverCard({ name }: { name: string }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="p-0">
          <Avatar className="bg-indigo-400 rounded-full p-2 w-10 flex items-center justify-center h-10">
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-max">
        <div className="flex justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{name}</h4>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default function TaskCard({ task }: { task: Task }) {
  const priorityColors: { [key: string]: string } = {
    Low: "text-green-500",
    Medium: "text-yellow-500",
    High: "text-red-500",
  };
  return (
    <ViewTaskSideSheet task={task}>
      <Card className="h-max">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex gap-2 items-center  text-[#27104E]">
            <div
              className={`w-5 h-5 ${
                priorityColors[task.priority]
              } rounded-full`}
            ></div>

            <h2 className="text-lg font-bold">{task.title} </h2>
          </CardTitle>
          <CardAction>
            <CardEllipseDropdownMenu id={task.id} status={task.status} />
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>{task.description}</p>
          <div className="flex items-center gap-2 mt-4">
            <Flag className={`${priorityColors[task.priority]} w-4 h-4`} />
            <span className="text-sm text-gray-500 ml-2">{task.priority}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <LoaderIcon className="text-purple-600 w-4 h-4" />
            <span className="text-sm text-gray-500 ml-2">{task.status}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Calendar className="text-purple-600 w-4 h-4" />
            <span className="text-sm text-gray-500 ml-2">
              {formatDateString(task.dueDate)}
            </span>
          </div>
        </CardContent>
        <CardFooter className="text-white">
          <div className="flex items-center justify-between w-full">
            <AvatarHoverCard name={task.assignee} />
            {new Date() > new Date(task.dueDate) && task.status !== "Done" && (
              <div className="rounded-full bg-red-400 px-8 py-2 text-sm font-bold">Due</div>
            )}
          </div>
        </CardFooter>
      </Card>
    </ViewTaskSideSheet>
  );
}
