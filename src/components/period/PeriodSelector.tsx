import React, { useState } from 'react';
import {
  Divider,
  Select,
  Option,
  Stack,
  Modal,
  Sheet,
  Typography,
  FormLabel,
  Button,
} from '@mui/joy';
import { SxProps } from '@mui/system';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import moment from 'moment';
import { Period, PeriodLabel } from './types';
import { DateInput } from './DateInput';

export type PeriodSelectorProps = {
  value: Period,
  onChange: (val: Period) => void,
  sx?: SxProps,
}

export const DEFAULT_PERIOD_LABEL: PeriodLabel = 'month';

export const DEFAULT_PERIOD: Period = createPeriodFromLabel(
  DEFAULT_PERIOD_LABEL
);

export const PeriodSelector = (props: PeriodSelectorProps) => {
  const [
    selectedPeriod, setSelectedPeriod,
  ] = useState<PeriodLabel>(DEFAULT_PERIOD_LABEL);
  const [
    dateRangePickerOpen, setDateRangePickerOpen,
  ] = useState<boolean>(false);

  return (
    <>
      <Stack direction="column" spacing={1} alignItems="center">
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Button 
            variant="plain"
            disabled={selectedPeriod === 'custom'}
            onClick={
              () => props.onChange(addToPeriod(props.value, selectedPeriod, -1))
            }>
            <ChevronLeft />
          </Button>
          <Select
            defaultValue={DEFAULT_PERIOD_LABEL}
            onChange={
              (event, newValue: PeriodLabel | null) => {
                if (newValue) {
                  setSelectedPeriod(newValue);
                }
                if (newValue !== 'custom') {
                  props.onChange(
                    createPeriodFromLabel(newValue || DEFAULT_PERIOD_LABEL)
                  );
                }
              }
            }>
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
            disabled={!canIncrementPeriod(props.value, selectedPeriod)}
            onClick={
              () => props.onChange(addToPeriod(props.value, selectedPeriod, 1))
            }>
            <ChevronRight />
          </Button>
        </Stack>
        <Typography level="body-sm">
          {renderPeriodHint(props.value, selectedPeriod)}
        </Typography>
      </Stack>
      <Modal
        open={dateRangePickerOpen}
        onClose={() => setDateRangePickerOpen(false)}
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
              defaultValue={props.value.from}
              max={props.value.to}
              onChange={value => props.onChange({
                from: moment(value).toDate(),
                to: props.value.to,
              })}
            />
            <FormLabel>To</FormLabel>
            <DateInput 
              defaultValue={props.value.to}
              min={props.value.from}
              max={moment().toDate()}
              onChange={value => props.onChange({
                from: props.value.from,
                to: moment(value).toDate(),
              })}
            />
          </Stack>
        </Sheet>
      </Modal>
    </>
  );
};

function createPeriodFromLabel(label: Exclude<PeriodLabel, 'custom'>): Period {
  return {
    from: moment().startOf(label).toDate(),
    to: moment().endOf(label).toDate(),
  };
}

function renderPeriodHint(period: Period, label: PeriodLabel): string {
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
}

function canIncrementPeriod(period: Period, label: PeriodLabel): boolean {
  return label !== 'custom' && moment(period.from)
    .add(1, label)
    .isBefore(moment());
}

function addToPeriod(
  period: Period,
  label: PeriodLabel,
  value: number,
): Period {
  if (label === 'custom') {
    return period;
  }
  return {
    from: moment(period.from).add(value, label).toDate(),
    to: moment(period.to).add(value, label).toDate(),
  };
}
