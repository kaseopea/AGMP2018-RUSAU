import { Directive, forwardRef } from '@angular/core';
import { FormControl, NG_VALIDATORS } from '@angular/forms';
import { DateTransformPipe } from '../pipes/date-transform.pipe';
import * as moment from 'moment';

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
    const checkDate = moment(control.value);
    if (!checkDate.isValid()) {
      return this.INVALID_DATE_ERROR;
    }
    return null;

  }
}
