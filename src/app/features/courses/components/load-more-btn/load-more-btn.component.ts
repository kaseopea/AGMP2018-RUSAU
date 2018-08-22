import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectCoursesIsLoading, State } from '../../../../reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-load-more-btn',
  templateUrl: './load-more-btn.component.html',
  styleUrls: ['./load-more-btn.component.css']
})
export class LoadMoreBtnComponent implements OnInit {
  @Input() noMoreItems;
  @Output() clickHandler = new EventEmitter<number>();
  public pageNumber = 1;
  public isLoading$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.isLoading$ = this.store.pipe(select(selectCoursesIsLoading));
  }

  ngOnInit() {
  }

  changePage(isPrev?: boolean): boolean {
    this.pageNumber = (isPrev) ? --this.pageNumber : ++this.pageNumber;
    this.clickHandler.emit(this.pageNumber);
    return false;
  }
}
