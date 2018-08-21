import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../features/courses/services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { ICourse } from '../../features/courses/interfaces/icourse';
import { APPCONFIG } from '../../config';
import { GlobalLoaderService } from '../../core/services/global-loader.service';
import { Store } from '@ngrx/store';
import { selectCoursesData, selectCoursesIsLoaded, selectCoursesIsLoading, selectUserSate, State } from '../../reducers';
import { LoadCourses } from '../../actions/courses.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public courses$: Observable<ICourse[]>;
  public isLoading$: Observable<boolean>;
  public isLoaded$: Observable<boolean>;
  public pageTitle = '';
  private firstPage = 1;
  private itemsPerPage = APPCONFIG.courses.itemsPerPage;
  private DATA_LOADING_DELAY = 1000;

  constructor(private coursesService: CoursesService,
              private route: ActivatedRoute,
              private loaderService: GlobalLoaderService,
              private store: Store<State>) {
  }

  ngOnInit() {
    this.pageTitle = this.route.snapshot.data['title'];

    this.courses$ = this.store.select(selectCoursesData);
    this.isLoading$ = this.store.select(selectCoursesIsLoading);
    this.isLoaded$ = this.store.select(selectCoursesIsLoaded);

    // this.coursesSubscription = this.getData().subscribe((data: ICourse[]) => {
    //   this.coursesData = data;
    // });

    // Load courses event
    this.store.dispatch(new LoadCourses({
      pageNumber: this.firstPage,
      count: this.itemsPerPage
    }));
  }


  onSearch(query: string): boolean {
    this.store.dispatch(new LoadCourses({
      pageNumber: this.firstPage,
      count: this.itemsPerPage,
      searchFor: query,
      hideLoader: true
    }));
    return false;
  }

  onLoadMore(pageNumber: number): boolean {
    this.store.dispatch(new LoadCourses({
      pageNumber: pageNumber,
      count: this.itemsPerPage,
      hideLoader: true
    }));
    return false;
  }

  onRefresh(isNeedUpdate: boolean) {
    if (isNeedUpdate) {
      this.store.dispatch(new LoadCourses({
        pageNumber: this.firstPage,
        count: this.itemsPerPage,
        hideLoader: true
      }));
    }
  }

}
