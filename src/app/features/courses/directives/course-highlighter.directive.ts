import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appCourseHighlighter]'
})
export class CourseHighlighterDirective implements OnInit {
  @Input() appCourseHighlighter: string;
  private HIGLIGHT_CLASSES = {
    fresh: 'fresh-highlight',
    upcoming: 'upcoming-highlight'
  };
  private prevDateLimit = 300; // changed condition to match new data fro json server

  constructor(private element: ElementRef) {

  }

  ngOnInit() {
    const highlightClassname = this.processDate(new Date(this.appCourseHighlighter));
    if (highlightClassname) {
        this.element.nativeElement.classList.add(highlightClassname);
    }
  }

  private processDate(date) {
    const currentDate = new Date(Date.now());
    const timeDiff = date.getTime() - currentDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if ((daysDiff <= 0) && (Math.abs(daysDiff) <= this.prevDateLimit)) {
      return this.HIGLIGHT_CLASSES.fresh;
    } else if (daysDiff > 0) {
      return this.HIGLIGHT_CLASSES.upcoming;
    } else {
      return null;
    }
  }
}
