import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { EXECUTIVE_COMMITTEE_IT_ADMIN, currentUserEmail, currentUserVerified } from './admin-groups';

// Guards /admin/managemember: allowed only for the Executive Committee ID Admin group.
// NOTE: UI/route gate only. Real /Members write protection must be enforced by
// Firebase Realtime Database security rules.
@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (currentUserVerified() && EXECUTIVE_COMMITTEE_IT_ADMIN.indexOf(currentUserEmail()) !== -1) {
      return true;
    }
    return this.router.parseUrl('sign-in');
  }
}
