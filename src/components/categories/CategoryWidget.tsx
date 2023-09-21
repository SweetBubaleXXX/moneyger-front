import {
  Avatar,
  Box,
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

export type CategoryWidgetProps = {
  category: Category,
  draggable?: boolean,
  isLoading?: boolean,
}

export const CategoryWidget = (props: CategoryWidgetProps) => {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      as="div"
      value={props.category}
      dragListener={false}
      dragControls={dragControls}
    >
      <Button
        variant="outlined"
        fullWidth={true}
        sx={{
          my: 1,
        }}>
        <Stack
          width="100%"
          direction="row"
          alignItems="center"
          gap={2}
        >
          <Avatar>
            <Skeleton loading={props.isLoading}>
              {props.category.icon}
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
            >--Icon-fontSize
              <Skeleton loading={props.isLoading}>
                {props.category.name}
              </Skeleton>
            </Typography>
          </Sheet>
          {
            props.draggable &&
            <Box
              padding={1}
              style={{
                cursor: 'move',
                touchAction: 'none',
              }}
              onPointerDown={e => dragControls.start(e)}
            >
              <Grip />
            </Box>
          }
        </Stack>
      </Button>
    </Reorder.Item>
  );
};
