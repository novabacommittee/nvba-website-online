import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { EXECUTIVE_COMMITTEE, currentUserEmail, currentUserVerified } from './admin-groups';

// Guards the admin reporting pages: allowed only for the Executive Committee group.
@Injectable({ providedIn: 'root' })
export class CommitteeGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (currentUserVerified() && EXECUTIVE_COMMITTEE.indexOf(currentUserEmail()) !== -1) {
      return true;
    }
    return this.router.parseUrl('sign-in');
  }
}
