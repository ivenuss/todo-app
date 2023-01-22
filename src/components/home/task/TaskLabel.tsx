import React, { useCallback, useState } from 'react';
import clsx from 'clsx';
import { Input } from 'antd';
import { useDeleteTasksMutation } from '@/api/mutations/useDeleteTasksMutation';
import { useUpdateTaskMutation } from '@/api/mutations/useUpdateTaskMutation';

interface TaskLabelProps {
  id: string;
  text: string;
  completed: boolean;
}

export const TaskLabel: React.FC<TaskLabelProps> = React.memo(
  ({ id, text, completed }) => {
    const { mutateAsync: updateTask } = useUpdateTaskMutation();
    const { mutate: deleteTask } = useDeleteTasksMutation();

    const [value, setValue] = useState<string>(text);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const handleToggleEditMode = useCallback(
      () => setIsEditMode((enabled) => !enabled),
      [setIsEditMode]
    );

    const cancelEditMode = useCallback(
      (defaultValue?: string) => {
        setValue(defaultValue || text); // Reset input to default value
        setIsEditMode(false); // Cancel edit mode
      },
      [text, setIsEditMode]
    );

    const handleUpdateTask = useCallback(async () => {
      // No changes has been made
      if (value === text) {
        cancelEditMode();
        return;
      }

      // Update task otherwise delete it, because value is empty
      if (value) {
        const newValue = value.trim(); // Trim extra spaces

        await updateTask({ id, task: { text: newValue } }).catch(() => {
          cancelEditMode();
        });
        cancelEditMode(newValue); // Cancel edit mode when changes has been made

        return;
      }

      deleteTask([id]);
    }, [cancelEditMode, updateTask, deleteTask, id, text, value]);

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') void handleUpdateTask();
        if (event.key === 'Escape') cancelEditMode();
      },
      [handleUpdateTask, cancelEditMode]
    );

    const handleOnChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) =>
        setValue(event.target.value),
      [setValue]
    );

    return (
      <div className="w-full overflow-hidden">
        {isEditMode ? (
          <Input
            size="small"
            autoFocus
            value={value}
            placeholder="Task name"
            className="w-full"
            onKeyDown={handleKeyDown}
            onChange={handleOnChange}
            onBlur={void handleUpdateTask}
          />
        ) : (
          <div
            onClick={handleToggleEditMode}
            className={clsx('cursor-text truncate px-2', {
              'line-through': completed
            })}
          >
            {text}
          </div>
        )}
      </div>
    );
  }
);

TaskLabel.displayName = 'TaskLabel';
