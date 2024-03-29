import { Injectable, inject } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateFn,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
class PermissionsService {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const router = inject(Router);   
    const isAuthenticated = this.checkIfUserIsAuthenticated();
    if (!isAuthenticated) {
      router.navigate(['login']);
      return false;
    }

    return true;
  }
  private checkIfUserIsAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;
  }
}

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(PermissionsService).canActivate(next, state);
};
