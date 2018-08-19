import { Component, Inject, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { CoursesService } from '../../features/courses/services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { ICourse } from '../../features/courses/interfaces/icourse';
import { APPCONFIG } from '../../config';
import { GlobalLoaderService } from '../../core/services/global-loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public coursesData: ICourse[];
  public filterCoursesBy;
  public pageTitle = '';
  public isLoading = true;
  public isSearchInProgress = false;
  public pageNumber = 1;
  public itemsCount = APPCONFIG.courses.itemsPerPage;
  public noMoreItems = false;
  private coursesSubscription;
  private DATA_LOADING_DELAY = 1000;

  constructor(private coursesService: CoursesService,
              private route: ActivatedRoute,
              private loaderService: GlobalLoaderService) {
  }

  ngOnInit() {
    this.pageTitle = this.route.snapshot.data['title'];
    this.isLoading = true;
    // this.loaderService.show();
    this.coursesSubscription = this.getData().subscribe((data: ICourse[]) => {
      this.coursesData = data;
      this.isLoading = false;
      // this.loaderService.hide();
    });
  }


  onSearch(query: string): boolean {
    this.filterCoursesBy = query;
    this.pageNumber = 1; // resetting page number
    this.isLoading = true;
    this.coursesSubscription = this.getData().subscribe((data: ICourse[]) => {
      this.coursesData = data;
      this.isLoading = false;
    });
    return false;
  }

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

  onRefresh(isNeedUpdate: boolean) {
    if (isNeedUpdate) {
      this.isLoading = true;
      this.loaderService.show();
      this.coursesSubscription = this.getData().subscribe((data: ICourse[]) => {
        this.coursesData = data;
        this.isLoading = false;
        this.loaderService.hide();
      });
    }
  }


  private getData() {
    return this.coursesService.getCoursesWithParams({
      pageNumber: this.pageNumber,
      count: this.itemsCount,
      searchFor: this.filterCoursesBy
    });
  }

  ngOnDestroy() {
    if (this.coursesSubscription) {
      this.coursesSubscription.unsubscribe();
    }
  }
}
