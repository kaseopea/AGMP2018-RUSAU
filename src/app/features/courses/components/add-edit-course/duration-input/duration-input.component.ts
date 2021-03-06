import { AfterViewInit, Component, forwardRef, Input, OnDestroy } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationInputComponent),
      multi: true
    }
  ]
})
export class DurationInputComponent implements ControlValueAccessor, OnDestroy, AfterViewInit {
  public durationForm = new FormGroup({
    length: new FormControl(0)
  });
  private lengthInputSubscription;
  private onChange: (value: number) => void;
  private onTouched = () => {};

  constructor() {}

  get length() {
    return this.durationForm.get('length');
  }

  ngAfterViewInit(): void {
    this.lengthInputSubscription = this.length.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      });
  }


  writeValue(length: string): void {
    this.length.setValue(length);
  }

  registerOnChange(onChange: (value: number) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  ngOnDestroy() {
    if (this.lengthInputSubscription) {
      this.lengthInputSubscription.unsubscribe();
    }
  }

}
