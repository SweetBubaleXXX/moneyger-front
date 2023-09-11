import React, { useState } from 'react';
import {
  Divider,
  Select,
  Option,
  Stack,
  Modal,
  Sheet,
  Typography,
  FormLabel,
} from '@mui/joy';
import { SxProps } from '@mui/system';
import moment from 'moment';
import { Period, PeriodLabel } from './types';
import { DateInput } from './DateInput';

export type PeriodSelectorProps = {
  value: Period,
  onChange: (val: Period) => void,
  sx?: SxProps,
}

export const DEFAULT_PERIOD_LABEL: PeriodLabel = 'month';

export const DEFAULT_PERIOD: Period = createPeriodFromLabel(
  DEFAULT_PERIOD_LABEL
);

export const PeriodSelector = (props: PeriodSelectorProps) => {
  const [
    dateRangePickerOpen, setDateRangePickerOpen,
  ] = useState<boolean>(false);
  
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Select defaultValue={DEFAULT_PERIOD_LABEL} onChange={
          (event, newValue: PeriodLabel | null) => {
            if (newValue !== 'custom') {
              props.onChange(
                createPeriodFromLabel(newValue || DEFAULT_PERIOD_LABEL)
              );
            }
          }
        }>
          <Option value="day">Day</Option>
          <Option value="week">Week</Option>
          <Option value="month">Month</Option>
          <Option value="year">Year</Option>
          <Divider />
          <Option value="custom" onClick={() => setDateRangePickerOpen(true)}>
            Custom
          </Option>
        </Select>
      </Stack>
      <Modal
        open={dateRangePickerOpen}
        onClose={() => setDateRangePickerOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet sx={{
          borderRadius: 'md',
          py: 2,
          px: 3,
          boxShadow: 'lg',
        }}>
          <Typography level="h4">Custom date range</Typography>
          <Stack direction="column" spacing={1} paddingY={1}>
            <FormLabel>From</FormLabel>
            <DateInput 
              defaultValue={props.value.from}
              max={props.value.to}
              onChange={value => props.onChange({
                from: moment(value).toDate(),
                to: props.value.to,
              })}
            />
            <FormLabel>To</FormLabel>
            <DateInput 
              defaultValue={props.value.to}
              min={props.value.from}
              max={moment().toDate()}
              onChange={value => props.onChange({
                from: props.value.from,
                to: moment(value).toDate(),
              })}
            />
          </Stack>
        </Sheet>
      </Modal>
    </>
  );
};

function createPeriodFromLabel(label: Exclude<PeriodLabel, 'custom'>): Period {
  return {
    from: moment().startOf(label).toDate(),
    to: moment().endOf(label).toDate(),
  };
}
