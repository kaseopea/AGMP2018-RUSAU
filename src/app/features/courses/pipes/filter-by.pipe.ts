import { Pipe, PipeTransform } from '@angular/core';
import {ICourse} from '../interfaces/icourse';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(data: ICourse[], filterByValue: string, caseSensitive: boolean = false): ICourse[] {
    if (!data) {
      return [];
    }
    return data.filter(course => {
      const title = (caseSensitive) ? course.name : course.name.toLowerCase();
      const searchFor = (caseSensitive) ? filterByValue : filterByValue.toLowerCase();
      return title.includes(searchFor);
    });
  }

}
