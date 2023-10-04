import {
  FormLabel,
  Modal,
  Sheet,
  Stack,
  Typography,
} from '@mui/joy';
import { SxProps } from '@mui/joy/styles/types';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { DateInput } from './DateInput';
import { Period } from './types';

export type DateRangeModalProps = {
  open: boolean,
  initialValue: Period,
  onClose: (value: Period) => void,
}

const MODAL_STYLES: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const MODAL_CONTENT_STYLES: SxProps = {
  borderRadius: 'md',
  py: 2,
  px: 3,
  boxShadow: 'lg',
};

export const DateRangeModal = ({
  open,
  initialValue,
  onClose,
}: DateRangeModalProps) => {
  const [period, setPeriod] = useState<Period>(initialValue);

  useEffect(() => {
    setPeriod(initialValue);
  }, [initialValue]);

  return (
    <Modal
      open={open}
      onClose={() => onClose(period)}
      sx={MODAL_STYLES}
    >
      <Sheet sx={MODAL_CONTENT_STYLES}>
        <Typography level="h4">Custom date range</Typography>
        <Stack direction="column" spacing={1} paddingY={1}>
          <FormLabel>From</FormLabel>
          <DateInput
            defaultValue={initialValue.from}
            max={moment.min(moment(), moment(period.to)).toDate()}
            onChange={value => setPeriod({
              from: parseDate(value) ?? period.from,
              to: period.to,
            })}
          />
          <FormLabel>To</FormLabel>
          <DateInput
            defaultValue={initialValue.to}
            min={period.from}
            max={moment().toDate()}
            onChange={value => setPeriod({
              from: period.from,
              to: parseDate(value) ?? period.to,
            })}
          />
        </Stack>
      </Sheet>
    </Modal>
  );
};

const parseDate = (value: string) => {
  const parsedValue = moment(value);
  if (!parsedValue.isValid()) {
    return null;
  }
  return parsedValue.toDate();
};
