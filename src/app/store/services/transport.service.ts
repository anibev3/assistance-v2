import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlaceCoordinates } from '../models/transport/transport.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from './session/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TransportService {
  private baseUrl = 'https://blackcarxx.sherylux.com/api/v1';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  getAvailableVehicles(
    pickCoordinates: PlaceCoordinates,
    dropCoordinates: PlaceCoordinates,
    rideType: number
  ): Observable<any> {
    const authToken = this.authService.getToken(); // Obtenez le token à partir du service d'authentification

    // if (!authToken) {
    //   // Si le token n'existe pas, redirigez vers la page de connexion
    //   return this.router.navigate(['/login']);
    // }

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${authToken}`);

    return this.http.post<any>(
      `${this.baseUrl}/request/eta`,
      {
        pick_lat: pickCoordinates.pick_lat,
        pick_lng: pickCoordinates.pick_lng,
        drop_lat: dropCoordinates.drop_lat,
        drop_lng: dropCoordinates.drop_lng,
        ride_type: rideType,
      },
      { headers: headers }
    );
  }
}
