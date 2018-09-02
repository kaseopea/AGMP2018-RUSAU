import { FormControl } from '@angular/forms';
import * as moment from 'moment';

export function validateDate(c: FormControl) {
  const INVALID_DATE_ERROR = {
    'validDate': 'Please fill in correct date format'
  };
  const DATE_FORMAT = 'DD/MM/YYYY';
  const MIN_DATE = '2000-12-31';
  const MIN_DATE_PRECISION = 'year';
  const inputDate = c.value;
  let checkDate;
  if (!inputDate) {
    return null;
  }
  // process date with moment
  if (typeof inputDate === 'string') {
    checkDate = moment(inputDate, DATE_FORMAT);
  } else if (inputDate instanceof Date) {
    const dateObj = {
      day: inputDate.getDate(),
      month: inputDate.getMonth() + 1,
      year: inputDate.getFullYear()
    };
    checkDate = moment(dateObj, DATE_FORMAT);
  }

  if (!checkDate.isValid() || checkDate.isBefore(MIN_DATE, MIN_DATE_PRECISION)) {
    return INVALID_DATE_ERROR;
  }

  return null;
}

