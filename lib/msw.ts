import { TaskSchema, TasksSchema } from "@/mocks/schema/task.schema";
import { http, HttpResponse } from "msw";
import { tasks, users } from "@/mocks/db.json";
import { z } from "zod";

export const handlers = [
  http.get("/api/users", () => {
    z.array(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    ).parse(users);
    return HttpResponse.json(users);
  }),

  http.get("/api/tasks", () => {
    const validated = TasksSchema.safeParse(tasks);
    if (!validated.success) {
      return HttpResponse.json(
        { error: "Invalid task data", issues: z.treeifyError(validated.error) },
        { status: 500 }
      );
    }
    return HttpResponse.json(validated.data);
  }),

  http.get("/api/tasks/:id", (req) => {
    const { id } = req.params;
    const task = tasks.find((t) => t.id === id);
    const validated = TaskSchema.safeParse(task);
    if (!validated.success) {
      return HttpResponse.json(
        {
          error: `Task ${id} not found or invalid`,
          issues: z.treeifyError(validated.error),
        },
        { status: 500 }
      );
    }
    return HttpResponse.json(validated.data);
  }),

  http.post("/api/tasks", async ({ request }) => {
    const body = await request.json();
    const validated = TaskSchema.safeParse(body);
    if (!validated.success) {
      return HttpResponse.json(
        { error: "Invalid task data", issues: z.treeifyError(validated.error) },
        { status: 500 }
      );
    }
    const newTask = {
      ...validated.data,
      description: validated.data.description ?? "",
    };
    tasks.push(newTask);
    return HttpResponse.json(newTask);
  }),

  http.patch("/api/tasks/:id", async ({ request, params }) => {
    const { id } = params;
    const body = await request.json();

    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      return HttpResponse.json(
        { error: `Task ${id} not found` },
        { status: 404 }
      );
    }

    if (
      typeof tasks[taskIndex] === "object" &&
      tasks[taskIndex] !== null &&
      typeof body === "object" &&
      body !== null
    ) {
      tasks[taskIndex] = { ...tasks[taskIndex], ...body };
      return HttpResponse.json(tasks[taskIndex]);
    } else {
      return HttpResponse.json(
        { error: "Invalid data for update" },
        { status: 400 }
      );
    }
  }),

  http.delete("/api/tasks/:id", ({ params }) => {
    const { id } = params;
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      return HttpResponse.json(
        { error: `Task ${id} not found` },
        { status: 404 }
      );
    }
    tasks.splice(taskIndex, 1);
    return HttpResponse.json({ message: `Task ${id} deleted` });
  }),
];
