import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { LocalStorageService } from '../session/local-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { startWith, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'chemin-vers-votre-api';
  private assistanceBaseUrl = 'https://ci.airportvip.sherylux.com';
  private transportBaseUrl = 'https://blackcarxx.sherylux.com/api/v1';
  private refreshInterval = 1 * 60 * 1000; // 30 minutes en millisecondes

  success: string = '✅';
  failed: string = '❌';

  airports: any = {}; // Adapté selon votre structure de données
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.refreshAirports();
    this.setupRefreshInterval();
  }

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

  // ================================================================================
  //  DEBUT APPEL DE L'API DE RECUPERATION DES AEROPORTS
  // ================================================================================
  private refreshAirports(): void {
    this.http.get<any[]>(`${this.assistanceBaseUrl}/api/v1/airports`).subscribe(
      (data) => {
        this.airports = data;
        this.localStorageService.setItem('airports', data);
        console.log(this.airports);
      },
      (error) => {
        console.error('Erreur lors de la récupération des aéroports :', error);
      }
    );
  }

  private setupRefreshInterval(): void {
    interval(this.refreshInterval)
      .pipe(
        startWith(0), // Démarrez immédiatement
        switchMap(() =>
          this.http.get<any[]>(`${this.assistanceBaseUrl}/api/v1/airports`)
        )
      )
      .subscribe(
        (data) => {
          this.airports = data;
          this.localStorageService.setItem('airports', data);

          console.log(
            'Liste des aéroports mise à jour automatiquement: ',
            data
          );
        },
        (error) => {
          console.error(
            'Erreur lors de la mise à jour automatique des aéroports :',
            error
          );
        }
      );
  }

  getAirports(): any[] {
    return this.airports;
  }

  // ================================================================================
  //  DEBUT APPEL DE L'API DE RECUPERATION DE SINGLE AEROPORTS
  // ================================================================================

  // return {
  //   emoji: this.success,
  //   data: data,
  // };

  getSingleAirports(id: string): Observable<any> {
    const authToken = this.authService.getToken(); // Obtenez le token à partir du service d'authentification

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${authToken}`);

    return this.http.get<any>(
      `${this.assistanceBaseUrl}/api/v1/airports/${id}`,
      {
        headers: headers,
      }
    );
  }

  // ================================================================================

  // ================================================================================
  //  DEBUT APPEL DE L'API DE RESERVATION TRANSPORT
  // ================================================================================

  initiateTransportReservation(form_data: any[]): Observable<any> {
    const token = localStorage.getItem('authToken');
    // HTTP headers
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      accept: 'application/json',
    });

    console.log('======> la formData de stripe: ', form_data);

    return this.http.post<any>(
      `${this.transportBaseUrl}/request/create`,
      form_data,
      { headers }
    );
  }

  // ================================================================================

  // ================================================================================
  //  DEBUT APPEL DE L'API DE RESERVATION TRANSPORT
  // ================================================================================

  initiateAssistanceReservation(form_data: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    // HTTP headers
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      accept: 'application/json',
    });

    console.log('======> la formData de stripe: ', form_data);

    return this.http.post<any>(
      `${this.assistanceBaseUrl}/api/v1/reservations`,
      form_data,
      { headers }
    );
  }

  // ================================================================================
}
