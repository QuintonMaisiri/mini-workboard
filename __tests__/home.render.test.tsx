import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "@/app/page";

// Mock AddTaskDialog so it doesn't rely on props or API
vi.mock("@/components/addTaskButton", () => ({
  AddTaskDialog: () => <button>Add Task</button>,
}));

// Mock TaskFilters so it doesn't break
vi.mock("@/components/taskFilters", () => ({
  default: () => <div>Filters</div>,
}));

// Mock TaskList for static content test
vi.mock("@/components/taskList", () => ({
  default: () => <div>Task List</div>,
}));

// Mock LoadingSpinner and Error
vi.mock("@/components/loading", () => ({
  LoadingSpinner: () => <div>Loading...</div>,
}));
vi.mock("@/components/error", () => ({
  Error: () => <div>Error!</div>,
}));

describe("Home Page - Static Content", () => {
  const queryClient = new QueryClient();

  const renderWithClient = (ui: React.ReactElement) =>
    render(
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    );

  it("renders the page heading and subheading", () => {
    renderWithClient(<Home />);

    const heading = screen.getByRole("heading", { name: /task board/i });
    expect(heading).toBeInTheDocument();

    const subheading = screen.getByText(/manage your tasks efficiently/i);
    expect(subheading).toBeInTheDocument();
  });

  it("renders the AddTaskDialog button", () => {
    renderWithClient(<Home />);
    const addButton = screen.getByText(/add task/i);
    expect(addButton).toBeInTheDocument();
  });

  it("renders the time management image", () => {
    renderWithClient(<Home />);
    const image = screen.getByAltText(/time management illustration/i);
    expect(image).toBeInTheDocument();
  });
});
