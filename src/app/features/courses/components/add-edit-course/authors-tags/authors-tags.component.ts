import { AfterViewInit, Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IAuthor } from '../../../interfaces/iauthor';
import { Store, select } from '@ngrx/store';
import { selectAuthorsList, State } from '../../../../../reducers';
import { LoadAuthors } from '../../../../../actions/authors.actions';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-authors-tags',
  templateUrl: './authors-tags.component.html',
  styleUrls: ['./authors-tags.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthorsTagsComponent),
      multi: true
    }
  ]
})
export class AuthorsTagsComponent implements ControlValueAccessor, AfterViewInit, OnInit, OnDestroy {
  public _authors: IAuthor[];
  public _authorsListFromServer: IAuthor[];
  public filteredAuthorsList: IAuthor[] = [];
  public authorsForm = new FormGroup({
    addAuthor: new FormControl('')
  });
  private authorsList$: Observable<IAuthor[]>;
  private addAuthorTagSubscription;
  private onChange: (value: IAuthor[]) => void;
  private onTouched = () => {
  };

  private CONFIG = {
    debounce: 1000,
    minQueryLength: 3
  };

  constructor(private store: Store<State>) {
  }

  get addAuthor() {
    return this.authorsForm.get('addAuthor');
  }

  ngOnInit() {
    this.authorsList$ = this.store.pipe(select(selectAuthorsList));
    this.store.dispatch(new LoadAuthors());
    this.authorsList$.subscribe(data => this._authorsListFromServer = data);
  }

  ngAfterViewInit() {
    this.addAuthorTagSubscription = this.addAuthor.valueChanges
      .pipe(
        filter((text) => text.length >= this.CONFIG.minQueryLength),
        debounceTime(this.CONFIG.debounce),
        distinctUntilChanged()
      )
      .subscribe((query) => {
        this.filteredAuthorsList = [];
        if (this._authorsListFromServer.length) {
          this.filteredAuthorsList = this._authorsListFromServer.filter((author) => author.name.toLowerCase().includes(query));
        }
      });

  }

  onTagDelete(tagId: string) {
    this._authors = this._authors.filter((item) => item.id !== tagId);
    this.onChange(this._authors);
  }

  onAddAuthorToList(author: IAuthor) {
    // todo: add check if author is already in a list
    this._authors.push(author);

    this.onChange(this._authors);

    // clear filtered results
    this.filteredAuthorsList = [];
    this.addAuthor.setValue('');
  }

  writeValue(authors: IAuthor[]): void {
    this._authors = authors;
  }

  registerOnChange(onChange: (value: IAuthor[]) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  ngOnDestroy() {
    if (this.addAuthorTagSubscription) {
      this.addAuthorTagSubscription.unsubscribe();
    }
  }

}
