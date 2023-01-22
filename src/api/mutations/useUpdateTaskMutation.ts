import produce from 'immer';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '../axios';
import { message } from 'antd';
import { handleErrorMessage } from '../lib/error-handler';
import type { Task, UpdateTask } from '../apiSchemas';
import type { AxiosError } from 'axios';

type TaskVariables = { id: string; task: UpdateTask };

export const updateTaskById = async ({
  id,
  task
}: TaskVariables): Promise<Task> => {
  const { data } = await axios.post<Task>(`tasks/${id}`, task);

  return data;
};

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: TaskVariables) => updateTaskById(variables),

    onMutate: ({ id, task }) => {
      const previousTodos = queryClient.getQueryData(['tasks']);

      // Optimistic update - update task by its `id`
      queryClient.setQueryData(['tasks'], (tasksArray?: Task[]) => {
        return produce(tasksArray ?? [], (draft) => {
          const index = draft.findIndex((task) => task.id === id);
          const updatedTask = draft?.[index];

          if (index !== -1 && updatedTask) {
            const { text } = task;

            updatedTask.text = text;
          }
        });
      });

      return { previousTodos };
    },
    onSuccess: () => {
      void message.success('Successfully updated task.');
    },
    onError: (error: AxiosError, _, context) => {
      void handleErrorMessage(error);

      queryClient.setQueryData(['tasks'], context?.previousTodos);
    }
  });
};
