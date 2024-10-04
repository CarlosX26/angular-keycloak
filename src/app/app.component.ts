import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'app-login';
  constructor(private oauthService: OAuthService) {}

  ngOnInit() {
    this.oauthService.events.subscribe((ev) => console.log('event=> ', ev));
  }
}
