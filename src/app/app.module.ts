import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthConfig, OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { ProtectedComponent } from './pages/protected/protected.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/myrealm', // myrealm é referente ao realm que vc criou 
  redirectUri: window.location.origin,
  clientId: 'myclient', //seu cliente do keycloack
  responseType: 'code',
  scope: 'openid profile email',
  requireHttps: false,
  disableAtHashCheck: true,
  showDebugInformation: true,
  strictDiscoveryDocumentValidation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    FormLoginComponent,
    ProtectedComponent,
    LoginComponent,
  ],
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
  }
}
