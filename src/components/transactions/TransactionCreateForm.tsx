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
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import { CURRENCY_CODES } from '../../constants';
import {
  useCreateTransactionMutation,
  useGetAccountQuery,
} from '../../features/api/apiSlice';
import {
  Category,
  CurrencyCode,
  TransactionCreateRequest,
} from '../../features/api/types';
import { CategorySelector } from '../categories/CategorySelector';

export const TransactionSchema = z.object({
  amount: z.preprocess(Number, z.number().positive().finite()),
  category: z.number().int().positive(),
  currency: z.enum(CURRENCY_CODES),
  transactionTime: z.coerce.date().refine(
    value => value < moment().toDate(),
    'Enter valid date'
  ),
  comment: z.string().max(255),
});

export const TransactionCreateForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const greaterThanMd = useMediaQuery(theme.breakpoints.up('md'));
  const [
    categorySelectorOpen, setCategorySelectorOpen,
  ] = useState<boolean>(false);
  const { account } = useGetAccountQuery(undefined, {
    selectFromResult: result => ({
      account: result.data,
    }),
  });
  const [category, setCategory] = useState<Category | undefined>();
  const [currency, setCurrency] = useState<CurrencyCode>(
    account?.defaultCurrency || CURRENCY_CODES[0]
  );
  const {
    control, handleSubmit, formState: { errors },
  } = useForm<TransactionCreateRequest>(
    { resolver: zodResolver(TransactionSchema) }
  );
  const [createTransaction, result] = useCreateTransactionMutation();

  useEffect(() => {
    if (result.isError) {
      toast.error('Failed to add transaction');
    }
  }, [result.isError]);

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('Transaction added');
      navigate(-1);
    }
  }, [result.isSuccess, navigate]);

  useEffect(() => {
    for (const [field, error] of Object.entries({
      'Amount': errors.amount,
      'Category': errors.category,
      'Comment': errors.comment,
      'Currency': errors.currency,
      'Transaction Time': errors.transactionTime,
    })) {
      if (error) {
        toast.error(field, {
          description: error.message,
        });
      }
    }
  }, [errors]);

  return (
    <form onSubmit={handleSubmit(createTransaction)}>
      <Stack spacing={4} padding={3}>
        <Controller
          name="amount"
          control={control}
          defaultValue="0"
          render={({ field }) => (
            <Box>
              <FormLabel>Amount</FormLabel>
              <NumericFormat
                size="lg"
                allowNegative={false}
                customInput={Input}
                sx={{ input: { textAlign: 'center' } }}
                error={!!errors.amount}
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
                          onChange={(_, value) => {
                            field.onChange(value);
                            setCurrency(value!);
                          }}
                        >
                          {CURRENCY_CODES.map(curCode =>
                            <Option
                              value={curCode}
                              key={curCode}
                            >
                              {curCode}
                            </Option>
                          )}
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
                color={errors.category ? 'danger' : 'primary'}
                startDecorator={category && <Avatar>{category.icon}</Avatar>}
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
          defaultValue={moment().format('YYYY-MM-DDTHH:mm')}
          render={({ field }) =>
            <FormControl error={!!errors.transactionTime}>
              <FormLabel>Transaction Time</FormLabel>
              <Input
                type="datetime-local"
                slotProps={{
                  input: {
                    max: moment().endOf('day').format('YYYY-MM-DDTHH:mm'),
                  },
                }}
                {...field}
              />
            </FormControl>
          } />
        <Controller
          name="comment"
          control={control}
          defaultValue=""
          render={({ field }) =>
            <FormControl error={!!errors.comment}>
              <Textarea variant="plain" placeholder="Comment..." {...field} />
            </FormControl>} />
        <Button type="submit" loading={result.isLoading}>
          Add
        </Button>
      </Stack>
    </form>
  );
};
