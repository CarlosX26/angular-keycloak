import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private oauthService: OAuthService, private router: Router) {
    this.startSessionCheck();
  }

  canActivate(): boolean {
    const token = this.oauthService.getAccessToken();
    const storedSessionState = sessionStorage.getItem('session_state');

    if (token && storedSessionState) {
      return true;
    } else {
      this.oauthService.initLoginFlow();
      return false;
    }
  }

  private startSessionCheck(): void {
    setInterval(() => {
      this.checkSessionState();
    }, 5000);
  }

  private checkSessionState(): void {
    const storedSessionState = sessionStorage.getItem('session_state');

    this.oauthService
      .loadUserProfile()
      .then(() => {
        const currentSessionState = sessionStorage.getItem('session_state');

        if (
          storedSessionState &&
          currentSessionState &&
          storedSessionState !== currentSessionState
        ) {
          this.oauthService.logOut();
        }
      })
      .catch(() => {
        this.oauthService.logOut();
      });
  }
}
