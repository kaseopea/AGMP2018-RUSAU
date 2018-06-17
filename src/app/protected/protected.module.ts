import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggedUserMenuComponent } from './logged-user-menu/logged-user-menu.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [LoggedUserMenuComponent, UserProfileComponent],
  declarations: [LoggedUserMenuComponent, UserProfileComponent]
})
export class ProtectedModule { }
