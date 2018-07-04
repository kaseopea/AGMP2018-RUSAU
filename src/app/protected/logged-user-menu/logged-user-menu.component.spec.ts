import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedUserMenuComponent } from './logged-user-menu.component';
import { USERPROFILE_MOCK } from '../../mocks/userProfileMock';

describe('LoggedUserMenuComponent', () => {
  let component: LoggedUserMenuComponent;
  let fixture: ComponentFixture<LoggedUserMenuComponent>;
  const userData = `${USERPROFILE_MOCK.firstName} ${USERPROFILE_MOCK.lastName}`;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedUserMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedUserMenuComponent);
    component = fixture.componentInstance;
    component.userProfile = USERPROFILE_MOCK;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain proper firstname and lastname', () => {
    const elementContents = fixture.debugElement.nativeElement.textContent;
    expect(elementContents).toContain(userData);
  });
});
