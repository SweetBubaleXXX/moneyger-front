import { Box, CircularProgress, Divider, Stack } from '@mui/joy';
import React, { useCallback, useState } from 'react';

import { useDeleteTagMutation, useGetTagsQuery } from '../../api/apiSlice';
import { Tag } from '../../api/types';
import { NavigationBar } from '../../components/toolbars/NavigationBar';
import { BOTTOM_TOOLBAR_PROPS, LIST_OFFSET_FOR_TOOLBAR } from '../constants';
import { TagModal } from './components/TagCreateModal';
import { TagItem } from './components/TagItem';
import { TagListToolbar } from './components/Toolbar';

export const Tags = () => {
  const [tagModalOpen, setTagModalOpen] = useState<boolean>(false);

  const { data: tags, isLoading } = useGetTagsQuery();
  const [deleteTag, { isLoading: isDeleting }] = useDeleteTagMutation();

  const onDeleteTag = useCallback((tag: Tag) => deleteTag(tag.id), [deleteTag]);
  const handleModalOpen = useCallback(() => setTagModalOpen(true), []);
  const handleModalClose = useCallback(() => setTagModalOpen(false), []);

  return (
    <>
      <Box maxWidth={250} mx="auto" pt={2}>
        <Divider>Теги</Divider>
      </Box>
      <Stack spacing={2} padding={2} marginX="auto" alignItems="stretch" maxWidth="400px" {...LIST_OFFSET_FOR_TOOLBAR}>
        {isLoading || isDeleting ? (
          <CircularProgress />
        ) : (
          <>
            {tags?.map((tag, index) => (
              <TagItem tag={tag} key={index} onClick={onDeleteTag} />
            ))}
          </>
        )}
      </Stack>
      <Box {...BOTTOM_TOOLBAR_PROPS}>
        <TagListToolbar onAdd={handleModalOpen} />
      </Box>
      <NavigationBar />
      <TagModal open={tagModalOpen} onClose={handleModalClose} />
    </>
  );
};
