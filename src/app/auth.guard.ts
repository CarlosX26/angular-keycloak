// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { OAuthService } from 'angular-oauth2-oidc';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(private oauthService: OAuthService, private router: Router) {
//     this.startSessionCheck();
//   }

//   canActivate(): boolean {
//     const token = this.oauthService.getAccessToken();
//     const storedSessionState = sessionStorage.getItem('session_state');

//     if (token && storedSessionState) {
//       return true;
//     } else {
//       this.oauthService.initLoginFlow();
//       return false;
//     }
//   }

//   private startSessionCheck(): void {
//     setInterval(() => {
//       this.checkSessionState();
//     }, 5000);
//   }

//   private checkSessionState(): void {
//     const storedSessionState = sessionStorage.getItem('session_state');

//     this.oauthService
//       .loadUserProfile()
//       .then(() => {
//         const currentSessionState = sessionStorage.getItem('session_state');

//         if (
//           storedSessionState &&
//           currentSessionState &&
//           storedSessionState !== currentSessionState
//         ) {
//           // this.oauthService.logOut();
//           this.oauthService.initLoginFlowInPopup();
//         }
//       })
//       .catch(() => {
//         // this.oauthService.logOut();
//         this.oauthService.initLoginFlowInPopup();
//       });
//   }
// }

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private isPopupOpen = false;

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
      this.checkTokenExpiration();
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
          this.openLoginPopup();
        }
      })
      .catch(() => {
        this.openLoginPopup();
      });
  }

  private checkTokenExpiration(): void {
    if (!this.oauthService.hasValidAccessToken()) {
      this.openLoginPopup();
    }
  }

  private openLoginPopup(): void {
    if (!this.isPopupOpen) {
      this.isPopupOpen = true;
      this.showOverlay();
      this.oauthService.initLoginFlowInPopup().finally(() => {
        console.log('Login flow in popup finished.');
        this.hideOverlay();
        this.isPopupOpen = false;
      });
    }
  }

  private showOverlay(): void {
    const overlay = document.createElement('div');
    overlay.id = 'login-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '10000';
    document.body.appendChild(overlay);
  }

  private hideOverlay(): void {
    const overlay = document.getElementById('login-overlay');
    if (overlay) {
      overlay.remove();
    }
  }
}
