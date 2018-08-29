import { Directive, forwardRef } from '@angular/core';
import { FormControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appValidAuthors]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RequiredAuthorsValidatorDirective),
      multi: true
    }
  ]
})
export class RequiredAuthorsValidatorDirective {
  private INVALID_AUTHORS_ERROR = {
    'authorRequired': 'Please add at least one author'
  };

  constructor() {
  }

  validate(control: FormControl) {
    if (!control.value.length) {
      return this.INVALID_AUTHORS_ERROR;
    }
    return null;

  }
}
