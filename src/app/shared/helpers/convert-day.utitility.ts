import {
  WEEK_DAYS,
  WeekDayKeys,
} from '@features/tasker/constants/week-days.constant';

export const getDayNumber = (day: WeekDayKeys): number => {
  return WEEK_DAYS.indexOf(day) + 1;
};

export const getDayString = (dayNumber: number): WeekDayKeys => {
  return WEEK_DAYS[dayNumber - 1];
};
