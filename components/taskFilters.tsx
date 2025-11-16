"use client";

import { SortOption, useTaskFilters } from "@/hooks/useTaskFilters";
import { TaskStatus } from "@/types/types";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { statuses } from "@/lib/constants";
import { Button } from "./ui/button";

export default function TaskFilters({
  filters,
  setSearch,
  setStatus,
  setAssignee,
  setSort,
  resetFilters,
}: ReturnType<typeof useTaskFilters>) {
  return (
    <div className="flex items-center justify-between flex-wrap mb-4">
    <div className="flex gap-4 flex-wrap ">
  {/* Search */}
      <Input
        type="text"
        placeholder="Search tasks..."
        value={filters.search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-5 rounded-full bg-white outline-none focus:ring-2 focus:ring-blue-500 w-[250px]"
      />

      {/* Status filter */}
      <Select
        value={filters.status}
        onValueChange={(v) => setStatus(v as TaskStatus | "")}
      >
        <SelectTrigger className="p-5 rounded-full bg-white outline-none focus:ring-2 focus:ring-blue-500 w-[250px]">
          <SelectValue placeholder="All Statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            {statuses.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Assignee filter */}
      <Input
        type="text"
        placeholder="Filter by assignee..."
        value={filters.assignee}
        onChange={(e) => setAssignee(e.target.value)}
        className="p-5 rounded-full bg-white outline-none focus:ring-2 focus:ring-blue-500 w-[250px]"
      />

      {/* Sorting */}
      <Select
        value={filters.sort}
        onValueChange={(v) => setSort(v as SortOption)}
      >
        <SelectTrigger className="p-5 rounded-full bg-white outline-none focus:ring-2 focus:ring-blue-500 w-[250px]">
          <SelectValue placeholder="No sorting" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            <SelectItem value="a">No sorting</SelectItem>
            <SelectItem value="due">Due Date</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

      {/* Reset */}
      <Button onClick={resetFilters} className="rounded-full px-16">Reset</Button>
    </div>
  );
}
