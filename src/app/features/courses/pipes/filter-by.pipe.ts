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
      const title = (caseSensitive) ? course.title : course.title.toLowerCase();
      const searchFor = (caseSensitive) ? filterByValue : filterByValue.toLowerCase();
      return title.includes(searchFor);
    });
  }

}
