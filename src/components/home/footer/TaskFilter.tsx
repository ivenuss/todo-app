import React, { useCallback } from 'react';
import { Segmented } from 'antd';
import {
  changeFilter,
  type TaskFilter as TaskFilterType
} from '@/store/taskSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';

export const TaskFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.task.filter);

  const handleChange = useCallback(
    (value: TaskFilterType) => dispatch(changeFilter(value)),
    [changeFilter]
  );

  return (
    <Segmented
      value={filter}
      options={[
        { label: 'All', value: 'all' },
        { label: 'Active', value: 'active' },
        { label: 'Completed', value: 'completed' }
      ]}
      size="small"
      className="mx-auto transform md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
      onChange={(value) => handleChange(value as TaskFilterType)}
    />
  );
};
