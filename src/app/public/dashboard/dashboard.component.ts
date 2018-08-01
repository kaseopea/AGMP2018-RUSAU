import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../features/courses/services/courses.service';
import { FilterByPipe } from '../../features/courses/pipes/filter-by.pipe';
import { ActivatedRoute } from '@angular/router';
import { ICourse } from '../../features/courses/interfaces/icourse';

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

  constructor(private coursesService: CoursesService, filterByPipe: FilterByPipe, private route: ActivatedRoute) {
    this.filterByPipe = filterByPipe;
  }

  ngOnInit() {
    this.pageTitle = this.route.snapshot.data['title'];
    // Get courses data from CoursesService
    this.coursesService.getCourses().subscribe((data: ICourse[]) => {
      this.coursesData = data;
      this.isLoading = false;
    });
  }

  getFilteredCourses() {
    if (!this.coursesData || !this.coursesData.length) {
      return [];
    }
    return (this.filterCoursesBy) ? this.filterByPipe.transform(this.coursesData, this.filterCoursesBy, false) : this.coursesData;
  }

  onSearch(query: string): boolean {
    console.warn(`Trying to filter courses with "${query}" id`);
    this.filterCoursesBy = query;
    return false;
  }
}
