import { Pipe, PipeTransform } from '@angular/core';
import {ICourse} from '../interfaces/icourse';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: ICourse[], sortByField: string): ICourse[] {
    const sorted =  value.sort((a, b) => {
        if (a[sortByField] < b[sortByField]) {
            return 1;
        } else if (a[sortByField] > b[sortByField]) {
            return  -1;
        } else {
            return 0;
        }
    });
    return sorted;
  }

}
