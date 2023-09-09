import React, { useState } from 'react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NumericFormat } from 'react-number-format';
import { 
  Divider,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Option,
} from '@mui/joy';
import { 
  CurrencyCode,
  TransactionCreateRequest, 
} from '../../features/api/types';
import { CURRENCY_CODES } from '../../constants';

export const TransactionSchema = z.object({
  amount: z.number().positive().finite(),
  category: z.number().int().positive(),
  currency: z.enum(CURRENCY_CODES),
  transaction_time: z.date(),
});

export const TransactionCreateForm = () => {
  const [currency, setCurrency] = useState<CurrencyCode>(CURRENCY_CODES[0]);
  const { 
    control, handleSubmit, formState: {errors},
  } = useForm<TransactionCreateRequest>(
    { resolver: zodResolver(TransactionSchema) }
  );
  
  return (
    <form>
      <Stack spacing={2}>
        <Controller
          name="amount"
          control={control}
          defaultValue="0"
          render={({field}) => (
            <FormControl error={!!errors.amount}>
              <FormLabel>Amount</FormLabel>
              <Input {...field}
                slotProps={{
                  input:{
                    component: NumericFormat,
                  },
                }}
                endDecorator={<>
                  <Divider orientation="vertical" />
                  <Select
                    variant="plain"
                    value={currency}
                    onChange={(_, value) => setCurrency(value!)}
                    slotProps={{
                      listbox: {
                        variant: 'outlined',
                      },
                    }}
                    sx={{ mr: -1.5, '&:hover': { bgcolor: 'transparent' } }}
                  >
                    {CURRENCY_CODES.map(curCode =>
                      <Option value={curCode} key={curCode}>{curCode}</Option>
                    )}
                  </Select>
                </>
                }/>
            </FormControl>
          )}
        />
      </Stack>
    </form>
  );
};
