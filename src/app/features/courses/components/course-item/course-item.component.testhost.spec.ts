import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import { By } from '@angular/platform-browser';

import { ICourse } from '../../interfaces/icourse';
import { CourseItemComponent } from './course-item.component';
import { COURSES_MOCK } from '../../../../mocks/coursesMock';

@Component({
    template: `<app-course-item [courseItem]="courseItem" (delHandler)="onDeleted($event)"></app-course-item>`
})
class TestHostComponent {
    public courseItem: ICourse = COURSES_MOCK[0];
    public deletedId: number;
    public onDeleted(id: number) {
        this.deletedId = id;
    }
}
describe('CourseItemComponentTestHost', () => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let debugEl: DebugElement;
    const courseMock: ICourse = COURSES_MOCK[0];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CourseItemComponent, TestHostComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.componentInstance;

        // find the course item DebugElement and element
        debugEl  = fixture.debugElement;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display course title', () => {
        const titleEl = debugEl.query(By.css('.card-title')).nativeElement;
        expect(titleEl.textContent).toContain(courseMock.title);
    });

    it('should raise delete event when clicked', () => {
        const deleteBtnEl = debugEl.query(By.css('.btn-delete'));
        deleteBtnEl.triggerEventHandler('click', null);
        expect(component.deletedId).toEqual(courseMock.id);
    });
});
