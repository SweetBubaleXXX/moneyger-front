import { Input } from '@mui/joy';
import moment from 'moment';
import React from 'react';

import { DATE_INPUT_FORMAT } from '../../constants';

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
          min: formatDate(props.min),
          max: formatDate(props.max),
        },
      }}
      onChange={event => props.onChange(event.target.value)}
    />
  );
};

function formatDate(value?: Date): string | undefined {
  return value && moment(value).format(DATE_INPUT_FORMAT);
}
