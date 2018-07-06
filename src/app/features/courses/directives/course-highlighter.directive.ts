import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appCourseHighlighter]'
})
export class CourseHighlighterDirective implements OnInit {
  @Input() appCourseHighlighter: Date;
  private HIGLIGHT_CLASSES = {
    fresh: 'fresh-highlight',
    upcoming: 'upcoming-highlight'
  };
  private prevDateLimit = 14;

  constructor(private element: ElementRef) {

  }

  ngOnInit() {
    const highlightClassname = this.processDate(this.appCourseHighlighter);
    if (highlightClassname) {
        this.element.nativeElement.classList.add(highlightClassname);
    }
  }

  private processDate(date) {
    const currentDate = new Date(Date.now());
    const prevLimit = new Date(Date.now());
    prevLimit.setDate(prevLimit.getDate() - this.prevDateLimit);

    if ((date < currentDate) && (date >= prevLimit)) {
      return this.HIGLIGHT_CLASSES.fresh;
    } else if (date > currentDate) {
      return this.HIGLIGHT_CLASSES.upcoming;
    } else {
      return null;
    }
  }
}
