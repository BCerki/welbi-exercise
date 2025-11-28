import {
  format,
  parseISO,
  isValid,
  addDays,
  addHours,
  addMinutes,
  subDays,
  subHours,
  subMinutes,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  isBefore,
  isAfter,
  isEqual,
  compareAsc,
  compareDesc,
} from 'date-fns';
import { toZonedTime, fromZonedTime, format as formatTz } from 'date-fns-tz';

// Common date formats
export const DATE_FORMATS = {
  ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
  DATE_ONLY: 'yyyy-MM-dd',
  TIME_ONLY: 'HH:mm:ss',
  DATETIME: 'yyyy-MM-dd HH:mm:ss',
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_WITH_TIME: 'MMM dd, yyyy HH:mm',
  RELATIVE: 'relative',
} as const;

// Type for date input
export type DateInput = Date | string | number;

// Utility to ensure we have a valid Date object
function toDate(input: DateInput): Date {
  if (input instanceof Date) {
    return input;
  }
  if (typeof input === 'string') {
    const parsed = parseISO(input);
    if (!isValid(parsed)) {
      throw new Error(`Invalid date string: ${input}`);
    }
    return parsed;
  }
  if (typeof input === 'number') {
    const date = new Date(input);
    if (!isValid(date)) {
      throw new Error(`Invalid timestamp: ${input}`);
    }
    return date;
  }
  throw new Error(`Invalid date input: ${input}`);
}

// Formatting utilities
export function formatDate(date: DateInput, formatStr: string = DATE_FORMATS.DISPLAY): string {
  const dateObj = toDate(date);
  return format(dateObj, formatStr);
}

export function formatDateWithTimezone(date: DateInput, timezone: string, formatStr: string = DATE_FORMATS.DISPLAY_WITH_TIME): string {
  const dateObj = toDate(date);
  const zonedDate = toZonedTime(dateObj, timezone);
  return formatTz(zonedDate, formatStr, { timeZone: timezone });
}

// ISO string utilities
export function toISOString(date: DateInput): string {
  return toDate(date).toISOString();
}

export function fromISOString(isoString: string): Date {
  return toDate(isoString);
}

// Timezone utilities
export function convertToTimezone(date: DateInput, timezone: string): Date {
  const dateObj = toDate(date);
  return toZonedTime(dateObj, timezone);
}

export function convertFromTimezone(date: DateInput, timezone: string): Date {
  const dateObj = toDate(date);
  return fromZonedTime(dateObj, timezone);
}

// Date arithmetic
export function addTime(date: DateInput, amount: number, unit: 'days' | 'hours' | 'minutes'): Date {
  const dateObj = toDate(date);
  switch (unit) {
    case 'days':
      return addDays(dateObj, amount);
    case 'hours':
      return addHours(dateObj, amount);
    case 'minutes':
      return addMinutes(dateObj, amount);
    default:
      throw new Error(`Unsupported time unit: ${unit}`);
  }
}

export function subtractTime(date: DateInput, amount: number, unit: 'days' | 'hours' | 'minutes'): Date {
  const dateObj = toDate(date);
  switch (unit) {
    case 'days':
      return subDays(dateObj, amount);
    case 'hours':
      return subHours(dateObj, amount);
    case 'minutes':
      return subMinutes(dateObj, amount);
    default:
      throw new Error(`Unsupported time unit: ${unit}`);
  }
}

// Date comparisons
export function isDateBefore(date1: DateInput, date2: DateInput): boolean {
  return isBefore(toDate(date1), toDate(date2));
}

export function isDateAfter(date1: DateInput, date2: DateInput): boolean {
  return isAfter(toDate(date1), toDate(date2));
}

export function isDateEqual(date1: DateInput, date2: DateInput): boolean {
  return isEqual(toDate(date1), toDate(date2));
}

export function compareDates(date1: DateInput, date2: DateInput, order: 'asc' | 'desc' = 'asc'): number {
  const d1 = toDate(date1);
  const d2 = toDate(date2);
  return order === 'asc' ? compareAsc(d1, d2) : compareDesc(d1, d2);
}

// Date differences
export function getDifference(date1: DateInput, date2: DateInput, unit: 'days' | 'hours' | 'minutes' | 'seconds'): number {
  const d1 = toDate(date1);
  const d2 = toDate(date2);
  
  switch (unit) {
    case 'days':
      return differenceInDays(d1, d2);
    case 'hours':
      return differenceInHours(d1, d2);
    case 'minutes':
      return differenceInMinutes(d1, d2);
    case 'seconds':
      return differenceInSeconds(d1, d2);
    default:
      throw new Error(`Unsupported difference unit: ${unit}`);
  }
}

// Date boundaries
export function getStartOfPeriod(date: DateInput, period: 'day' | 'week' | 'month' | 'year'): Date {
  const dateObj = toDate(date);
  switch (period) {
    case 'day':
      return startOfDay(dateObj);
    case 'week':
      return startOfWeek(dateObj);
    case 'month':
      return startOfMonth(dateObj);
    case 'year':
      return startOfYear(dateObj);
    default:
      throw new Error(`Unsupported period: ${period}`);
  }
}

export function getEndOfPeriod(date: DateInput, period: 'day' | 'week' | 'month' | 'year'): Date {
  const dateObj = toDate(date);
  switch (period) {
    case 'day':
      return endOfDay(dateObj);
    case 'week':
      return endOfWeek(dateObj);
    case 'month':
      return endOfMonth(dateObj);
    case 'year':
      return endOfYear(dateObj);
    default:
      throw new Error(`Unsupported period: ${period}`);
  }
}

// Convenience functions
export function now(): Date {
  return new Date();
}

export function today(): Date {
  return startOfDay(new Date());
}

export function tomorrow(): Date {
  return addDays(today(), 1);
}

export function yesterday(): Date {
  return subDays(today(), 1);
}

// Age calculation
export function getAge(birthdate: DateInput, referenceDate: DateInput = new Date()): number {
  return getDifference(referenceDate, birthdate, 'days') / 365.25;
}

// Validation
export function isValidDate(input: unknown): input is DateInput {
  try {
    if (input === null || input === undefined) return false;
    toDate(input as DateInput);
    return true;
  } catch {
    return false;
  }
} 