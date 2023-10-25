import { zodResolver } from '@hookform/resolvers/zod';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  FormControl,
  FormLabel,
  Input,
  Option,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Textarea,
  useTheme,
} from '@mui/joy';
import useMediaQuery from '@mui/material/useMediaQuery';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { toast } from 'sonner';

import { CURRENCY_CODES, DATETIME_INPUT_FORMAT } from '../../constants';
import {
  selectCategoryById,
  useGetAccountQuery,
  useGetAllCategoriesQuery,
} from '../../features/api/apiSlice';
import { TransactionSchema } from '../../features/api/schemas';
import {
  Category,
  CurrencyCode,
  Transaction,
  TransactionCreateUpdateRequest,
} from '../../features/api/types';
import { CategorySelector } from '../categories/CategorySelector';


export type TransactionFormProps = {
  onSubmit: (request: TransactionCreateUpdateRequest) => void,
  submitButtonText: string,
  isLoading?: boolean,
  initialValue?: Transaction
}

export const TransactionForm = ({
  onSubmit,
  submitButtonText,
  isLoading,
  initialValue,
}: TransactionFormProps) => {
  const theme = useTheme();
  const greaterThanMd = useMediaQuery(theme.breakpoints.up('md'));

  const [
    categorySelectorOpen, setCategorySelectorOpen,
  ] = useState<boolean>(false);

  const account = useGetAccountQuery();

  const initialCategory = useGetAllCategoriesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      data: selectCategoryById(data, initialValue?.category),
      isLoading,
    }),
  });

  const [category, setCategory] = useState<Category | undefined>();

  const [currency, setCurrency] = useState<CurrencyCode>(
    initialValue?.currency || CURRENCY_CODES[0]
  );

  const {
    handleSubmit,
    resetField,
    control,
    formState,
  } = useForm<TransactionCreateUpdateRequest>(
    { resolver: zodResolver(TransactionSchema) }
  );

  useEffect(() => {
    if (
      !initialValue &&
      !account.isLoading &&
      account.data?.defaultCurrency
    ) {
      setCurrency(account.data.defaultCurrency);
      resetField('currency', { defaultValue: account.data.defaultCurrency });
    }
  }, [account, initialValue, resetField]);

  useEffect(() => {
    if (
      initialValue &&
      !initialCategory.isLoading &&
      initialCategory.data
    ) {
      setCategory(initialCategory.data);
      resetField('category', { defaultValue: initialCategory.data.id });
    }
  }, [initialCategory, initialValue, resetField]);

  useEffect(() => {
    for (const [field, error] of Object.entries({
      'Amount': formState.errors.amount,
      'Category': formState.errors.category,
      'Comment': formState.errors.comment,
      'Currency': formState.errors.currency,
      'Transaction Time': formState.errors.transactionTime,
    })) {
      if (error) {
        toast.error(field, {
          description: error.message,
        });
      }
    }
  }, [formState.errors]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4} padding={3}>
        <Controller
          name="amount"
          control={control}
          defaultValue={initialValue?.amount ?? '0'}
          render={({ field }) => (
            <Box>
              <FormLabel>Amount</FormLabel>
              <NumericFormat
                size="lg"
                allowNegative={false}
                customInput={Input}
                sx={{ input: { textAlign: 'center' } }}
                error={!!formState.errors.amount}
                {...field}
                endDecorator={
                  <>
                    <Divider orientation="vertical" />
                    <Controller
                      name="currency"
                      control={control}
                      defaultValue={currency}
                      render={({ field }) => (
                        <Select
                          variant="plain"
                          slotProps={{
                            listbox: {
                              variant: 'outlined',
                            },
                          }}
                          sx={{
                            mr: -1.5,
                            '&:hover': { bgcolor: 'transparent' },
                          }}
                          {...field}
                          value={currency}
                          disabled={!initialValue && account.isLoading}
                          onChange={(_, value) => {
                            field.onChange(value);
                            setCurrency(value!);
                          }}
                        >
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
                        </Select>
                      )}
                    />
                  </>
                }
              />
            </Box>
          )}
        />
        <Controller
          name="category"
          control={control}
          render={({ field }) =>
            <>
              <Button
                variant="soft"
                color={formState.errors.category ? 'danger' : 'primary'}
                startDecorator={category && <Avatar>{category.icon}</Avatar>}
                loading={initialValue && initialCategory.isLoading}
                onClick={() => setCategorySelectorOpen(true)}
                sx={{
                  alignSelf: 'center',
                }}
                {...field}
              >
                {category?.name || 'Choose category'}
              </Button>
              <Drawer
                open={categorySelectorOpen}
                anchor={greaterThanMd ? 'left' : 'bottom'}
                size={greaterThanMd ? 'sm' : 'lg'}
                onClose={() => setCategorySelectorOpen(false)}
              >
                <Tabs defaultValue="OUT">
                  <TabList tabFlex={1}>
                    <Tab value="OUT">Outcome</Tab>
                    <Tab value="IN">Income</Tab>
                  </TabList>
                  {
                    ['OUT', 'IN'].map(value =>
                      <TabPanel key={value} value={value}>
                        <CategorySelector
                          selected={category}
                          onChange={value => {
                            setCategory(value);
                            field.onChange(value.id);
                          }}
                          filter={
                            category =>
                              !category.parentCategory
                              && category.transactionType === value
                          } />
                      </TabPanel>
                    )
                  }
                </Tabs>
              </Drawer>
            </>
          }
        />
        <Controller
          name="transactionTime"
          control={control}
          defaultValue={
            moment(initialValue?.transactionTime)
              .format(DATETIME_INPUT_FORMAT)
          }
          render={({ field }) =>
            <FormControl error={!!formState.errors.transactionTime}>
              <FormLabel>Transaction Time</FormLabel>
              <Input
                type="datetime-local"
                slotProps={{
                  input: {
                    max: moment().endOf('day').format(DATETIME_INPUT_FORMAT),
                  },
                }}
                {...field}
              />
            </FormControl>
          } />
        <Controller
          name="comment"
          control={control}
          defaultValue={initialValue?.comment}
          render={({ field }) =>
            <FormControl error={!!formState.errors.comment}>
              <Textarea variant="plain" placeholder="Comment..." {...field} />
            </FormControl>} />
        <Button type="submit" loading={isLoading}>
          {submitButtonText}
        </Button>
      </Stack>
    </form>
  );
};
