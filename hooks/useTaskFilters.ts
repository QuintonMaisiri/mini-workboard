
// /hooks/useTaskFilters.ts
import { useState } from "react";
import { TaskStatus, Priority } from "@/types/types";

export type SortOption = "due" | "priority" | "";

export interface Filters {
  search: string;
  status: TaskStatus | "";
  assignee: string;
  sort: SortOption;
}

export function useTaskFilters() {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    status: "",
    assignee: "",
    sort: "",
  });

  const setSearch = (value: string) =>
    setFilters((f) => ({ ...f, search: value }));

  const setStatus = (value: TaskStatus | "") =>
    setFilters((f) => ({ ...f, status: value }));

  const setAssignee = (value: string) =>
    setFilters((f) => ({ ...f, assignee: value }));

  const setSort = (value: SortOption) =>
    setFilters((f) => ({ ...f, sort: value }));

  const resetFilters = () =>
    setFilters({ search: "", status: "", assignee: "", sort: "" });

  return {
    filters,
    setSearch,
    setStatus,
    setAssignee,
    setSort,
    resetFilters,
  };
}
