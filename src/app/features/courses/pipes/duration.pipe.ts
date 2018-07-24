import { Pipe, PipeTransform } from '@angular/core';
import {min} from 'rxjs/operators';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    const hours: number = Math.floor(value / 60);
    const minutes = value % 60;
    return `${this.processHours(hours)}:${this.processMinutes(minutes)}`;
  }

  processHours(hours) {
    if (!hours) {
      return '';
    }
    hours = hours < 10 ? '0' + hours : hours;
    return hours + 'h';
  }

  processMinutes(minutes) {
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + 'm';
  }

}
