import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate() {
    return this.authService.IsAuthenticated().pipe(
      map((isAuthenticated) => (isAuthenticated) ? isAuthenticated : (this.router.navigateByUrl('/login'), isAuthenticated))
    );
  }
}
