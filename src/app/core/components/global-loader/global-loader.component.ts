import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectUIIsLoading, State } from '../../../reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-global-loader',
  templateUrl: './global-loader.component.html',
  styleUrls: ['./global-loader.component.css']
})
export class GlobalLoaderComponent implements OnInit {
  public show$: Observable<boolean>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.show$ = this.store.pipe(
      select(selectUIIsLoading)
    );
  }

}
