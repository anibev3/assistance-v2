import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginInfo } from '../../models/session/session.model';

@Injectable({
  providedIn: 'root',
})
export class PaiementService {
  private baseUrl = 'https://payment.sherylux.com';
  // private authToken = 'votre_token';
  constructor(private http: HttpClient) {}

  login(loginInfo: LoginInfo): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // .set('Authorization', `Bearer ${this.authToken}`);

    return this.http.post<any>(
      `${this.baseUrl}/api/auth/login`,
      {
        email: loginInfo.email,
        password: loginInfo.password,
      },
      { headers: headers }
    );
  }
}
