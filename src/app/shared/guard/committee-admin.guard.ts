import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { EXECUTIVE_COMMITTEE_ADMIN, currentUserEmail, currentUserVerified } from './admin-groups';

// Guards /admin/membershipreports: allowed only for the Executive Committee Admin group.
@Injectable({ providedIn: 'root' })
export class CommitteeAdminGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (currentUserVerified() && EXECUTIVE_COMMITTEE_ADMIN.indexOf(currentUserEmail()) !== -1) {
      return true;
    }
    return this.router.parseUrl('sign-in');
  }
}
