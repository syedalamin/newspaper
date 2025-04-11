export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TShiftName =
  | 'Day_Shift'
  | 'Night_Shift'
  | 'Morning'
  | 'Evening'
  | 'Night';

export type TShiftCode = '01' | '02' | '03' | '04' | '05';

export type TShift = {
  name: TShiftName;
  code: TShiftCode;
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
};

export type TShiftNameCodeMapper = {
  [key: string]: string;
};
