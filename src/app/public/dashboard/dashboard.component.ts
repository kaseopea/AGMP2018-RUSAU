import { Component, Inject, OnInit } from '@angular/core';
import { CoursesService } from '../../features/courses/services/courses.service';
import { FilterByPipe } from '../../features/courses/pipes/filter-by.pipe';
import { ActivatedRoute } from '@angular/router';
import { ICourse } from '../../features/courses/interfaces/icourse';
import { APPCONFIG } from '../../config';
import { ILocalStorage } from '../../core/interfaces/iLocalStorage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public coursesData: ICourse[];
  public filterCoursesBy: string;
  public filterByPipe: FilterByPipe;
  public pageTitle = '';
  public isLoading = true;
  public isSearchInProgress = false;
  public pageNumber = 1;
  public itemsCount = APPCONFIG.courses.itemsPerPage;
  public noMoreItems = false;

  constructor(@Inject('WINDOW') private window: any,
              @Inject('DOCUMENT') private document: any,
              private coursesService: CoursesService,
              filterByPipe: FilterByPipe,
              private route: ActivatedRoute) {
    this.filterByPipe = filterByPipe;
  }

  ngOnInit() {
    this.pageTitle = this.route.snapshot.data['title'];
    this.isLoading = true;
    this.getData().subscribe((data: ICourse[]) => {
      console.warn(data);
      this.coursesData = data;
      this.isLoading = false;
    });
  }

  onSearch(query: string): boolean {
    console.warn(`Trying to filter courses with "${query}" id`);
    this.filterCoursesBy = query;
    return false;
  }

  onLoadMore(pageNumber: number): boolean {
    this.pageNumber = pageNumber;
    this.isSearchInProgress = true;

    setTimeout(() => {
      this.getData().subscribe((data: ICourse[]) => {
        this.isSearchInProgress = false;
        if (data.length) {
          this.coursesData = this.coursesData.concat(data);
          setTimeout(() => {
            this.window.scrollTo({
              top: this.document.body.scrollHeight
            });
          }, 0);
        } else {
          this.noMoreItems = true;
        }
      });

    }, 1000);
    return false;
  }


  private getData() {
    return this.coursesService.getCoursesWithParams({
      pageNumber: this.pageNumber,
      count: this.itemsCount
    });
  }
}
