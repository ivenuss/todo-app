import React from 'react';
import { pluralize } from '@/lib/pluralize';

interface ItemsCounterProps {
  completedTasksCount: number;
}

export const ItemsCounter: React.FC<ItemsCounterProps> = ({
  completedTasksCount
}) => (
  <span>
    {completedTasksCount} {pluralize(completedTasksCount, 'task')} done
  </span>
);
