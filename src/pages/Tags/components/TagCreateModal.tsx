import { DialogContent, DialogTitle, Modal, ModalClose, ModalDialog } from '@mui/joy';
import React, { useCallback } from 'react';

import { useCreateTagMutation } from '../../../api/apiSlice';
import { TagCreateRequest } from '../../../api/types';
import { TagCreateForm } from '../../../forms/TagCreateForm';

export type TagModalProps = {
  open: boolean;
  onClose: (open: boolean) => void;
};

export const TagModal = ({ open, onClose }: TagModalProps) => {
  const [createTag, { isLoading }] = useCreateTagMutation();

  const onSubmit = useCallback(
    (tagCreate: TagCreateRequest) => {
      createTag(tagCreate).then(() => onClose(false));
    },
    [createTag, onClose],
  );

  return (
    <Modal open={open} onClose={() => onClose(false)}>
      <ModalDialog layout="center">
        <ModalClose />
        <DialogTitle>Создать тег</DialogTitle>
        <DialogContent>
          <TagCreateForm onSubmit={onSubmit} loading={isLoading} />
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};
