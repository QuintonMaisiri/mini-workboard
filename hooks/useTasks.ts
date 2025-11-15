import { Task } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useTasks(taskId?: string){
    const queryClient = useQueryClient();

    const taskQuery = useQuery({
        queryKey: ['task', taskId],
        queryFn: async ({ queryKey }) => {
            const id = queryKey[1];
            if (!id) return null; 

            const response = await fetch(`/api/tasks/${id}`);
            if (!response.ok) throw new Error('Failed to fetch task');

            return response.json();
        },
        enabled: !!taskId,
    });

    const tasksQuery = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const response = await fetch('/api/tasks');
            if(!response.ok){
                throw new Error('Failed to fetch tasks');
            }
            return response.json();
        }
    });

    const createTask = useMutation({
        mutationFn: (body: Partial<Task>) => {
            return fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).then(res => {
                if (!res.ok) {
                    return Promise.reject('Failed to create task');
                } else {
                    return res.json();
                }
            });
        },
        onMutate: async (newTask) => {
            await queryClient.cancelQueries({ queryKey: ['tasks'] });

            const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);
            queryClient.setQueryData<Task[]>(['tasks'], old => old ? [...old, newTask as Task] : [newTask as Task]);

            return { previousTasks };
        },

        onError: (err, newTask, context) => {
            if (context?.previousTasks) {
                queryClient.setQueryData<Task[]>(['tasks'], context.previousTasks);
            }},

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        }
    });

    const updateTask = useMutation({
        mutationFn: (updatedTask: Partial<Task> & { id: string }) => {
            return fetch(`/api/tasks/${updatedTask.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTask)
            }).then(res => {
                if (!res.ok) {
                    return Promise.reject('Failed to update task');
                }
                return res.json();
            });
        },
        onMutate: async (updatedTask) => {
            await queryClient.cancelQueries({ queryKey: ['tasks'] });

            const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);
            queryClient.setQueryData<Task[]>(['tasks'], old => {
                if (!old) return old;
                return old.map(task => task.id === updatedTask.id ? { ...task, ...updatedTask } : task);
            });
            return { previousTasks };
        },
        onError: (err, updatedTask, context) => {
            if (context?.previousTasks) {
                queryClient.setQueryData<Task[]>(['tasks'], context.previousTasks);
            }},
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            queryClient.invalidateQueries({ queryKey: ['task'] });
        }
    });

    const deleteTask = useMutation({
        mutationFn: (id: string) => {
            return fetch(`/api/tasks/${id}`, {
                method: 'DELETE'
            }).then(res => {
                if (!res.ok) {
                    return Promise.reject('Failed to delete task');
                }
                return res.json();
            });
        },
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['tasks'] });

            const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);
            queryClient.setQueryData<Task[]>(['tasks'], old => {
                if (!old) return old;
                return old.filter(task => task.id !== id);
            });
            return { previousTasks };
        },
        onError: (err, id, context) => {
            if (context?.previousTasks) {
                queryClient.setQueryData<Task[]>(['tasks'], context.previousTasks);
            }},
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            queryClient.invalidateQueries({ queryKey: ['task'] });
        }
    });

    return {
        taskQuery,
        tasksQuery,
        createTask,
        updateTask,
        deleteTask
    };
}