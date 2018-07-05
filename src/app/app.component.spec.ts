import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { CoursesModule } from './features/courses/courses.module';
import { PublicModule } from './public/public.module';
import { ProtectedModule } from './protected/protected.module';

import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        CoreModule,
        SharedModule,
        CoursesModule,
        PublicModule,
        ProtectedModule,
        RouterModule.forRoot(ROUTES)
      ],
      providers:[
        { provide: APP_BASE_HREF, useValue : '/' }
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
});
