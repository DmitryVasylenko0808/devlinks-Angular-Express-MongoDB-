import {inject, Injectable} from "@angular/core";
import {CanActivateFn, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService,
              private router: Router) {
  }
  canActivate(): boolean {
    if(this.authService.isAuthorized()) {
      return true;
    } else {
      alert('You are not authorized');
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}

export const canActivateProfileDetails: CanActivateFn = (route, state) => {
  return inject(AuthGuard).canActivate();
}

export const canActivatePreview: CanActivateFn = (route, state) => {
  return inject(AuthGuard).canActivate();
}
