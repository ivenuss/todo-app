import React, { useCallback, useMemo } from 'react';
import { List } from 'antd';
import { useAppSelector } from '@/hooks/redux';
import { TaskItem } from '../home/task/TaskItem';
import { useGetTasksQuery } from '../../api/queries/useGetTasksQuery';
import type { Task } from '../../api/apiSchemas';
import type { TaskFilter } from '@/store/taskSlice';

export const TaskList: React.FC = () => {
  const filter = useAppSelector((state) => state.task.filter);
  const { data, isLoading } = useGetTasksQuery();

  const filterTasks = useCallback((tasks: Task[], filter: TaskFilter) => {
    return tasks.filter(({ completed }) => {
      if (filter === 'all') return true;
      if (filter === 'active' && !completed) return true;
      if (filter === 'completed' && completed) return true;

      return false;
    });
  }, []);

  const tasks = useMemo(() => {
    // Sort by `createdDate`
    const sortedTasks =
      data?.sort((a, b) => a.createdDate - b.createdDate) ?? [];

    // Filter tasks by `filter`
    return filterTasks(sortedTasks, filter);
  }, [data, filter, filterTasks]);

  const renderTasks = useCallback(
    (task: Task) => (
      <TaskItem
        key={task.id}
        id={task.id}
        completed={task.completed}
        text={task.text}
        createdDate={task.createdDate}
        completedDate={task.completedDate}
      />
    ),
    []
  );

  return (
    <List
      size="small"
      className="max-h-80 overflow-y-auto"
      loading={isLoading}
      dataSource={tasks}
      renderItem={renderTasks}
    />
  );
};
