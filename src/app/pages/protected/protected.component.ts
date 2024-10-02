import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss'],
})
export class ProtectedComponent {
  constructor(private oAuthService: OAuthService) {}

  async logout() {
    // const logoutUrl = this.oAuthService.logoutUrl!;
    // this.oAuthService.logOut();
    // window.location.href = logoutUrl;
    await this.oAuthService.revokeTokenAndLogout();
  }
}
