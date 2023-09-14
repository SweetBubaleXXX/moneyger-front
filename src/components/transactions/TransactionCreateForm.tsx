import React, { useState } from 'react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NumericFormat } from 'react-number-format';
import moment from 'moment';
import { 
  Divider,
  FormLabel,
  Input,
  Select,
  Stack,
  Option,
  Textarea,
  Box,
  Button,
  Drawer,
  Avatar,
  Tabs,
  TabList,
  Tab,
  TabPanel,
} from '@mui/joy';
import { 
  Category,
  CurrencyCode,
  TransactionCreateRequest, 
} from '../../features/api/types';
import { CURRENCY_CODES } from '../../constants';

export const TransactionSchema = z.object({
  amount: z.number().positive().finite(),
  category: z.number().int().positive(),
  currency: z.enum(CURRENCY_CODES),
  transactionTime: z.date(),
  comment: z.string(),
});

export const TransactionCreateForm = () => {
  const [
    categorySelectorOpen, setCategorySelectorOpen,
  ] = useState<boolean>(false);
  const [category, setCategory] = useState<Category | undefined>();
  const [currency, setCurrency] = useState<CurrencyCode>(CURRENCY_CODES[0]);
  const { 
    control, handleSubmit, formState: {errors},
  } = useForm<TransactionCreateRequest>(
    { resolver: zodResolver(TransactionSchema) }
  );
  
  return (
    <form>
      <Stack spacing={4} padding={3}>
        <Controller
          name="amount"
          control={control}
          defaultValue="0"
          render={({field}) => (
            <Box>
              <FormLabel>Amount</FormLabel>
              <NumericFormat
                size="lg"
                allowNegative={false}
                customInput={Input}
                sx={{input: {textAlign: 'center'}}}
                {...field}
                endDecorator={
                  <>
                    <Divider orientation="vertical" />
                    <Controller
                      name="currency"
                      control={control}
                      render={({field}) => (
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
                          onChange={(_, value) => setCurrency(value!)}
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
        <Button
          variant="soft"
          startDecorator={category && <Avatar>{category.icon}</Avatar>}
          onClick={() => setCategorySelectorOpen(true)}
          sx={{
            alignSelf: 'center',
          }}
        >
          {category?.name || 'Choose category'}
        </Button>
        <Drawer
          open={categorySelectorOpen}
          anchor="bottom"
          size="md"
          onClose={() => setCategorySelectorOpen(false)}>
          <Tabs defaultValue="OUT">
            <TabList tabFlex={1}>
              <Tab value="OUT">Outcome</Tab>
              <Tab value="IN">Income</Tab>
            </TabList>
            <TabPanel value="OUT">

            </TabPanel>
            <TabPanel value="IN">

            </TabPanel>
          </Tabs>
        </Drawer>
        <Controller
          name="transactionTime"
          control={control}
          defaultValue={moment().format('YYYY-MM-DDTHH:mm')}
          render={({field}) =>
            <Box>
              <FormLabel>Transaction Time</FormLabel>
              <Input
                type="datetime-local"
                slotProps={{
                  input: { 
                    max: moment().format('YYYY-MM-DDTHH:mm'),
                  },
                }}
                {...field} />
            </Box>
          } />
        <Controller
          name="comment"
          control={control}
          defaultValue=""
          render={({field}) =>
            <Textarea variant="plain" placeholder="Comment..." {...field}/>} />
        <Button type="submit">
          Add
        </Button>
      </Stack>
    </form>
  );
};
