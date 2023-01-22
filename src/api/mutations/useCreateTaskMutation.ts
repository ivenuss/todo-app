import produce from 'immer';
import { message } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '../axios';
import { handleErrorMessage } from '../lib/error-handler';
import type { CreateTask, Task } from '../apiSchemas';

export const createTask = async (task: CreateTask): Promise<Task> => {
  const { data } = await axios.post<Task>('tasks', task);

  return data;
};

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: CreateTask) => createTask(task),

    // Update the cache when `task` is created.
    onSuccess: (task) => {
      queryClient.setQueryData(['tasks'], (tasksArray?: Task[]) => {
        return produce(tasksArray ?? [], (draft) => {
          draft.push(task);
        });
      });

      void message.success('New task has been created.');
    },
    onError: handleErrorMessage
  });
};
