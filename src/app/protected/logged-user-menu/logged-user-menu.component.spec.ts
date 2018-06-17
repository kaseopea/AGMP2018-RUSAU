import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedUserMenuComponent } from './logged-user-menu.component';

describe('LoggedUserMenuComponent', () => {
  let component: LoggedUserMenuComponent;
  let fixture: ComponentFixture<LoggedUserMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedUserMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedUserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
