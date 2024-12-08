import { Button } from '@mui/joy';
import { ListPlus } from 'lucide-react';
import React from 'react';

import { BaseToolbar } from '../../../components/toolbars/BaseToolbar';

export type TagListToolbarProps = {
  onAdd: () => void;
};

export const TagListToolbar = ({ onAdd }: TagListToolbarProps) => {
  return (
    <BaseToolbar>
      <Button startDecorator={<ListPlus />} onClick={onAdd}>
        Add
      </Button>
    </BaseToolbar>
  );
};
