import { Button } from '@mui/joy';
import { ArrowDownUp, ListPlus } from 'lucide-react';
import React from 'react';

import { BaseToolbar } from './BaseToolbar';

export type CategoryListToolbarProps = {
  onReorder: () => void,
  onAdd: () => void,
}

export const CategoryListToolbar = ({
  onReorder,
  onAdd,
}: CategoryListToolbarProps) => {
  return (
    <BaseToolbar>
      <Button
        startDecorator={<ArrowDownUp />}
        onClick={onReorder}
      >
        Reorder
      </Button>
      <Button
        startDecorator={<ListPlus />}
        onClick={onAdd}
      >
        Add
      </Button>
    </BaseToolbar>
  );
};