import produce from 'immer';
import { message } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { pluralize } from '@/lib/pluralize';
import { axios } from '../axios';
import { handleErrorMessage } from '../lib/error-handler';
import type { AxiosError } from 'axios';
import type { Task } from '../apiSchemas';

export const deleteTasksById = async (ids: string[]): Promise<void[]> => {
  const tasksPromise = ids.map(async (id) => {
    await axios.delete(`tasks/${id}`);
  });

  return Promise.all(tasksPromise);
};

export const useDeleteTasksMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => deleteTasksById(ids),

    onMutate: (ids: string[]) => {
      const previousTodos = queryClient.getQueryData(['tasks']);

      // Optimistic update - remove tasks which `id` is in `ids` array
      queryClient.setQueryData(['tasks'], (tasksArray?: Task[]) => {
        return produce(tasksArray ?? [], (draft) =>
          draft.filter((task) => !ids.includes(task.id))
        );
      });

      return { previousTodos };
    },
    onSuccess: (_, ids) => {
      void message.success(
        `${pluralize(ids.length, 'Task')} ${
          ids.length > 1 ? 'have' : 'has'
        } been deleted.`
      );
    },
    onError: (error: AxiosError, _, context) => {
      void handleErrorMessage(error);

      queryClient.setQueryData(['tasks'], context?.previousTodos);
    }
  });
};
