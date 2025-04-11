import {
  TMonths,
  TShiftCode,
  TShiftName,
  TShiftNameCodeMapper,
} from './seasonal.date.interface';

export const Month: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const ShiftName: TShiftName[] = [
  'Day_Shift',
  'Night_Shift',
  'Morning',
  'Evening',
  'Night',
];

export const ShiftCode: TShiftCode[] = ['01', '02', '03', '04', '05'];

export const ShiftNameCodeMapper: TShiftNameCodeMapper = {
  Day_Shift: '01',
  Night_Shift: '02',
  Morning: '03',
  Evening: '04',
  Night: '05',
};

export const ShiftSearchableFields = ["name", "year"]