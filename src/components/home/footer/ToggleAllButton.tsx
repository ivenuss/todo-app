import React, { useCallback } from 'react';
import { Button, Tooltip } from 'antd';
import { SelectOutlined } from '@ant-design/icons';
import { useToggleTasksStatusMutation } from '@/api/mutations/useToggleTasksStatusMutation';
import { useGetTasksQuery } from '@/api/queries/useGetTasksQuery';

export const ToggleAllButton: React.FC = React.memo(() => {
  const { data: tasks, isLoading } = useGetTasksQuery();
  const { mutate: toggleTaskStatuses } = useToggleTasksStatusMutation();

  const completedTasksCount = tasks?.filter((task) => task.completed).length;
  const isDisabled = isLoading || !tasks || !tasks.length;
  const isChecked = completedTasksCount === tasks?.length;

  const handleToggleAll = useCallback(() => {
    if (!tasks) return;

    const tasksToUpdateIds = tasks.flatMap(({ completed, id }) =>
      completed === isChecked ? id : []
    );

    toggleTaskStatuses({ ids: tasksToUpdateIds, completed: isChecked });
  }, [tasks, isChecked, toggleTaskStatuses]);

  return (
    <Tooltip title="Toggle all tasks">
      <Button
        disabled={isDisabled}
        type={isChecked ? 'primary' : 'default'}
        icon={<SelectOutlined />}
        className="flex-none"
        onClick={handleToggleAll}
      />
    </Tooltip>
  );
});

ToggleAllButton.displayName = 'ToggleAllButton';
