import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, map, filter, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-courses',
  templateUrl: './search-courses.component.html',
  styleUrls: ['./search-courses.component.css']
})
export class SearchCoursesComponent implements OnInit, OnDestroy {
  @ViewChild('searchQuery') searchQuery: ElementRef;
  @Output() searchHandler = new EventEmitter<string>();
  public query: string;
  public placeHolderText = 'Type in search query...';
  public isSearchPerformed = false;
  public searchInputValueSubject = new Subject<string>();

  private CONFIG = {
    debounce: 1000,
    minQueryLength: 3
  };
  private inputTypeSubscription;

  constructor() {
  }

  ngOnInit() {
    this.query = this.placeHolderText;

    // fromEvent version
    /*this.inputTypeSubscription = fromEvent(this.searchQuery.nativeElement, 'input').pipe(
      map((e: KeyboardEvent) => (<HTMLInputElement>e.target).value),
      filter(text => text.length >= this.CONFIG.minQueryLength),
      debounceTime(this.CONFIG.debounce),
      distinctUntilChanged()
    ).subscribe(query => {
      this.isSearchPerformed = true;
      this.searchHandler.emit(query);
    });*/

    this.searchInputValueSubject.pipe(
      filter(text => text.length >= this.CONFIG.minQueryLength),
      debounceTime(this.CONFIG.debounce),
      distinctUntilChanged()
    ).subscribe((query) => {
      this.isSearchPerformed = true;
      this.searchHandler.emit(query);
    });
  }

  onChange($event) {
    this.searchInputValueSubject.next($event);
  }

  public resetSearch() {
    this.isSearchPerformed = false;
    this.searchHandler.emit('');
  }

  clearPlaceholder() {
    if (this.query === this.placeHolderText) {
      this.query = '';
    }
  }

  ngOnDestroy() {
    if (this.inputTypeSubscription) {
      this.inputTypeSubscription.unsubscribe();
    }
  }
}
