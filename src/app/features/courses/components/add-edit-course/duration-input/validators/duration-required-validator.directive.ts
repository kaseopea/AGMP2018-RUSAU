import { Directive, forwardRef } from '@angular/core';
import { FormControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appDurationRequired]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DurationRequiredValidatorDirective),
      multi: true
    }
  ]
})
export class DurationRequiredValidatorDirective {

  constructor() {
  }

  validate(control: FormControl) {
    if (!control.value) {
      return {
        'required': 'Please fill in length value'
      };
    }

    return null;

  }
}
