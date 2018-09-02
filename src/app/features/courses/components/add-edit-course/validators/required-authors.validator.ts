import { FormControl } from '@angular/forms';

export function validateRequiredAuthors(c: FormControl) {
  const INVALID_AUTHORS_ERROR = {
    'authorRequired': 'Please add at least one author'
  };

  if (!c.value.length) {
    return INVALID_AUTHORS_ERROR;
  }
  return null;
}

