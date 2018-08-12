import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-load-more-btn',
  templateUrl: './load-more-btn.component.html',
  styleUrls: ['./load-more-btn.component.css']
})
export class LoadMoreBtnComponent implements OnInit, OnDestroy {
  @Input() inProgress;
  @Input() noMoreItems;
  @Output() clickHandler = new EventEmitter<number>();
  public pageNumber = 1;
  private loadDataTimeout: any;
  private timeoutDuration: 2000;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    clearTimeout(this.loadDataTimeout);
  }

  loadMore(): boolean {
    if (this.inProgress) {
      return false;
    }
    this.loadDataTimeout = setTimeout(() => {
      this.pageNumber++;
      this.clickHandler.emit(this.pageNumber);
    }, this.timeoutDuration);

    return false;
  }
}
