import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { COURSES_CONST } from '../../../../constants/courses.constant';

@Pipe({
  name: 'dateTransform'
})
export class DateTransformPipe extends DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return super.transform(value, COURSES_CONST.DATE_FMT);
  }

}
