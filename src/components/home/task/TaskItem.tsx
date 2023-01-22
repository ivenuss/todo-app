import React, { useCallback } from 'react';
import { Button, Checkbox, List } from 'antd';
import { gray, green } from '@ant-design/colors';
import { intlFormatDistance } from 'date-fns';
import { DeleteOutlined } from '@ant-design/icons';
import { TaskLabel } from './TaskLabel';
import { useDeleteTasksMutation } from '@/api/mutations/useDeleteTasksMutation';
import { useToggleTasksStatusMutation } from '@/api/mutations/useToggleTasksStatusMutation';
import type { Task } from '@/api/apiSchemas';

type TaskItemProps = Pick<
  Task,
  'id' | 'text' | 'completed' | 'createdDate' | 'completedDate'
>;

export const TaskItem: React.FC<TaskItemProps> = React.memo(
  ({ id, text, completed, createdDate, completedDate }) => {
    const { mutate: deleteTask } = useDeleteTasksMutation();
    const { mutate: updateTask } = useToggleTasksStatusMutation();

    const handleDeleteTask = useCallback(
      () => deleteTask([id]),
      [id, deleteTask]
    );

    const handleToggleTaskStatus = useCallback(
      () => updateTask({ ids: [id], completed }),
      [id, completed, updateTask]
    );

    return (
      <List.Item
        className="flex items-center gap-2"
        actions={[
          <Button
            danger
            type="primary"
            className="flex-none"
            style={{ marginInlineStart: 0 }}
            size="small"
            icon={<DeleteOutlined />}
            onClick={handleDeleteTask}
          />
        ]}
      >
        <Checkbox
          type="checkbox"
          checked={completed}
          onChange={handleToggleTaskStatus}
        />

        <TaskLabel id={id} text={text} completed={completed} />

        <div
          className="w-20 flex-none text-right text-xs"
          style={{ color: completedDate ? green[6] : gray[4] }}
        >
          {intlFormatDistance(completedDate || createdDate, new Date(), {
            style: 'short'
          })}
        </div>
      </List.Item>
    );
  }
);

TaskItem.displayName = 'TaskItem';
