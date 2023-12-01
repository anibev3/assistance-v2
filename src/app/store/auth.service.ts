// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginInfo } from './models/session/session.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private returnUrlKey = 'returnUrl';
  private tokenKey = 'authToken';

  setReturnUrl(url: string): void {
    localStorage.setItem(this.returnUrlKey, url);
  }

  getReturnUrl(): string | null {
    return localStorage.getItem(this.returnUrlKey);
  }

  clearReturnUrl(): void {
    localStorage.removeItem(this.returnUrlKey);
  }
  private baseUrl = 'https://myaccount.sherylux.com';
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

  private userKey = 'authUser';

  storeUserCredentials(token: string, user: any): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser(): any | null {
    const userString = localStorage.getItem(this.userKey);
    return userString ? JSON.parse(userString) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
