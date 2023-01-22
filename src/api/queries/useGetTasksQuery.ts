import { useQuery } from '@tanstack/react-query';
import { axios } from '../axios';
import type { Task } from '../apiSchemas';

export const getTasks = async (): Promise<Task[]> => {
  const { data } = await axios.get<Task[]>('tasks');

  return data;
};

export const useGetTasksQuery = () => {
  return useQuery<Task[]>(['tasks'], {
    queryFn: getTasks
  });
};
