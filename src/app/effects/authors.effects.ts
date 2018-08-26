import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, delay, map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { AuthorsActionTypes, LoadAuthorsFailed, LoadAuthorsSuccess } from '../actions/authors.actions';
import { AuthorsService } from '../features/courses/services/authors.service';


@Injectable()
export class AuthorsEffects {
  private REQUEST_DELAY = 500;

  constructor(private actions$: Actions,
              private authorsService: AuthorsService) {
  }

  // LOAD Authors
  @Effect()
  loadAuthors$: Observable<any> = this.actions$.pipe(
    ofType(AuthorsActionTypes.LoadAuthors),
    mergeMap(action => {
      return this.authorsService.getAuthors().pipe(
        delay(this.REQUEST_DELAY),
        map((data) => new LoadAuthorsSuccess(data)),
        catchError((err) => of(new LoadAuthorsFailed(err)))
      );
    })
  );
}
