import { Directive, forwardRef } from '@angular/core';
import { FormControl, NG_VALIDATORS } from '@angular/forms';
import { DateTransformPipe } from '../pipes/date-transform.pipe';

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
  private INVALID_DATE_ERROR = {
    'validDate': 'Please fill in correct date format'
  };

  constructor(private dateTransformPipe: DateTransformPipe) {
  }

  validate(control: FormControl) {
    const cValue = (typeof control.value === 'string') ? control.value : this.dateTransformPipe.transform(control.value);
    const dateMatch = (cValue) ? cValue.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/) : null;

    if (!dateMatch) {
      return this.INVALID_DATE_ERROR;
    }

    return null;

  }
}
