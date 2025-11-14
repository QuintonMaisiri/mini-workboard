import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Task } from "@/types/types";
import { Clock, Ellipsis } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "path";
import { formatDateString, getInitials } from "@/lib/helper";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

function CardEllipseDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem>Open</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Mark as</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Doing</DropdownMenuItem>
                <DropdownMenuItem>Done</DropdownMenuItem>
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
        <Button variant="link">
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
    )
}



export default function TaskCard({ task }: { task: Task }) {
 
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2 items-center text-gray-600">
          <Clock />
          {formatDateString(task.dueDate)}
        </CardTitle>
        <CardAction>
          <CardEllipseDropdownMenu />
        </CardAction>
      </CardHeader>
      <CardContent>
        <h2 className="text-lg font-bold">{task.title}</h2>
        <p>{task.description}</p>
      </CardContent>
      <CardFooter className="text-white">
        <AvatarHoverCard name={task.assignee} />
      </CardFooter>
    </Card>
  );
}

  
