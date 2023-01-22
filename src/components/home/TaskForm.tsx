import React, { useCallback, useState } from 'react';
import { Button, Input } from 'antd';
import { useCreateTaskMutation } from '@/api/mutations/useCreateTaskMutation';
import { ToggleAllButton } from './footer/ToggleAllButton';
import { useGetTasksQuery } from '@/api/queries/useGetTasksQuery';

export const TaskForm: React.FC = () => {
  const { data: tasks, isLoading } = useGetTasksQuery();
  const { mutate: createTask } = useCreateTaskMutation();
  const [value, setValue] = useState<string>('');

  const isDisabled = isLoading || !tasks;

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setValue(''); // Reset input value
      createTask({ text: value }); // Create task
    },
    [setValue, createTask, value]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setValue(event.target.value),
    []
  );

  return (
    <div className="mb-3 flex items-center gap-1.5">
      <ToggleAllButton />

      <form
        className="flex w-full items-center gap-1.5"
        onSubmit={handleSubmit}
      >
        <Input
          autoFocus
          type="text"
          value={value}
          disabled={isDisabled}
          placeholder="What needs to be done?"
          className="w-full"
          onChange={handleChange}
        />

        <Button
          type="primary"
          htmlType="submit"
          disabled={isDisabled || !value}
        >
          Create
        </Button>
      </form>
    </div>
  );
};
