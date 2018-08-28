import { AfterViewInit, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';

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
  @Input() public dateInput: string;
  public dateForm = new FormGroup({
    date: new FormControl('', [
      Validators.required
    ])
  });
  private dateInputSubscription;
  private onChange: (value: string) => void;
  private onTouched = () => {};

  get date() {
    // const date = this.dateForm.get('date').value;
    // console.warn(`Date: ${date.toString()} | Type: ${typeof date}`);
    return this.dateForm.get('date');
  }

  constructor() {
  }

  ngAfterViewInit(): void {
    this.dateInputSubscription = this.date.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((date) => {
        console.log(this.date);
        if (this.date.valid) {
          this.onChange(date);
        }
        this.onTouched();
      });
  }

  public transformDate(dateInput: string) {
    const date = new Date(dateInput);
    const month = date.getMonth() + 1;
    return `${date.getDate()}/${(month < 10) ? `0${month}` : month}/${date.getFullYear()}`;
  }

  writeValue(date: any): void {
    this.date.setValue(this.transformDate(date));
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
