import {
  Avatar,
  Card,
  CardContent,
  IconButton,
  Sheet,
  Skeleton,
  Stack,
  Typography,
} from '@mui/joy';
import { Reorder, useDragControls } from 'framer-motion';
import { Grip } from 'lucide-react';
import React from 'react';

import { OVERFLOW_ELLIPSIS } from '../../constants';
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
      <Card
        variant="outlined"
        sx={{
          my: 1,
          '--Card-padding': '8px',
        }}>
        <CardContent>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-around"
            gap={2}
          >
            <Avatar>
              <Skeleton loading={props.isLoading}>
                {props.category.icon}
              </Skeleton>
            </Avatar>
            <Sheet sx={{ flexGrow: 1, overflow: 'hidden' }}>
              <Typography level="title-lg" sx={OVERFLOW_ELLIPSIS}>
                <Skeleton loading={props.isLoading}>
                  {props.category.name}
                </Skeleton>
              </Typography>
            </Sheet>
            {
              props.draggable &&
              <IconButton
                size="lg"
                style={{
                  cursor: 'move',
                  touchAction: 'none',
                }}
                onPointerDown={e => dragControls.start(e)}
              >
                <Grip />
              </IconButton>
            }
          </Stack>
        </CardContent>
      </Card>
    </Reorder.Item>
  );
};
