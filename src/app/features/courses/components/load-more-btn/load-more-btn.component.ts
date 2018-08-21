import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCoursesIsLoading, State } from '../../../../reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-load-more-btn',
  templateUrl: './load-more-btn.component.html',
  styleUrls: ['./load-more-btn.component.css']
})
export class LoadMoreBtnComponent implements OnInit {
  @Input() inProgress;
  @Input() noMoreItems;
  @Output() clickHandler = new EventEmitter<number>();
  public isLoading$: Observable<boolean>;
  public pageNumber = 1;

  constructor(private store: Store<State>) {
    this.isLoading$ = this.store.select(selectCoursesIsLoading);
  }

  ngOnInit() {
  }
  loadMore(): boolean {
    if (this.inProgress) {
      return false;
    }

    this.pageNumber++;
    this.clickHandler.emit(this.pageNumber);

    return false;
  }
}
