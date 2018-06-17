import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { CoursesModule } from './features/courses/courses.module';
import { PublicModule } from './public/public.module';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { ProtectedModule } from './protected/protected.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    CoursesModule,
    PublicModule,
    ProtectedModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
