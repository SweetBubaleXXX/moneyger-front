import {
  Avatar,
  Card,
  CardContent,
  Chip,
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

import { useDeleteTransactionMutation } from '../../api/apiSlice';
import { Transaction, TransactionFilterRequest } from '../../api/types';
import { formatCents } from '../../helpers/currency';
import { CategoryIcon } from '../categories/CategoryIcon';
import { ConfirmationModal } from '../ConfirmationModal';
import { TransactionCreationModal } from './TransactionCreationModal';
import { TransactionUpdateModal } from './TransactionUpdateModal';

export type TransactionWidgetProps = {
  transaction: Transaction;
  isLoading?: boolean;
  requestParams?: TransactionFilterRequest;
  onDuplicateModalOpen?: (open: boolean) => void;
};

export const TransactionWidget = ({
  transaction,
  isLoading,
  requestParams,
  onDuplicateModalOpen,
}: TransactionWidgetProps) => {
  const [deleteTransaction, deletionResult] = useDeleteTransactionMutation();

  const [confirmDeletionOpen, setConfirmDeletionOpen] = useState<boolean>(false);

  const [transactionUpdateModalOpen, setTransactionUpdateModalOpen] = useState<boolean>(false);

  const [transactionDuplicateModalOpen, setTransactionDuplicateModalOpen] = useState<boolean>(false);

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
      <Card variant="outlined" sx={{ '--Card-padding': '8px' }}>
        <CardContent>
          <Stack direction="row" alignItems="center" justifyContent="stretch" gap={0.7}>
            <Avatar>
              <Skeleton loading={isLoading}>
                <CategoryIcon color={transaction.category.color}>{transaction.category.icon}</CategoryIcon>
              </Skeleton>
            </Avatar>
            <Sheet sx={{ flexGrow: 1, overflow: 'hidden' }}>
              <Typography level="title-lg" noWrap>
                <Skeleton loading={isLoading}>{transaction.category.name}</Skeleton>
              </Typography>
              <Tooltip title={transaction.comment} variant="soft" size="sm" placement="bottom-start" arrow>
                <Typography level="body-sm" noWrap>
                  <Skeleton loading={isLoading}>{transaction.comment}</Skeleton>
                </Typography>
              </Tooltip>
              <Typography level="body-xs" noWrap>
                <Skeleton loading={isLoading}>{moment(transaction.timestamp).format('llll')}</Skeleton>
              </Typography>
            </Sheet>
            <Typography
              level="body-md"
              textAlign="right"
              color={transaction.category.type === 'IN' ? 'success' : 'danger'}
            >
              <Skeleton loading={isLoading}>
                {formatCents(transaction.amountCents, transaction.currency)} {transaction.currency}
              </Skeleton>
            </Typography>
            <MenuButton slots={{ root: IconButton }} slotProps={{ root: { variant: 'plain' } }} disabled={isLoading}>
              <MoreVertical />
            </MenuButton>
          </Stack>
          {!!transaction.tags.length && (
            <Stack direction="row" flexWrap="wrap" gap={0.5} py={1} ml={5.5}>
              {transaction.tags.map((tag) => (
                <Chip variant="soft" color="primary" key={tag.id}>
                  {tag.name}
                </Chip>
              ))}
            </Stack>
          )}
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
        onConfirm={() =>
          deleteTransaction({
            id: transaction.id,
            params: requestParams,
          })
        }
        confirmButtonText="Delete"
        confirmButtonProps={{ color: 'danger' }}
        loading={deletionResult.isLoading}
      >
        Are you sure you want to delete this transaction?
      </ConfirmationModal>
    </Dropdown>
  );
};
