import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number | string, args?: any): string {
    if (!this.isNumeric(value)) {
      return '--';
    }
    return this.getDurationString(this.intVal(value));
  }

  getDurationString(value) {
    const hours: number = Math.floor(value / 60);
    const minutes = value % 60;

    const output = {
      hours: this.processHours(hours),
      minutes: this.processMinutes(minutes)
    };
    return `${output.hours}${output.minutes}`;
  }

  // utils
  isNumeric(n: any): n is number | string {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  intVal(n: number | string): number {
    return typeof n === 'number' ? n : parseInt(n, 10);
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
