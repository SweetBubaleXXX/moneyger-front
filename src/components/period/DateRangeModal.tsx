import {
  Box,
  Checkbox,
  FormControl,
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
  const [allTime, setAllTime] = useState<boolean>(false);

  const closeEvent = () => {
    onClose(period);
    setAllTime(false);
  };

  useEffect(() => {
    setPeriod(initialValue);
  }, [initialValue]);

  useEffect(() => {
    setPeriod({
      from: moment.utc('0001').toDate(),
      to: moment().toDate(),
    });
  }, [allTime]);

  return (
    <Modal
      open={open}
      onClose={closeEvent}
      sx={MODAL_STYLES}
    >
      <Sheet sx={MODAL_CONTENT_STYLES}>
        <Typography level="h4">Custom date range</Typography>
        <Stack direction="column" spacing={2} paddingY={1}>
          <FormControl>
            <FormLabel>From</FormLabel>
            <DateInput
              disabled={allTime}
              value={period.from}
              max={moment.min(moment(), moment(period.to)).toDate()}
              onChange={value => setPeriod({
                from: parseDate(value) ?? period.from,
                to: period.to,
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>To</FormLabel>
            <DateInput
              disabled={allTime}
              value={period.to}
              min={period.from}
              max={moment().toDate()}
              onChange={value => setPeriod({
                from: period.from,
                to: parseDate(value) ?? period.to,
              })}
            />
          </FormControl>
          <Box display="flex" justifyContent="center">
            <Checkbox
              checked={allTime}
              onChange={e => setAllTime(e.target.checked)}
              label="All Time"
              sx={{
                p: 1,
              }}
            />
          </Box>
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
