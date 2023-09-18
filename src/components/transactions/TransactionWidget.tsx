import {
  Avatar,
  Card,
  CardContent,
  Dropdown,
  IconButton,
  ListDivider,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Sheet,
  Skeleton,
  Typography,
} from '@mui/joy';
import { Stack } from '@mui/system';
import { Copy, MoreVertical, Pencil, Trash } from 'lucide-react';
import moment from 'moment';
import React from 'react';

import { OVERFLOW_ELLIPSIS } from '../../constants';
import {
  selectCategoryById,
  useGetAllCategoriesQuery,
} from '../../features/api/apiSlice';
import { Transaction } from '../../features/api/types';

export type TransactionWidgetProps = {
  transaction: Transaction,
  loading?: boolean,
}

export const TransactionWidget = (props: TransactionWidgetProps) => {
  const { category } = useGetAllCategoriesQuery(undefined, {
    selectFromResult: result => ({
      category: selectCategoryById(result, props.transaction.category),
    }),
  });
  const isLoading = props.loading ?? false;

  return (
    <Dropdown>
      <Card
        variant="outlined"
        sx={{ '--Card-padding': '8px' }}>
        <CardContent>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="stretch"
            sx={{ gap: 1 }}
          >
            <Avatar>
              <Skeleton loading={isLoading}>
                {category?.icon}
              </Skeleton>
            </Avatar>
            <Sheet sx={{ flexGrow: 1, overflow: 'hidden' }}>
              <Typography level="title-lg" sx={OVERFLOW_ELLIPSIS}>
                <Skeleton loading={isLoading}>
                  {category?.name}
                </Skeleton>
              </Typography>
              <Typography level="body-sm" sx={OVERFLOW_ELLIPSIS}>
                <Skeleton loading={isLoading}>
                  {props.transaction.comment}
                </Skeleton>
              </Typography>
              <Typography level="body-xs" sx={OVERFLOW_ELLIPSIS}>
                <Skeleton loading={isLoading}>
                  {moment(props.transaction.transactionTime).format('llll')}
                </Skeleton>
              </Typography>
            </Sheet>
            <Typography
              level="body-md"
              textAlign="right"
              color={
                props.transaction.transactionType === 'IN' ?
                  'success' : 'danger'
              }
            >
              <Skeleton loading={isLoading}>
                {props.transaction.amount} {props.transaction.currency}
              </Skeleton>
            </Typography>
            <MenuButton
              slots={{ root: IconButton }}
              slotProps={{ root: { variant: 'plain' } }}
            >
              <MoreVertical />
            </MenuButton>
          </Stack>
        </CardContent>
      </Card>
      <Menu placement="bottom-end">
        <MenuItem>
          <ListItemDecorator>
            <Pencil />
          </ListItemDecorator>
          Edit
        </MenuItem>
        <MenuItem disabled>
          <ListItemDecorator>
            <Copy />
          </ListItemDecorator>
          Duplicate
        </MenuItem>
        <ListDivider />
        <MenuItem color="danger">
          <ListItemDecorator sx={{ color: 'inherit' }}>
            <Trash />
          </ListItemDecorator>
          Delete
        </MenuItem>
      </Menu>
    </Dropdown>
  );
};
