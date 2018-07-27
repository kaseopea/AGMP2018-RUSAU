import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsTagsComponent } from './authors-tags.component';

describe('AuthorsTagsComponent', () => {
  let component: AuthorsTagsComponent;
  let fixture: ComponentFixture<AuthorsTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorsTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
