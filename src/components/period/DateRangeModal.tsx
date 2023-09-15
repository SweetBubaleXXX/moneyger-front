import React, { useState } from 'react';
import {
  Stack,
  Modal,
  Sheet,
  Typography,
  FormLabel,
} from '@mui/joy';
import moment from 'moment';
import { Period } from './types';
import { DateInput } from './DateInput';

export type DateRangeModalProps = {
  open: boolean,
  initialValue: Period,
  onClose: (value: Period) => void,
}

export const DateRangeModal = (props: DateRangeModalProps) => {
  const [period, setPeriod] = useState<Period>(props.initialValue);

  return (
    <Modal
      open={props.open}
      onClose={() => props.onClose(period)}
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
            defaultValue={props.initialValue.from}
            max={moment.min(moment(), moment(period.to)).toDate()}
            onChange={value => setPeriod({
              from: moment(value).toDate(),
              to: period.to,
            })}
          />
          <FormLabel>To</FormLabel>
          <DateInput
            defaultValue={props.initialValue.to}
            min={period.from}
            max={moment().toDate()}
            onChange={value => setPeriod({
              from: period.from,
              to: moment(value).toDate(),
            })}
          />
        </Stack>
      </Sheet>
    </Modal>
  );
};