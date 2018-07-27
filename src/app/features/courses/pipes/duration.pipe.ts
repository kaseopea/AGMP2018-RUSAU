import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    if (!Number.isInteger(value)) {
      return '--';
    }
    const hours: number = Math.floor(value / 60);
    const minutes = value % 60;
    const output = {
      hours: this.processHours(hours),
      minutes: this.processMinutes(minutes)
    };
    return `${output.hours}${output.minutes}`;
  }

  processHours(hours) {
    if (!hours) {
      return '';
    }
    hours = hours < 10 ? '0' + hours : hours;
    return hours + 'h:';
  }

  processMinutes(minutes) {
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + 'm';
  }

}
