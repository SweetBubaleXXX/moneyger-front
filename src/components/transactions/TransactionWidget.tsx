import {
  Avatar,
  Button,
  Card,
  CardContent,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Dropdown,
  IconButton,
  ListDivider,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Modal,
  ModalDialog,
  Sheet,
  Skeleton,
  Typography,
} from '@mui/joy';
import { Stack } from '@mui/system';
import { AlertTriangle, Copy, MoreVertical, Pencil, Trash } from 'lucide-react';
import moment from 'moment';
import React, { useState } from 'react';

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
  const [
    confirmDeletionOpen, setConfirmDeletionOpen,
  ] = useState<boolean>(false);
  const category = useGetAllCategoriesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      data: selectCategoryById(data, props.transaction.category),
      isLoading,
    }),
  });
  const isLoading = category.isLoading || (props.loading ?? false);

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
            sx={{ gap: 0.5 }}
          >
            <Avatar>
              <Skeleton loading={isLoading}>
                {category.data?.icon}
              </Skeleton>
            </Avatar>
            <Sheet sx={{ flexGrow: 1, overflow: 'hidden' }}>
              <Typography level="title-lg" sx={OVERFLOW_ELLIPSIS}>
                <Skeleton loading={isLoading}>
                  {category.data?.name}
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
      <Menu placement="bottom-start">
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
        <MenuItem color="danger" onClick={() => setConfirmDeletionOpen(true)}>
          <ListItemDecorator sx={{ color: 'inherit' }}>
            <Trash />
          </ListItemDecorator>
          Delete
        </MenuItem>
      </Menu>
      <Modal
        open={confirmDeletionOpen}
        onClose={() => setConfirmDeletionOpen(false)}
      >
        <ModalDialog variant="outlined">
          <DialogTitle>
            <AlertTriangle />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to delete this transaction?
          </DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="danger" onClick={() => setConfirmDeletionOpen(false)}>
              Delete
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setConfirmDeletionOpen(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </Dropdown>
  );
};
