import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private apiUrl = 'http://127.0.0.1:8082/v1';

  constructor(private http: HttpClient, private oAuthService: OAuthService) {}

  getGroups(): Observable<any> {
    const token = this.oAuthService.getAccessToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    console.log('AQUIO >>>>>>>>>>>>>>>' + token);
    return this.http.get<any>(`${this.apiUrl}/group`, { headers });
  }
  
  getRoute(): Observable<any> {
    const token = this.oAuthService.getAccessToken();
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    console.log('AQUIO 2.0 >>>>>>>>>>>>>>>' + token);

    return this.http.get<any>(`${this.apiUrl}/company`, { headers });
  }
}
