import { IconButton, Stack, Typography } from '@mui/joy';
import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Category } from '../../features/api/types';
import { CategoryIcon } from '../categories/CategoryIcon';
import { BaseTopbar } from './BaseTopbar';

export type CategoryStatsTopbarProps = {
  category?: Category,
}

export const CategoryStatsTopbar = ({
  category,
}: CategoryStatsTopbarProps) => {
  const navigate = useNavigate();

  return (
    <BaseTopbar justifyContent="center">
      <Stack
        width="100%"
        direction="row"
        alignItems="center"
        gap={1}
      >
        <IconButton
          onClick={() => navigate(-1)}
          sx={{ flex: '0 0 40px' }}
        >
          <ChevronLeft />
        </IconButton>
        <Stack
          overflow="hidden"
          direction="row"
          justifyContent="center"
          alignItems="center"
          flex="1 0"
          gap={1}
        >
          <Stack alignItems="center">
            <CategoryIcon color={category?.color}>
              {category?.icon}
            </CategoryIcon>
          </Stack>
          <Typography level="title-md" noWrap>
            {category?.name}
          </Typography>
        </Stack>
        <Stack flex="0 0 40px" />
      </Stack>
    </BaseTopbar>
  );
};
