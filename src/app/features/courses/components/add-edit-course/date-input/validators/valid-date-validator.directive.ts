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
    const match = control.value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    // console.log(`@@@@ ${control.value}`);
    // console.log(`@@@@ Match`, match);
    if (!match) {
      return {
        'validDate': 'Please fill in correct date format'
      };
    }

    return null;

  }
}
