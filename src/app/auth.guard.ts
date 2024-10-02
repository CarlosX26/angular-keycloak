// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { OAuthService } from 'angular-oauth2-oidc';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard {
//   constructor(private oauthService: OAuthService, private router: Router) {}

//   canActivate(): boolean {
//     console.log('hasValidAccessToken', this.hasValidAccessToken());

//     if (this.hasValidAccessToken()) {
//       return true;
//     } else {
//       this.oauthService.initLoginFlow();
//       return false;
//     }
//   }

//   hasValidAccessToken() {
//     const token = this.oauthService.getAccessToken();

//     if (!token) {
//       return false;
//     }

//     const expiresAt = this.oauthService.getAccessTokenExpiration();

//     if (!expiresAt) {
//       return false;
//     }

//     const now = Date.now();

//     console.log('🚀 ~ AuthGuard ~ hasValidAccessToken', { now, expiresAt });

//     return expiresAt >= now;
//   }
// }

import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

export const authGuard: CanActivateFn = (route, state) => {
  const oauthService = inject(OAuthService);
  if (oauthService.hasValidAccessToken()) {
    console.log('Access granted');
    return true;
  } else {
    oauthService.initLoginFlow();
    // oauthService.initImplicitFlowInPopup();
    return false;
  }
};
