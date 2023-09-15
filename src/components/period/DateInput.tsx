import { Input } from '@mui/joy';
import moment, { MomentInput } from 'moment';
import React from 'react';

export type DateRangeInputProps = {
  defaultValue?: Date,
  min?: Date,
  max?: Date,
  onChange: (val: string) => void,
}

export const DateInput = (props: DateRangeInputProps) => {
  return (
    <Input
      type="date"
      defaultValue={formatDate(props.defaultValue)}
      slotProps={{
        input: {
          min: props.min && formatDate(props.min),
          max: props.max && formatDate(props.max),
        },
      }}
      onChange={event => props.onChange(event.target.value)}
    />
  );
};

function formatDate(value: MomentInput): string {
  return moment(value).format('YYYY-MM-DD');
}
