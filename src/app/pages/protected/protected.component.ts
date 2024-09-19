import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss'],
})
export class ProtectedComponent {
  constructor(private oAuthService: OAuthService) {}

  logout() {
    this.oAuthService.logOut();
  }
}
