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
  public noMoreItems = false;
  public isSearchInProgress = false;

  private itemsCount = APPCONFIG.courses.itemsPerPage;
  private pageNumber = 1;
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
    this.loadData();
  }


  onSearch(query: string): boolean {
    this.pageNumber = 1; // resetting page number
    this.loadData(query);
    return false;
  }

  /*
    onLoadMore(pageNumber: number): boolean {
      this.pageNumber = pageNumber;
      this.isSearchInProgress = true;

      setTimeout(() => {
        this.coursesSubscription = this.getData().subscribe((data: ICourse[]) => {
          this.isSearchInProgress = false;
          if (data.length) {
            this.coursesData = this.coursesData.concat(data);
          } else {
            this.noMoreItems = true;
          }
        });

      }, this.DATA_LOADING_DELAY);
      return false;
    }
    */
  onRefresh(isNeedUpdate: boolean) {
    if (isNeedUpdate) {
      this.loadData();
    }
  }

  // UTILS
  loadData(searchFor = '') {
    this.store.dispatch(new LoadCourses({
      pageNumber: this.pageNumber,
      count: APPCONFIG.courses.itemsPerPage,
      searchFor: (searchFor.length) ? searchFor : ''
    }));
  }

}
