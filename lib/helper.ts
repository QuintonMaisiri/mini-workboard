import { toast } from "sonner";
import { Task } from "@/types/types";

 export const showMissingDetailsErrorToast = (err: string) => {
    toast.error("Not enough details", {
      description: err,
    });
  };


export function formatDateString(input: string): string {
    const date = new Date(input);
    if (isNaN(date.getTime())) return '';

    return date
        .toLocaleDateString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        })
        .replace(',', '')
        .toLowerCase();
}

 export const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  export const generateTaskId = (tasks: Task[]) => {
        const maxId = tasks.reduce((max: number, task: { id: string }) => {
            const numericId = typeof task.id === 'string' && task.id.startsWith('t')
                ? parseInt(task.id.slice(1), 10)
                : Number(task.id);
            return numericId > max ? numericId : max;
        }, 0);
        return `t${maxId + 1}`;
  }