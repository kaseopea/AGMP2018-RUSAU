import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, filter, distinctUntilChanged } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-courses',
  templateUrl: './search-courses.component.html',
  styleUrls: ['./search-courses.component.css']
})
export class SearchCoursesComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() searchHandler = new EventEmitter<string>();
  public placeHolderText = 'Type in search query...';
  public isSearchPerformed = false;
  public searchForm = new FormGroup({
    'query': new FormControl(this.placeHolderText)
  });
  private CONFIG = {
    debounce: 1000,
    minQueryLength: 3
  };
  private queryFormControl: FormControl;
  private searchQueryInputSubscription;

  constructor() {}

  ngOnInit() {
    this.queryFormControl = <FormControl>this.searchForm.get('query');
  }

  ngAfterViewInit(): void {
    this.searchQueryInputSubscription = this.queryFormControl.valueChanges
      .pipe(
        filter((text) => text.length >= this.CONFIG.minQueryLength),
        debounceTime(this.CONFIG.debounce),
        distinctUntilChanged()
      )
      .subscribe((query) => {
        this.isSearchPerformed = true;
        this.searchHandler.emit(query);
      });
  }

  public resetSearch() {
    this.queryFormControl.setValue(this.placeHolderText);
    this.isSearchPerformed = false;
    this.searchHandler.emit('');
  }

  public clearPlaceholder() {
    if (this.queryFormControl.value === this.placeHolderText) {
      this.queryFormControl.setValue('');
    }
  }

  ngOnDestroy() {
    if (this.searchQueryInputSubscription) {
      this.searchQueryInputSubscription.unsubscribe();
    }
  }
}
