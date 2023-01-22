import produce from 'immer';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '../axios';
import { handleErrorMessage } from '../lib/error-handler';
import type { AxiosError } from 'axios';
import type { Task } from '../apiSchemas';

export const updateTaskStatusesById = async (
  ids: string[],
  completed: boolean
): Promise<Task[]> => {
  const tasksPromise = ids.map(async (id) => {
    const { data } = await axios.post<Task>(
      `tasks/${id}/${completed ? 'incomplete' : 'complete'}`
    );

    return data;
  });

  return Promise.all(tasksPromise);
};

export const useToggleTasksStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ids, completed }: { ids: string[]; completed: boolean }) =>
      updateTaskStatusesById(ids, completed),

    onMutate: ({ ids, completed }) => {
      const previousTodos = queryClient.getQueryData(['tasks']);

      // Optimistic update - toggle status to all tasks
      queryClient.setQueryData(['tasks'], (tasksArray?: Task[]) => {
        return produce(tasksArray ?? [], (draft) => {
          ids.forEach((id) => {
            const index = draft.findIndex((task) => task.id === id);
            const task = draft?.[index];

            if (index !== -1 && task) {
              task.completed = !completed;
              task.completedDate = completed ? undefined : new Date().getTime();
            }
          });
        });
      });

      return { previousTodos };
    },
    onError: (error: AxiosError, _, context) => {
      void handleErrorMessage(error);

      queryClient.setQueryData(['tasks'], context?.previousTodos);
    }
  });
};
