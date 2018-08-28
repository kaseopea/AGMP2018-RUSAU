import { Directive, forwardRef } from '@angular/core';
import { FormControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appValidDate]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ValidDateValidatorDirective),
      multi: true
    }
  ]
})
export class ValidDateValidatorDirective {

  constructor() {
  }

  validate(control: FormControl) {
    console.log('@@@@', control.value);
    if (!control.value) {
      return {
        'required': 'Please fill in length value'
      };
    }

    return null;

  }
}
