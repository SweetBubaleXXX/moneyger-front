import React from 'react';
import { Divider, Select, Option } from '@mui/joy';
import { SxProps } from '@mui/system';

export type Period = 'day' | 'week' | 'month' | 'year' | 'custom';

export type PeriodSelectorProps = {
  onChange: (val: Period) => void,
  sx?: SxProps,
}

export const DEFAULT_PERIOD: Period = 'month';

export const PeriodSelector = (props: PeriodSelectorProps) => {
  return (
    <Select defaultValue={DEFAULT_PERIOD} onChange={
      (event, newValue: Period | null) =>
        props.onChange(newValue || DEFAULT_PERIOD)
    }>
      <Option value="day">Day</Option>
      <Option value="week">Week</Option>
      <Option value="month">Month</Option>
      <Option value="year">Year</Option>
      <Divider/>
      <Option value="custom">Custom</Option>
    </Select>
  );
};
