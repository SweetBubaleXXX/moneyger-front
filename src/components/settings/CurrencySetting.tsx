import {
  ListItem,
  ListItemContent,
  Option,
  Select,
} from '@mui/joy';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

import { CURRENCY_CODES } from '../../constants';
import {
  useGetAccountQuery,
  useUpdateAccountMutation,
} from '../../features/api/apiSlice';
import { CurrencyCode } from '../../features/api/types';

export const CurrencySetting = () => {
  const account = useGetAccountQuery();
  const [updateAccount, result] = useUpdateAccountMutation();

  const updateDefaultCurrency = (value: CurrencyCode | null) => {
    if (!value || !account.data) { return; }
    updateAccount({
      id: account.data.id,
      defaultCurrency: value,
    });
  };

  useEffect(() => {
    if (result.isError) {
      toast.error('Failed to update account');
    }
  }, [result.isError]);

  return (
    <ListItem endAction={
      <Select
        disabled={account.isFetching || result.isLoading}
        value={account.data?.defaultCurrency}
        onChange={(_, value) => updateDefaultCurrency(value)}
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
    }>
      <ListItemContent>
        Default Currency
      </ListItemContent>
    </ListItem>
  );
};
