import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../session/local-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'chemin-vers-votre-api';
  private assistanceBaseUrl = 'https://ci.airportvip.sherylux.com';
  private transportBaseUrl = 'https://blackcarxx.sherylux.com/api/v1';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  callApiAfterPaymentSuccess(sessionId: string): Observable<any> {
    // Vous pouvez personnaliser cette URL en fonction de votre API
    const apiEndpoint = `${this.apiUrl}/api/call-after-payment-success`;

    // Effectuez la requête HTTP avec l'identifiant de session
    return this.http.post(apiEndpoint, { session_id: sessionId });
  }

  getTransportHistory(): Observable<any> {
    const authToken = this.authService.getToken(); // Obtenez le token à partir du service d'authentification

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${authToken}`);

    return this.http.get<any>(`${this.transportBaseUrl}/request/history`, {
      headers: headers,
    });
  }

  getAssistanceHistory(): Observable<any> {
    const authToken = this.authService.getToken(); // Obtenez le token à partir du service d'authentification

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${authToken}`);

    return this.http.get<any>(`${this.assistanceBaseUrl}/api/v1/reservations`, {
      headers: headers,
    });
  }

  getAssistanceDetail(id: string): Observable<any> {
    const authToken = this.authService.getToken(); // Obtenez le token à partir du service d'authentification

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${authToken}`);

    return this.http.get<any>(
      `${this.assistanceBaseUrl}/api/v1/reservations/${id}`,
      {
        headers: headers,
      }
    );
  }
}
