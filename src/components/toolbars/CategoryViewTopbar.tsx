import { IconButton, Typography } from '@mui/joy';
import { ChevronLeft, Trash } from 'lucide-react';
import React, { useState } from 'react';

import { ConfirmationModal } from '../ConfirmationModal';
import { BaseTopbar } from './BaseTopbar';

export type CategoryViewTopbarProps = {
  onGoBack: () => void,
  onDelete: () => void,
  isDeleting?: boolean,
}

export const CategoryViewTopbar = ({
  onGoBack,
  onDelete,
  isDeleting,
}: CategoryViewTopbarProps) => {
  const [
    confirmDeletionOpen,
    setConfirmDeletionOpen,
  ] = useState<boolean>(false);

  return (
    <>
      <BaseTopbar>
        <IconButton
          onClick={onGoBack}
        >
          <ChevronLeft />
        </IconButton>
        <Typography level="title-md">
          Edit Category
        </Typography>
        <IconButton
          onClick={() => setConfirmDeletionOpen(true)}
          size="sm"
          variant="plain"
          color="danger"
        >
          <Trash />
        </IconButton>
      </BaseTopbar>
      <ConfirmationModal
        open={confirmDeletionOpen}
        onCancel={() => setConfirmDeletionOpen(false)}
        onConfirm={onDelete}
        confirmButtonText="Delete"
        confirmButtonProps={{ color: 'danger' }}
        loading={isDeleting}
      >
        Are you sure you want to delete this category?
      </ConfirmationModal>
    </>
  );
};
