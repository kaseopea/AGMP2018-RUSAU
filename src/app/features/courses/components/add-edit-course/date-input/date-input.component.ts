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
    date: new FormControl('Enter date', [
      Validators.required
    ])
  });
  private _maskOriginal: string;
  private dateInputSubscription;

  get date() {
    return this.dateForm.get('date');
  }

  constructor() {
  }

  ngAfterViewInit(): void {
    this.dateInputSubscription = this.date.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((date) => {
        this._maskOriginal = date;
        // set transformed date to input
        this.date.setValue(this.transformDate(date));
      });
  }

  public transformDate(dateInput: string) {
    const date = new Date(dateInput);
    const month = date.getMonth() + 1;
    return `${date.getDate()}/${(month < 10) ? `0${month}` : month}/${date.getFullYear()}`;
  }

  writeValue(date: any): void {
    console.warn('### writeValue');
    this.date.setValue(this.transformDate(date));
  }

  registerOnChange(fn: any): void {
    console.warn('### registerOnChange');
  }

  registerOnTouched(fn: any): void {
    console.warn('### registerOnTouched');
  }

  ngOnDestroy() {
    if (this.dateInputSubscription) {
      this.dateInputSubscription.unsubscribe();
    }
  }
}
