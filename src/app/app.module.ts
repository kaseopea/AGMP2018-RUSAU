import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { CoursesModule } from './features/courses/courses.module';
import { PublicModule } from './public/public.module';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { ProtectedModule } from './protected/protected.module';
import { AuthInterceptor } from './core/services/authInterceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    CoursesModule,
    PublicModule,
    ProtectedModule,
    FormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
