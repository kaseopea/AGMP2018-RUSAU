import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoursesService } from '../../features/courses/services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { ICourse } from '../../features/courses/interfaces/icourse';
import { APPCONFIG } from '../../config';
import { select, Store } from '@ngrx/store';
import { selectCoursesData, selectCoursesIsLoaded, selectCoursesIsLoading, State } from '../../reducers';
import { LoadCourses } from '../../actions/courses.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public courses$: Observable<ICourse[]>;
  public isLoading$: Observable<boolean>;
  public isLoaded$: Observable<boolean>;
  public pageTitle = '';
  public noMoreItems = false;
  private pageNumber = 1;
  private itemsPerPage = APPCONFIG.courses.itemsPerPage;
  private coursesSubscription;

  constructor(private coursesService: CoursesService,
              private route: ActivatedRoute,
              private store: Store<State>) {
  }

  ngOnInit() {
    this.pageTitle = this.route.snapshot.data['title'];

    this.courses$ = this.store.pipe(select(selectCoursesData));
    this.isLoading$ = this.store.pipe(select(selectCoursesIsLoading));
    this.isLoaded$ = this.store.pipe(select(selectCoursesIsLoaded));

    this.coursesSubscription = this.courses$.subscribe((data) => this.noMoreItems = ((data.length === 0) && (this.pageNumber > 1)));

    // Load courses event
    this.store.dispatch(new LoadCourses({
      pageNumber: this.pageNumber,
      count: this.itemsPerPage
    }));
  }


  onSearch(query: string): boolean {
    this.pageNumber = 1;
    this.store.dispatch(new LoadCourses({
      pageNumber: this.pageNumber,
      count: this.itemsPerPage,
      searchFor: query,
      hideLoader: true
    }));
    return false;
  }

  onLoadMore(pageNumber: number): boolean {
    this.pageNumber = pageNumber;
    this.store.dispatch(new LoadCourses({
      pageNumber: this.pageNumber,
      count: this.itemsPerPage,
      hideLoader: true
    }));
    return false;
  }

  ngOnDestroy() {
    if (this.coursesSubscription) {
      this.coursesSubscription.unsubscribe();
    }
  }

}
