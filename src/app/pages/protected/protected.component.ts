import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss'],
})
export class ProtectedComponent implements OnInit {
  groups: any[] = [];
  isDarkMode = false;

  constructor(
    private oAuthService: OAuthService,
    private groupService: GroupService
  ) {}

  ngOnInit() {
    this.loadGroups();
  }

  loadGroups(): void {
    this.groupService.getGroups().subscribe((data) => {
      this.groups = data;
    });
  }

  logout() {
    this.oAuthService.revokeTokenAndLogout();
  }
}
