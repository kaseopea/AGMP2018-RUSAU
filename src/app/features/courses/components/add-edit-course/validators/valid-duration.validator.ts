import { FormControl } from '@angular/forms';

export function validateDuration(c: FormControl) {
  return isNaN(c.value) ? {
    'validNumber': 'You have entered invalid number'
  } : null;
}
