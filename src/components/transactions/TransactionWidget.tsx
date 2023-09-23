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
import React, { useEffect, useState } from 'react';

import { OVERFLOW_ELLIPSIS } from '../../constants';
import {
  selectCategoryById,
  useDeleteTransactionMutation,
  useGetAllCategoriesQuery,
} from '../../features/api/apiSlice';
import {
  PaginatedTransactionRequest,
  Transaction,
} from '../../features/api/types';
import { TransactionCreationModal } from './TransactionCreationModal';
import { TransactionUpdateModal } from './TransactionUpdateModal';

export type TransactionWidgetProps = {
  transaction: Transaction,
  isLoading?: boolean,
  requestParams?: PaginatedTransactionRequest,
  onDuplicateModalOpen?: (open: boolean) => void,
}

export const TransactionWidget = ({
  transaction,
  isLoading,
  requestParams,
  onDuplicateModalOpen,
}: TransactionWidgetProps) => {
  const [
    confirmDeletionOpen, setConfirmDeletionOpen,
  ] = useState<boolean>(false);

  const [
    transactionUpdateModalOpen,
    setTransactionUpdateModalOpen,
  ] = useState<boolean>(false);

  const [
    transactionDuplicateModalOpen,
    setTransactionDuplicateModalOpen,
  ] = useState<boolean>(false);

  const [deleteTransaction, deletionResult] = useDeleteTransactionMutation();

  const category = useGetAllCategoriesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      data: selectCategoryById(data, transaction.category),
      isLoading,
    }),
  });

  const loading = isLoading || category.isLoading;

  const setDuplicateModalOpen = (open: boolean) => {
    setTransactionDuplicateModalOpen(open);
    onDuplicateModalOpen?.(open);
  };

  useEffect(() => {
    if (deletionResult.isSuccess) {
      setConfirmDeletionOpen(false);
    }
  }, [deletionResult.isSuccess]);

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
            gap={0.5}
          >
            <Avatar>
              <Skeleton loading={loading}>
                {category.data?.icon}
              </Skeleton>
            </Avatar>
            <Sheet sx={{ flexGrow: 1, overflow: 'hidden' }}>
              <Typography level="title-lg" sx={OVERFLOW_ELLIPSIS}>
                <Skeleton loading={loading}>
                  {category.data?.name}
                </Skeleton>
              </Typography>
              <Typography level="body-sm" sx={OVERFLOW_ELLIPSIS}>
                <Skeleton loading={loading}>
                  {transaction.comment}
                </Skeleton>
              </Typography>
              <Typography level="body-xs" sx={OVERFLOW_ELLIPSIS}>
                <Skeleton loading={loading}>
                  {moment(transaction.transactionTime).format('llll')}
                </Skeleton>
              </Typography>
            </Sheet>
            <Typography
              level="body-md"
              textAlign="right"
              color={
                transaction.transactionType === 'IN' ?
                  'success' : 'danger'
              }
            >
              <Skeleton loading={loading}>
                {transaction.amount} {transaction.currency}
              </Skeleton>
            </Typography>
            <MenuButton
              slots={{ root: IconButton }}
              slotProps={{ root: { variant: 'plain' } }}
              disabled={loading}
            >
              <MoreVertical />
            </MenuButton>
          </Stack>
        </CardContent>
      </Card>
      <TransactionUpdateModal
        open={transactionUpdateModalOpen}
        onClose={setTransactionUpdateModalOpen}
        initialValue={transaction}
        requestParams={requestParams}
      />
      <TransactionCreationModal
        open={transactionDuplicateModalOpen}
        onClose={() => () => setDuplicateModalOpen(false)}
        initialValue={transaction}
      />
      <Menu placement="bottom-start">
        <MenuItem onClick={() => setTransactionUpdateModalOpen(true)}>
          <ListItemDecorator>
            <Pencil />
          </ListItemDecorator>
          Edit
        </MenuItem>
        <MenuItem onClick={() => setDuplicateModalOpen(true)}>
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
              color="danger"
              loading={deletionResult.isLoading}
              onClick={() => deleteTransaction({
                id: transaction.id,
                params: requestParams,
              })}
            >
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
    </Dropdown >
  );
};
