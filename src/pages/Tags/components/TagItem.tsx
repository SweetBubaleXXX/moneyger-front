import { Card, IconButton, Stack, Typography } from '@mui/joy';
import { Trash } from 'lucide-react';
import React from 'react';

import { Tag } from '../../../api/types';

export type TagItemProps = {
  tag: Tag;
  onClick: (tag: Tag) => void;
};

export const TagItem: React.FC<TagItemProps> = ({ tag, onClick }) => {
  return (
    <Card variant="outlined" sx={{ '--Card-padding': '8px' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" gap={0.7}>
        <Typography level="title-lg" noWrap>
          {tag.name}
        </Typography>
        <IconButton onClick={() => onClick(tag)} size="sm" variant="plain" color="danger">
          <Trash />
        </IconButton>
      </Stack>
    </Card>
  );
};
