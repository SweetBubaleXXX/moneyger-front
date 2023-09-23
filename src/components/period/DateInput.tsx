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

export const DateInput = ({
  defaultValue,
  min,
  max,
  onChange,
}: DateRangeInputProps) => {
  return (
    <Input
      type="date"
      defaultValue={formatDate(defaultValue)}
      slotProps={{
        input: {
          min: formatDate(min),
          max: formatDate(max),
        },
      }}
      onChange={event => onChange(event.target.value)}
    />
  );
};

const formatDate = (value?: Date) => {
  return value && moment(value).format(DATE_INPUT_FORMAT);
};
