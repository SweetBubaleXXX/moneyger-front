import { Input } from '@mui/joy';
import moment from 'moment';
import React from 'react';

import { DATE_INPUT_FORMAT } from '../../constants';

export type DateRangeInputProps = {
  defaultValue?: Date,
  value?: Date,
  min?: Date,
  max?: Date,
  disabled?: boolean,
  onChange: (val: string) => void,
}

export const DateInput = ({
  defaultValue,
  value,
  min,
  max,
  disabled,
  onChange,
}: DateRangeInputProps) => {
  return (
    <Input
      type="date"
      disabled={disabled}
      defaultValue={formatDate(defaultValue)}
      value={formatDate(value)}
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
