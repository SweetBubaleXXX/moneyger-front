import {
  Avatar,
  Button,
  Sheet,
  Skeleton,
  Stack,
  Typography,
} from '@mui/joy';
import { Reorder, useDragControls } from 'framer-motion';
import { Grip } from 'lucide-react';
import React from 'react';

import { Category } from '../../features/api/types';
import { CategoryIcon } from './CategoryIcon';

export type CategoryWidgetProps = {
  category: Category,
  draggable?: boolean,
  isLoading?: boolean,
  onClick?: (categoryId: number) => void,
}

export const CategoryWidget = ({
  category,
  draggable,
  isLoading,
  onClick,
}: CategoryWidgetProps) => {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      as="div"
      value={category}
      dragListener={false}
      dragControls={dragControls}
    >
      <Button
        variant="outlined"
        color="neutral"
        fullWidth={true}
        sx={{
          my: 1,
          py: 0.5,
          px: 1,
        }}
        onClick={() => onClick?.(category.id)}
      >
        <Stack
          width="100%"
          direction="row"
          alignItems="center"
          gap={1}
        >
          <Avatar>
            <Skeleton loading={isLoading}>
              <CategoryIcon color={category.color}>
                {category.icon}
              </CategoryIcon>
            </Skeleton>
          </Avatar>
          <Sheet sx={{
            flexGrow: 1,
            overflow: 'hidden',
            background: 'transparent',
          }}>
            <Typography
              level="title-lg"
              textAlign="left"
              noWrap
            >
              <Skeleton loading={isLoading}>
                {category.name}
              </Skeleton>
            </Typography>
          </Sheet>
          {
            draggable &&
            <Stack
              padding={1}
              style={{
                cursor: 'move',
                touchAction: 'none',
              }}
              onPointerDown={e => dragControls.start(e)}
            >
              <Grip />
            </Stack>
          }
        </Stack>
      </Button>
    </Reorder.Item>
  );
};
