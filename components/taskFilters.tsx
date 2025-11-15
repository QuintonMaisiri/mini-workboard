"use client";

import { useTaskFilters } from "@/hooks/useTaskFilters";
import { TaskStatus } from "@/types/types";

export default function TaskFilters({
  filters,
  setSearch,
  setStatus,
  setAssignee,
  setSort,
  resetFilters,
}: ReturnType<typeof useTaskFilters>) {
  return (
    <div className="flex gap-4 flex-wrap mb-4">
      {/* Search */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={filters.search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded"
      />

      {/* Status filter */}
      <select
        value={filters.status}
        onChange={(e) => setStatus(e.target.value as TaskStatus | "")}
        className="border p-2 rounded"
      >
        <option value="">All Status</option>
        <option value="Todo">Todo</option>
        <option value="Doing">Doing</option>
        <option value="Done">Done</option>
      </select>

      {/* Assignee filter */}
      <input
        type="text"
        placeholder="Filter by assignee..."
        value={filters.assignee}
        onChange={(e) => setAssignee(e.target.value)}
        className="border p-2 rounded"
      />

      {/* Sorting */}
      <select
        value={filters.sort}
        onChange={(e) => setSort(e.target.value as "due" | "priority" | "")}
        className="border p-2 rounded"
      >
        <option value="">No Sorting</option>
        <option value="due">Due Date</option>
        <option value="priority">Priority</option>
      </select>

      {/* Reset */}
      <button onClick={resetFilters} className="bg-gray-200 px-3 py-1 rounded">
        Reset
      </button>
    </div>
  );
}
