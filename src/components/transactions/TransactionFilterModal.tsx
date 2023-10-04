import {
  Avatar,
  Button,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormLabel,
  Modal,
  ModalClose,
  ModalDialog,
  Option,
  Select,
  Stack,
} from '@mui/joy';
import { Undo2 } from 'lucide-react';
import moment from 'moment';
import React, { useState } from 'react';

import { CURRENCY_CODES } from '../../constants';
import {
  Category,
  TransactionRequestParams,
} from '../../features/api/types';
import { CategorySelectorDrawer } from '../categories/CategorySelectorDrawer';
import { DateRangeModal } from '../period/DateRangeModal';

export type Filters = Omit<TransactionRequestParams, 'ordering' | 'search'>

export type TranasctionFilterModalProps = {
  open: boolean,
  onClose: (filters: Filters) => void,
  initialFilters?: Filters,
}

export const TranasctionFilterModal = ({
  open,
  onClose,
  initialFilters,
}: TranasctionFilterModalProps) => {
  const [category, setCategory] = useState<Category | undefined>();
  const [filters, setFilters] = useState<Filters>(initialFilters ?? {});

  const [
    categorySelectorOpen, setCategorySelectorOpen,
  ] = useState<boolean>(false);

  const [
    dateRangePickerOpen, setDateRangePickerOpen,
  ] = useState<boolean>(false);

  return (
    <Modal open={open} onClose={() => onClose(filters)}>
      <ModalDialog layout="center">
        <ModalClose />
        <DialogTitle>Filters</DialogTitle>
        <DialogContent>
          <Stack spacing={2} padding={3}>
            <Button
              variant="soft"
              startDecorator={category && <Avatar>{category.icon}</Avatar>}
              onClick={() => setCategorySelectorOpen(true)}
            >
              {category?.name || 'Choose category'}
            </Button>
            <FormControl>
              <FormLabel>Transaction Type</FormLabel>
              <Select
                disabled={!!category}
                value={
                  category ?
                    category.transactionType : filters.transactionType ?? ''
                }
                onChange={(_, value) => setFilters({
                  ...filters,
                  transactionType: value ?? undefined,
                })}
              >
                <Option value="">Any</Option>
                <Divider />
                <Option value="OUT">OUTCOME</Option>
                <Option value="IN">INCOME</Option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Currency</FormLabel>
              <Select
                value={filters.currency ?? ''}
                onChange={(_, value) => setFilters({
                  ...filters,
                  currency: value ?? undefined,
                })}
              >
                <>
                  <Option value="">Any</Option>
                  <Divider />
                  {
                    CURRENCY_CODES.map(curCode =>
                      <Option
                        value={curCode}
                        key={curCode}
                      >
                        {curCode}
                      </Option>
                    )
                  }
                </>
              </Select>
            </FormControl>
            <Button
              variant="soft"
              color="neutral"
              onClick={() => setDateRangePickerOpen(true)}
            >
              {
                filters.transactionTimeBefore || filters.transactionTimeAfter ?
                  'Adjust ' : 'Select '
              }
              Period
            </Button>
            <Button
              variant="outlined"
              color="danger"
              startDecorator={<Undo2 />}
              onClick={() => {
                setFilters({});
                setCategory(undefined);
              }
              }
            >
              Reset
            </Button>
          </Stack>
          <DateRangeModal
            open={dateRangePickerOpen}
            initialValue={{
              from: moment(filters.transactionTimeAfter).toDate(),
              to: moment(filters.transactionTimeBefore).toDate(),
            }}
            onClose={period => {
              setDateRangePickerOpen(false);
              setFilters({
                ...filters,
                transactionTimeAfter: period.from.toISOString(),
                transactionTimeBefore: period.to.toISOString(),
              });
            }} />
          <CategorySelectorDrawer
            open={categorySelectorOpen}
            onClose={() => setCategorySelectorOpen(false)}
            onChange={value => {
              setCategory(value);
              setFilters({
                ...filters,
                category: value.id,
                transactionType: value.transactionType,
              });
            }}
            category={category}
          />
        </DialogContent>
      </ModalDialog>
    </Modal >
  );
};
