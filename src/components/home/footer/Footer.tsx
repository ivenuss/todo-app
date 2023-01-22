import React from 'react';
import { useGetTasksQuery } from '@/api/queries/useGetTasksQuery';
import { ClearButton } from './ClearButton';
import { ItemsCounter } from './ItemsCounter';
import { TaskFilter } from './TaskFilter';

export const Footer: React.FC = () => {
  const { data: tasks } = useGetTasksQuery();

  if (!tasks || !tasks.length) return null;

  const completedTasksCount = tasks.filter((task) => task.completed).length;

  return (
    <footer className="relative mt-2 flex flex-col text-sm">
      <div className="mb-1.5 flex items-center justify-between md:mb-0">
        <ItemsCounter completedTasksCount={completedTasksCount} />
        <ClearButton completedTasksCount={completedTasksCount} />
      </div>
      <TaskFilter />
    </footer>
  );
};
