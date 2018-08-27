import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
  selector: '[appValidDurationValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ValidDurationValidatorDirective),
      multi: true
    }
  ]
})
export class ValidDurationValidatorDirective implements Validator {
  constructor() { }

  validate(c: FormControl) {
    return isNaN(c.value) ? {
      'validNumber': 'You have entered invalid number'
    } : null;
  }

}
