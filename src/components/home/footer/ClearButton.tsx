import React, { useCallback } from 'react';
import clsx from 'clsx';
import { Button } from 'antd';
import { useDeleteTasksMutation } from '@/api/mutations/useDeleteTasksMutation';
import { useGetTasksQuery } from '@/api/queries/useGetTasksQuery';

interface ClearButtonProps {
  completedTasksCount: number;
}

export const ClearButton: React.FC<ClearButtonProps> = ({
  completedTasksCount
}) => {
  const { data: tasks } = useGetTasksQuery();
  const { mutate: deleteTasks } = useDeleteTasksMutation();

  const handleDeleteCompletedTasks = useCallback(() => {
    if (!tasks) return;

    const completedTaskIds = tasks.flatMap((task) =>
      task.completed ? task.id : []
    );

    deleteTasks(completedTaskIds);
  }, [tasks, deleteTasks]);

  if (!tasks || !tasks.length) return null;

  return (
    <Button
      size="small"
      type="link"
      className={clsx(completedTasksCount > 0 ? 'visible' : 'invisible')}
      onClick={handleDeleteCompletedTasks}
    >
      Clear completed
    </Button>
  );
};
