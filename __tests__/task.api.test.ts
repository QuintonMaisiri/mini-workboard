import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { setupServer } from "msw/node";
import { handlers } from "@/lib/msw";
import fetch from "node-fetch"; // Node environment
import { Task } from "@/types/types";

// Start MSW server with your handlers
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Task API Endpoints", () => {
  it("GET /api/tasks should return all tasks", async () => {
    const response = await fetch("http://localhost:3000/api/tasks");
    expect(response.status).toBe(200);

    const data = (await response.json()) as Task[];
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty("id");
    expect(data[0]).toHaveProperty("title");
  });

  it("GET /api/tasks/:id should return a single task by id", async () => {
    const taskId = "t1"; // make sure this exists in your mock db
    const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`);
    expect(response.status).toBe(200);

    const task = (await response.json()) as Task;
    expect(task).toHaveProperty("id", taskId);
    expect(task).toHaveProperty("title");
    expect(task).toHaveProperty("status");
  });
});
