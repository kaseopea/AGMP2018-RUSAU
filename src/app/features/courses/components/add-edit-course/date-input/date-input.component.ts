import { AfterViewInit, Component, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { DateTransformPipe } from './pipes/date-transform.pipe';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true
    }
  ]
})
export class DateInputComponent implements ControlValueAccessor, OnDestroy, AfterViewInit {
  public dateForm = new FormGroup({
    date: new FormControl('')
  });
  private dateInputSubscription;
  private onChange: (value: string) => void;
  private onTouched = () => {};

  get date() {
    return this.dateForm.get('date');
  }

  constructor(private dateTransformPipe: DateTransformPipe) {
  }

  ngAfterViewInit(): void {
    this.dateInputSubscription = this.date.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((date) => {
        this.onChange(date);
        this.onTouched();
      });
  }

  writeValue(date: Date): void {
    this.date.setValue(this.dateTransformPipe.transform(date));
  }

  registerOnChange(onChange: (value: string) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  ngOnDestroy() {
    if (this.dateInputSubscription) {
      this.dateInputSubscription.unsubscribe();
    }
  }
}
