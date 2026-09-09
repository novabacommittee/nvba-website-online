import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from "../../shared/services/auth.service";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    public authService: AuthService,
    public router: Router
  ){ }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    if(this.authService.isLoggedIn !== true) {
      // Block the guarded route AND redirect to sign-in. Returning a UrlTree
      // cancels this navigation cleanly instead of allowing it (return true)
      // and relying on a side-effect navigation to override it.
      return this.router.parseUrl('sign-in');
    }
    return true;
  }
}