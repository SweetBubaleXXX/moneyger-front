import {
  Button,
  Divider,
  Option,
  Select,
  Stack,
  Typography,
} from '@mui/joy';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import moment from 'moment';
import React, { useState } from 'react';

import { DateRangeModal } from './DateRangeModal';
import { Period, PeriodLabel } from './types';

export type PeriodSelectorProps = {
  value: Period,
  onChange: (val: Period) => void,
}

const createPeriodFromLabel = (label: Exclude<PeriodLabel, 'custom'>) => {
  return {
    from: moment().startOf(label).toDate(),
    to: moment().endOf(label).toDate(),
  };
};

export const DEFAULT_PERIOD_LABEL: PeriodLabel = 'month';

export const DEFAULT_PERIOD: Period = createPeriodFromLabel(
  DEFAULT_PERIOD_LABEL
);

export const PeriodSelector = ({
  value,
  onChange,
}: PeriodSelectorProps) => {
  const [
    selectedPeriod, setSelectedPeriod,
  ] = useState<PeriodLabel>(DEFAULT_PERIOD_LABEL);

  const [
    dateRangePickerOpen, setDateRangePickerOpen,
  ] = useState<boolean>(false);

  const handlePeriodChange = (_: any, newValue: PeriodLabel | null): void => {
    if (newValue) {
      setSelectedPeriod(newValue);
    }
    if (newValue !== 'custom') {
      onChange(
        createPeriodFromLabel(newValue || DEFAULT_PERIOD_LABEL)
      );
    }
  };

  const onModalClose = (value: Period): void => {
    setDateRangePickerOpen(false);
    onChange(value);
  };

  return (
    <>
      <Stack direction="column" spacing={1} alignItems="center">
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Button
            variant="plain"
            disabled={selectedPeriod === 'custom'}
            onClick={
              () => onChange(addToPeriod(value, selectedPeriod, -1))
            }>
            <ChevronLeft />
          </Button>
          <Select
            defaultValue={DEFAULT_PERIOD_LABEL}
            onChange={handlePeriodChange}>
            <Option value="day">Day</Option>
            <Option value="week">Week</Option>
            <Option value="month">Month</Option>
            <Option value="year">Year</Option>
            <Divider />
            <Option value="custom" onClick={() => setDateRangePickerOpen(true)}>
              Custom
            </Option>
          </Select>
          <Button
            variant="plain"
            disabled={!canIncrementPeriod(value, selectedPeriod)}
            onClick={
              () => onChange(addToPeriod(value, selectedPeriod, 1))
            }>
            <ChevronRight />
          </Button>
        </Stack>
        <Typography level="body-sm">
          {renderPeriodHint(value, selectedPeriod)}
        </Typography>
      </Stack>
      <DateRangeModal
        open={dateRangePickerOpen}
        initialValue={value}
        onClose={onModalClose} />
    </>
  );
};

const renderPeriodHint = (period: Period, label: PeriodLabel) => {
  switch (label) {
    case 'day':
      return moment(period.from).format('LL');
    case 'month':
      return moment(period.from).format('MMMM YYYY');
    case 'year':
      return moment(period.from).format('YYYY');
    case 'custom':
    case 'week':
    default:
      return [period.from, period.to]
        .map(date => moment(date)
          .format('ll')).join(' - ');
  }
};

const canIncrementPeriod = (period: Period, label: PeriodLabel) => {
  return label !== 'custom' && moment(period.from)
    .add(1, label)
    .isBefore(moment());
};

const addToPeriod = (
  period: Period,
  label: PeriodLabel,
  value: number,
) => {
  if (label === 'custom') {
    return period;
  }
  return {
    from: moment(period.from).add(value, label).toDate(),
    to: moment(period.to).add(value, label).toDate(),
  };
};
