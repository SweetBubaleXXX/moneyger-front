import React from 'react';
import { Button, ToggleButtonGroup } from '@mui/joy';

export type Period = 'day' | 'week' | 'month' | 'year';

export type PeriodSelectorProps = {
  value: Period,
  onChange: (val: Period) => void,
}

export const DEFAULT_PERIOD: Period = 'month';

export const PeriodSelector = (props: PeriodSelectorProps) => {
  return (
    <ToggleButtonGroup
      value={props.value}
      onChange={(event, newValue: Period | null) => {
        props.onChange(newValue || DEFAULT_PERIOD);
      }}
    >
      <Button value="day">Day</Button>
      <Button value="week">Week</Button>
      <Button value="month">Month</Button>
      <Button value="Year">Year</Button>
    </ToggleButtonGroup>
  );
};
