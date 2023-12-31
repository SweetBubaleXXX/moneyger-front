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
  Tooltip,
  Typography,
} from '@mui/joy';
import { Stack } from '@mui/system';
import { CopyPlus, MoreVertical, Pencil, Trash } from 'lucide-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import {
  useDeleteTransactionMutation,
} from '../../features/api/apiSlice';
import {
  PaginatedTransactionRequest,
  Transaction,
} from '../../features/api/types';
import { useCategoryById } from '../../hooks/category';
import { CategoryIcon } from '../categories/CategoryIcon';
import { ConfirmationModal } from '../ConfirmationModal';
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

  const category = useCategoryById(transaction.category);

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
            gap={0.7}
          >
            <Avatar>
              <Skeleton loading={loading}>
                <CategoryIcon color={category.data?.color}>
                  {category.data?.icon}
                </CategoryIcon>
              </Skeleton>
            </Avatar>
            <Sheet sx={{ flexGrow: 1, overflow: 'hidden' }}>
              <Typography level="title-lg" noWrap>
                <Skeleton loading={loading}>
                  {category.data?.name}
                </Skeleton>
              </Typography>
              <Tooltip
                title={transaction.comment}
                variant="soft"
                size="sm"
                placement="bottom-start"
                arrow
              >
                <Typography level="body-sm" noWrap>
                  <Skeleton loading={loading}>
                    {transaction.comment}
                  </Skeleton>
                </Typography>
              </Tooltip>
              <Typography level="body-xs" noWrap>
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
        onClose={setDuplicateModalOpen}
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
            <CopyPlus />
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
      <ConfirmationModal
        open={confirmDeletionOpen}
        onCancel={() => setConfirmDeletionOpen(false)}
        onConfirm={() => deleteTransaction({
          id: transaction.id,
          params: requestParams,
        })}
        confirmButtonText="Delete"
        confirmButtonProps={{ color: 'danger' }}
        loading={deletionResult.isLoading}
      >
        Are you sure you want to delete this transaction?
      </ConfirmationModal>
    </Dropdown >
  );
};
