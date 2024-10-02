import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
})
export class FormLoginComponent implements OnInit {
  ngOnInit(): void {}

  constructor(private router: Router, private oauthService: OAuthService) {}

  navigateToProtected() {
    this.router.navigate(['/protected']);
  }

  openPopup() {
    this.oauthService.initLoginFlowInPopup();
  }
}
