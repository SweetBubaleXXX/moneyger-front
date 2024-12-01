import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Option,
  Select,
  Stack,
  Textarea,
  Typography,
} from '@mui/joy';
import moment from 'moment';
import React, { ForwardedRef, forwardRef, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { toast } from 'sonner';

import { useGetAccountQuery } from '../../api/apiSlice';
import { Category, CurrencyCode, Transaction, TransactionUpsertRequest } from '../../api/types';
import { CategoryIcon } from '../../components/categories/CategoryIcon';
import { CategorySelectorDrawer } from '../../components/categories/CategorySelectorDrawer';
import { CURRENCY_CODES, DATETIME_INPUT_FORMAT } from '../../constants';
import { centsFromString, formatCents } from '../../helpers/currency';
import { TransactionSchema } from '../schemas';

const NumericFormatWrapper = forwardRef((props: any, ref: ForwardedRef<any>) => {
  return <NumericFormat {...props} getInputRef={ref} />;
});

NumericFormatWrapper.displayName = 'NumericFormatWrapper';

export type TransactionFormProps = {
  onSubmit: (request: TransactionUpsertRequest) => void;
  submitButtonText: string;
  isLoading?: boolean;
  initialValue?: Transaction;
};

export const TransactionForm = ({ onSubmit, submitButtonText, isLoading, initialValue }: TransactionFormProps) => {
  const [categorySelectorOpen, setCategorySelectorOpen] = useState<boolean>(false);

  const account = useGetAccountQuery();

  const initialCategory = useMemo(() => initialValue?.category, [initialValue?.category]);

  const [category, setCategory] = useState<Category | undefined>();

  const [currency, setCurrency] = useState<CurrencyCode>(initialValue?.currency || CURRENCY_CODES[0]);

  const { handleSubmit, resetField, control, formState } = useForm<TransactionUpsertRequest>({
    resolver: zodResolver(TransactionSchema),
  });

  useEffect(() => {
    if (!initialValue && !account.isLoading && account.data?.defaultCurrency) {
      setCurrency(account.data.defaultCurrency);
      resetField('currency', { defaultValue: account.data.defaultCurrency });
    }
  }, [account, initialValue, resetField]);

  useEffect(() => {
    if (initialCategory) {
      setCategory(initialCategory);
      resetField('categoryId', { defaultValue: initialCategory.id });
    }
  }, [initialCategory, initialValue, resetField]);

  useEffect(() => {
    for (const [field, error] of Object.entries({
      Amount: formState.errors.amountCents,
      Category: formState.errors.categoryId,
      Comment: formState.errors.comment,
      Currency: formState.errors.currency,
      'Transaction Time': formState.errors.timestamp,
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
      <Stack spacing={4} padding={3} overflow="hidden">
        <Controller
          name="amountCents"
          control={control}
          defaultValue={initialValue?.amountCents ?? 0}
          render={({ field }) => (
            <Box>
              <FormLabel>Amount</FormLabel>
              <NumericFormatWrapper
                size="lg"
                allowNegative={false}
                customInput={Input}
                slotProps={{
                  input: { inputMode: 'decimal' },
                }}
                sx={{
                  input: { textAlign: 'center' },
                }}
                error={!!formState.errors.amountCents}
                {...field}
                value={formatCents(field.value, currency)}
                onChange={(e: any) => {
                  field.onChange(centsFromString(e.target.value, currency));
                }}
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
                          {CURRENCY_CODES.map((curCode) => (
                            <Option value={curCode} key={curCode}>
                              {curCode}
                            </Option>
                          ))}
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
          name="categoryId"
          control={control}
          render={({ field }) => (
            <>
              <Button
                variant="soft"
                color={formState.errors.categoryId ? 'danger' : 'neutral'}
                startDecorator={category && <CategoryIcon color={category.color}>{category.icon}</CategoryIcon>}
                onClick={() => setCategorySelectorOpen(true)}
                sx={{
                  alignSelf: 'center',
                  maxWidth: '100%',
                }}
                {...field}
              >
                <Typography fontSize="inherit" noWrap>
                  {category?.name || 'Choose category'}
                </Typography>
              </Button>
              <CategorySelectorDrawer
                open={categorySelectorOpen}
                onClose={() => setCategorySelectorOpen(false)}
                onChange={(value) => {
                  setCategory(value);
                  field.onChange(value.id);
                }}
                category={category}
              />
            </>
          )}
        />
        <Controller
          name="timestamp"
          control={control}
          defaultValue={moment(initialValue?.timestamp).format(DATETIME_INPUT_FORMAT)}
          render={({ field }) => (
            <FormControl error={!!formState.errors.timestamp}>
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
          )}
        />
        <Controller
          name="comment"
          control={control}
          defaultValue={initialValue?.comment ?? ''}
          render={({ field }) => (
            <FormControl error={!!formState.errors.comment}>
              <Textarea variant="plain" placeholder="Comment..." {...field} value={field.value} />
            </FormControl>
          )}
        />
        <Button type="submit" loading={isLoading}>
          {submitButtonText}
        </Button>
      </Stack>
    </form>
  );
};
