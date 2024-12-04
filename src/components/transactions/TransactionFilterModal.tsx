import {
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

import { Category, CurrencyCode, TransactionFilterRequest, TransactionType } from '../../api/types';
import { CURRENCY_CODES } from '../../constants';
import { CategoryIcon } from '../categories/CategoryIcon';
import { CategorySelectorDrawer } from '../categories/CategorySelectorDrawer';
import { DateRangeModal } from '../period/DateRangeModal';

export type Filters = Omit<TransactionFilterRequest, 'ordering' | 'search'>;

export type TransactionFilterModalProps = {
  open: boolean;
  onClose: (filters: Filters) => void;
  initialFilters?: Filters;
};

export const TranasctionFilterModal = ({ open, onClose, initialFilters }: TransactionFilterModalProps) => {
  const [category, setCategory] = useState<Category | undefined>();
  const [filters, setFilters] = useState<Filters>(initialFilters ?? ({} as Filters));

  const [categorySelectorOpen, setCategorySelectorOpen] = useState<boolean>(false);

  const [dateRangePickerOpen, setDateRangePickerOpen] = useState<boolean>(false);

  return (
    <Modal open={open} onClose={() => onClose(filters)}>
      <ModalDialog layout="center">
        <ModalClose />
        <DialogTitle>Фильтры</DialogTitle>
        <DialogContent>
          <Stack spacing={2} padding={3}>
            <Button
              variant="soft"
              color="neutral"
              startDecorator={category && <CategoryIcon color={category.color}>{category.icon}</CategoryIcon>}
              onClick={() => setCategorySelectorOpen(true)}
            >
              {category?.name || 'Выбрать категорию'}
            </Button>
            <FormControl>
              <FormLabel>Тип транзакции</FormLabel>
              <Select
                disabled={!!category}
                value={category ? category.type : filters.transactionType ?? ''}
                onChange={(_, value) =>
                  setFilters({
                    ...filters,
                    transactionType: (value || undefined) as TransactionType | undefined,
                  })
                }
              >
                <Option value="">Любой</Option>
                <Divider />
                <Option value="OUT">РАСХОД</Option>
                <Option value="IN">ДОХОД</Option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Валюта</FormLabel>
              <Select
                value={filters.currency ?? ''}
                onChange={(_, value) =>
                  setFilters({
                    ...filters,
                    currency: (value || undefined) as CurrencyCode | undefined,
                  })
                }
              >
                <>
                  <Option value="">Любая</Option>
                  <Divider />
                  {CURRENCY_CODES.map((curCode) => (
                    <Option value={curCode} key={curCode}>
                      {curCode}
                    </Option>
                  ))}
                </>
              </Select>
            </FormControl>
            <Button variant="soft" color="neutral" onClick={() => setDateRangePickerOpen(true)}>
              {filters.dateGte || filters.dateLte ? 'Изменить ' : 'Выбрать '}
              период
            </Button>
            <Button
              variant="outlined"
              color="danger"
              startDecorator={<Undo2 />}
              onClick={() => {
                setFilters({} as Filters);
                setCategory(undefined);
              }}
            >
              Сброс
            </Button>
          </Stack>
          <DateRangeModal
            open={dateRangePickerOpen}
            initialValue={{
              from: moment(filters.dateGte).toDate(),
              to: moment(filters.dateLte).toDate(),
            }}
            onClose={(period) => {
              setDateRangePickerOpen(false);
              setFilters({
                ...filters,
                dateGte: period.from.toISOString(),
                dateLte: period.to.toISOString(),
              });
            }}
          />
          <CategorySelectorDrawer
            open={categorySelectorOpen}
            onClose={() => setCategorySelectorOpen(false)}
            onChange={(value) => {
              setCategory(value);
              setFilters({
                ...filters,
                rootCategoryId: value.rootId || value.id,
                transactionType: value.type,
              });
            }}
            category={category}
          />
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};
