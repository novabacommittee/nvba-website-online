import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Admin accounts allowed to reach /admin/editMember.
// NOTE: this is a UI gate only. The real protection must be enforced by
// Firebase Realtime Database security rules restricting writes to /Members.
const ADMIN_EMAILS: string[] = ['it_secretary@novaba.org'];

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    let user: any = null;
    try { user = JSON.parse(localStorage.getItem('user')!); } catch { user = null; }

    const email = user && user.email ? String(user.email).toLowerCase() : '';
    const verified = user && user.emailVerified !== false;

    if (verified && ADMIN_EMAILS.indexOf(email) !== -1) {
      return true;
    }
    // Not an allowed admin -> bounce to sign-in (same pattern as AuthGuard).
    return this.router.parseUrl('sign-in');
  }
}
