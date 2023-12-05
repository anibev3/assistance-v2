import { Component, inject } from '@angular/core';
import {
  PlaceAutocompleteComponent,
  PlaceSearchResult,
} from '../components/place-autocomplete.component';
import { PlaceCardComponent } from '../components/place-card.component';
import { MapDisplayComponent } from '../components/map-display.component';
import { NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
// import { TransportService } from '../../../store/services/transport.service';
// import { PlaceCoordinates } from '../../../store/models/transport/transport.model';
// import { AuthService } from '../../../store/auth.service';
import { Router } from '@angular/router';
// import { LocalStorageService } from '../../../store/services/session/local-storage.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { PlaceCoordinates } from '../../../../store/models/transport/transport.model';
import { TransportService } from '../../../../store/services/transport.service';
import { AuthService } from '../../../../store/auth.service';
import { LocalStorageService } from '../../../../store/services/session/local-storage.service';

@Component({
  selector: 'app-map-start-reservation-transport',
  standalone: true,
  imports: [
    MatToolbarModule,
    PlaceAutocompleteComponent,
    PlaceCardComponent,
    MapDisplayComponent,
    NgIf,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './map-start-reservation-transport.component.html',
  styles: [
    `
      .input-area {
        display: flex;
        gap: 16px;
        align-items: center;
      }

      .display-area {
        display: flex;
        width: 100%;
        gap: 16px;
        align-items: flex-start;
        height: calc(100vh - 180px);

        > div {
          width: 30%;
          overflow: auto;
          padding: 8px;
          height: inherit;

          > * {
            margin-bottom: 16px;
          }
        }

        > app-map-display {
          width: 70%;
          height: inherit;
        }
      }

      .display-area[hidden] {
        display: none;
      }

      .container {
        padding: 24px;
      }

      app-place-autocomplete {
        width: 300px;
      }
    `,
  ],
})
export class MapStartReservationTransportComponent {
  fromValue: PlaceSearchResult = { address: '' };
  toValue: PlaceSearchResult = { address: '' };

  date_depart: string = '';
  heure_depart: string = '';

  public placeCoordinates: PlaceCoordinates | undefined;

  constructor(
    private transportService: TransportService,
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.date_depart, this.heure_depart;
  }

  ngOnInit(): void {
    // Récupérez les données depuis le stockage
    const storedMapInfo = this.localStorageService.getItem('tpMapInfo');
    if (
      storedMapInfo &&
      storedMapInfo.drop_lat != 0 &&
      storedMapInfo.drop_lng != 0 &&
      storedMapInfo.pick_lat != 0 &&
      storedMapInfo.pick_lng != 0
    ) {
      console.log('On est là ==================>', storedMapInfo.date_depart);

      this.date_depart = storedMapInfo.date_depart;
      this.heure_depart = storedMapInfo.heure_depart;
    }
  }

  async storeAndGetAvaillableCar(): Promise<void> {
    console.log('===============>', this.fromValue);
    this.placeCoordinates = {
      pick_lat: this.fromValue.location?.lat() ?? 0,
      pick_lng: this.fromValue.location?.lng() ?? 0,
      drop_lat: this.toValue.location?.lat() ?? 0,
      drop_lng: this.toValue.location?.lng() ?? 0,
      ride_type: 1,
      date_depart: this.date_depart,
      heure_depart: this.heure_depart,
      fromAdress: this.fromValue.address,
      toAdress: this.toValue.address,
      fromPicture: this.fromValue.imageUrl,
      toPicture: this.toValue.imageUrl,
      fromName: this.fromValue.name,
      toName: this.toValue.name,
    };
    await this.localStorageService.setItem('tpMapInfo', this.placeCoordinates);
    console.log(this.placeCoordinates);

    if (this.authService.isLoggedIn()) {
      console.log('Date et heure : ' + this.date_depart, this.heure_depart);
      console.log(
        'La valeur this.placeCoordinates : ' +
          JSON.stringify(this.placeCoordinates)
      );
      this.transportService
        .getAvailableVehicles(this.placeCoordinates, this.placeCoordinates, 1)
        .subscribe(async (response) => {
          console.log("Réponse de l'api : " + JSON.stringify(response));
          await this.localStorageService.setItem('availableCar', response.data);
          this.router.navigate(['/car']).then(() => {
            window.location.reload();
          });
        });
    } else {
      // L'utilisateur n'est pas connecté, rediriger vers la page de connexion
      // Vous pouvez utiliser le service Router pour effectuer la redirection
      // N'oubliez pas d'injecter le service Router dans le constructeur
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
    }
  }
}
