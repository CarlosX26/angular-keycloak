import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthConfig, OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { ProtectedComponent } from './pages/protected/protected.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/my-realm',
  redirectUri: window.location.origin + '/',
  clientId: 'angular_app',
  responseType: 'code',
  scope: 'openid profile email',
  showDebugInformation: true,
  requireHttps: false,
  disableAtHashCheck: true,
  sessionChecksEnabled: true,
  strictDiscoveryDocumentValidation: false,
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  useSilentRefresh: true,
};

@NgModule({
  declarations: [AppComponent, ProtectedComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    OAuthModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private oauthService: OAuthService) {
    this.configure();
  }

  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    // this.oauthService.setupAutomaticSilentRefresh();
  }
}
