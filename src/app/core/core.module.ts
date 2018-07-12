import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LogoComponent } from './logo/logo.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ProtectedModule } from '../protected/protected.module';
import { getLocalStorage } from './services/getLocalStorage.factory';

@NgModule({
  imports: [
    CommonModule,
    ProtectedModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    BreadcrumbsComponent
  ],
  providers: [
    {
      provide: 'LOCALSTORAGE',
      useFactory: getLocalStorage
    }
  ]
})
export class CoreModule {
}
