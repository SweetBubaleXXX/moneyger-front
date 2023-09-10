import React from 'react';
import { Divider, Select, Option, Stack } from '@mui/joy';
import { SxProps } from '@mui/system';
import moment from 'moment';

export type PeriodLabel = 'day' | 'week' | 'month' | 'year' | 'custom';

export type Period = {
  from: Date,
  to: Date,
}

export type PeriodSelectorProps = {
  onChange: (val: Period) => void,
  sx?: SxProps,
}

export const DEFAULT_PERIOD_LABEL: PeriodLabel = 'month';

export const DEFAULT_PERIOD: Period = createPeriodFromLabel(
  DEFAULT_PERIOD_LABEL
);

function createPeriodFromLabel(label: Exclude<PeriodLabel, 'custom'>): Period {
  return {
    from: moment().startOf(label).toDate(),
    to: moment().endOf(label).toDate(),
  };
}

export const PeriodSelector = (props: PeriodSelectorProps) => {
  return (
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
        <Divider/>
        <Option value="custom">Custom</Option>
      </Select>
    </Stack>
  );
};
