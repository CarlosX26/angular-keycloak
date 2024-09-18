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
  issuer: 'http://localhost:8080/realms/my-realm',
  redirectUri: window.location.origin,
  clientId: 'app_angular',
  responseType: 'code', // Usar o fluxo Authorization Code
  scope: 'openid profile email', // Scopes para obter o perfil do usuário
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
