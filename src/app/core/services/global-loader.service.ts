import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IGlobalLoaderState } from '../interfaces/iGlobalLoaderState';

@Injectable({
  providedIn: 'root'
})
export class GlobalLoaderService {
  private loaderSubject = new Subject<IGlobalLoaderState>();
  public loaderState = this.loaderSubject.asObservable();

  constructor() {
  }

  show() {
    this.loaderSubject.next(<IGlobalLoaderState>{
      show: true
    });
  }

  hide() {
    this.loaderSubject.next(<IGlobalLoaderState>{
      show: false
    });
  }
}
