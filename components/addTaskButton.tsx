import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar22 } from "@/components/datePicker"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { Textarea } from "./ui/textarea"

export function AddTaskDialog() {
  // Mock data for dropdowns
  const priorities = ["Low", "Medium", "High"];
  const statuses = ["Todo", "Doing", "Done"];
  const assignees = ["Thandi", "Ayo", "Mia"];
  const [priority, setPriority] = React.useState(priorities[0]);
  const [status, setStatus] = React.useState(statuses[0]);
  const [assignee, setAssignee] = React.useState(assignees[0]);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog>
      <form>
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
              <Input id="title" name="title" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
              id="description"
              name="description"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="priority">Priority</Label>
              {/* Replace with shadcn Select when available */}
              <select
                id="priority"
                name="priority"
                className="border rounded px-2 py-1"
                value={priority}
                onChange={e => setPriority(e.target.value)}
              >
                {priorities.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="status">Status</Label>
              {/* Replace with shadcn Select when available */}
              <select
                id="status"
                name="status"
                className="border rounded px-2 py-1"
                value={status}
                onChange={e => setStatus(e.target.value)}
              >
                {statuses.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="assignee">Assignee</Label>
              {/* Replace with shadcn Select when available */}
              <select
                id="assignee"
                name="assignee"
                className="border rounded px-2 py-1"
                value={assignee}
                onChange={e => setAssignee(e.target.value)}
              >
                {assignees.map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="dueDate">Due Date</Label>
              {/* Use Calendar22 for date picking */}
              <div className="w-full">
                <Calendar22 />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
