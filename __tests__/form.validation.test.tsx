import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddTaskDialog } from "@/components/addTaskButton";
import { toast } from "sonner";

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock("@/lib/helper", () => ({
  generateTaskId: () => "123",
  showMissingDetailsErrorToast: (msg: string) => toast.error(msg),
}));

vi.mock("@/lib/constants", () => ({
  assignees: ["Thandi", "Ayo", "Mia"],
  priorities: ["Low", "Medium", "High"],
  statuses: ["Todo", "Doing", "Done"],
}));

// Mock useTasks
const mutateMock = vi.fn();
vi.mock("@/hooks/useTasks", () => ({
  useTasks: () => ({
    createTask: { mutate: mutateMock },
  }),
}));

describe("AddTaskDialog", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    mutateMock.mockReset();
  });

  it("shows error when required title is missing", async () => {
    render(<AddTaskDialog tasks={[]} />);

    // Open modal
    await user.click(screen.getByRole("button", { name: /add new task/i }));

    // Click Save
    await user.click(screen.getByRole("button", { name: /save changes/i }));

    // EXPECT — your helper → toast.error("Title is required.")
    expect(toast.error).toHaveBeenCalledWith("Title is required.");

    expect(mutateMock).not.toHaveBeenCalled();
  });

  it("shows error when assignee is missing", async () => {
    render(<AddTaskDialog tasks={[]} />);

    // Open modal
    await user.click(screen.getByRole("button", { name: /add new task/i }));

    // Fill the required title
    await user.type(screen.getByLabelText(/title/i), "Test Task");

    // Click Save
    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(toast.error).toHaveBeenCalledWith(
      "You must assign the task to someone."
    );

    expect(mutateMock).not.toHaveBeenCalled();
  });
});
