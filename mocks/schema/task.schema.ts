import { z } from "zod";

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  status: z.enum(["Todo", "Doing", "Done"]),
  assignee: z.string().min(1),
  priority: z.enum(["Low", "Medium", "High"]),
  dueDate: z.string(),
  description: z.string().optional(),
});

export const TasksSchema = z.array(TaskSchema);

export type Tasks = z.infer<typeof TasksSchema>;
