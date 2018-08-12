import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LogoComponent } from './logo/logo.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ProtectedModule } from '../protected/protected.module';
import { getLocalStorage } from './services/getLocalStorage.factory';
import { RouterModule } from '@angular/router';
import { getWindow } from './services/getWindow.factory';
import { getDocument } from './services/getDocumentFactory';
import { GlobalLoaderComponent } from './components/global-loader/global-loader.component';

@NgModule({
  imports: [
    CommonModule,
    ProtectedModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    LogoComponent,
    FooterComponent,
    BreadcrumbsComponent,
    LogoComponent,
    GlobalLoaderComponent
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    BreadcrumbsComponent,
    GlobalLoaderComponent
  ],
  providers: [
    {
      provide: 'LOCALSTORAGE',
      useFactory: getLocalStorage
    },
    {
      provide: 'WINDOW',
      useFactory: getWindow
    },
    {
      provide: 'DOCUMENT',
      useFactory: getDocument
    }
  ]
})
export class CoreModule {
}
