import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { APPCONFIG } from '../../../config';
import { IAuthor } from '../interfaces/iauthor';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private BASE_URL = APPCONFIG.apis.authors;
  private REQUEST_DELAY = 500;

  constructor(private http: HttpClient) { }

  public getAuthors(): Observable<IAuthor[]> {
    return this.http.get<IAuthor[]>(`${this.BASE_URL}`).pipe(delay(this.REQUEST_DELAY));
  }
}
