import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GoogleMap,
  GoogleMapsModule,
  MapDirectionsService,
} from '@angular/google-maps';
import { PlaceSearchResult } from './place-autocomplete.component';
import { BehaviorSubject, map } from 'rxjs';
import { LocalStorageService } from '../../../store/services/session/local-storage.service';

@Component({
  selector: 'app-map-display',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  template: `
    <div style="position: relative; height: 50vh;">
      <google-map
        #map
        [zoom]="zoom"
        width="100%"
        height="100%"
        [options]="mapOptions"
      >
        <!-- ... (autres balises) -->
        <map-directions-renderer
          *ngIf="directionsResult$ | async as directionResults"
          [directions]="directionResults"
        ></map-directions-renderer>
        <map-marker
          *ngFor="let markerPosition of markerPositions"
          [position]="markerPosition"
        ></map-marker>
      </google-map>
      <div *ngIf="directionsResult$ | async as directionResults">
        <div
          style="position: absolute; top: 10px; left: 10px; background-color: white; padding: 10px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);"
        >
          <strong class="text-center fs11">ROUTE ESTIMÉE:</strong><br />
          <span class="fs11"
            >{{
              (
                directionResults.routes[0].legs[0].duration!.value / 60
              ).toLocaleString('fr-FR', {
                maximumFractionDigits: 0
              })
            }}
            min |
            {{ directionResults.routes[0].legs[0].distance?.text }}</span
          >
        </div>
      </div>
    </div>
  `,
  styles: [``],
})
export class MapDisplayComponent implements OnInit {
  @ViewChild('map', { static: true })
  map!: GoogleMap;

  @Input()
  from: PlaceSearchResult | undefined;

  @Input()
  to: PlaceSearchResult | undefined;

  markerPositions: google.maps.LatLng[] = [];
  private isMapInitialized = false;
  zoom = 3;

  directionsResult$ = new BehaviorSubject<
    google.maps.DirectionsResult | undefined
  >(undefined);
  isOk: boolean = false;

  constructor(
    private directionsService: MapDirectionsService,
    private localStorageService: LocalStorageService
  ) {}

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
      this.isOk = true;
      // Si les données existent, utilisez-les pour afficher l'itinéraire
      this.map.mapInitialized.subscribe(() => {
        this.isMapInitialized = true;
        const fromLocation = new google.maps.LatLng(
          storedMapInfo.pick_lat,
          storedMapInfo.pick_lng
        );
        const toLocation = new google.maps.LatLng(
          storedMapInfo.drop_lat,
          storedMapInfo.drop_lng
        );
        this.gotoLocation(fromLocation);
        this.getDirections(fromLocation, toLocation);
      });
    }
  }

  ngOnChanges() {
    const fromLocation = this.from?.location;
    const toLocation = this.to?.location;
    console.log(fromLocation);
    console.log(toLocation);

    if (fromLocation && toLocation) {
      this.getDirections(fromLocation, toLocation);
    } else if (fromLocation) {
      this.gotoLocation(fromLocation);
    } else if (toLocation) {
      this.gotoLocation(toLocation);
    }
  }

  gotoLocation(location: google.maps.LatLng) {
    this.markerPositions = [location];

    // Vérifiez d'abord si la carte est initialisée
    if (this.isMapInitialized) {
      this.map.panTo(location);
      this.zoom = 17;
      this.directionsResult$.next(undefined);
    } else {
      // Si la carte n'est pas encore initialisée, attendez qu'elle le soit
      setTimeout(() => this.gotoLocation(location), 100);
    }
  }

  getDirections(
    fromLocation: google.maps.LatLng,
    toLocation: google.maps.LatLng
  ) {
    const request: google.maps.DirectionsRequest = {
      destination: toLocation,
      origin: fromLocation,
      travelMode: google.maps.TravelMode.DRIVING,
    };
    console.log(toLocation, fromLocation);

    this.directionsService
      .route(request)
      .pipe(map((response) => response.result))
      .subscribe((res) => {
        this.directionsResult$.next(res);
        this.markerPositions = [];
        console.log(this.directionsResult$.next(res));

        // Get the first route from the response
        const route = res!.routes[0];

        // Get the leg of the route
        const leg = route.legs[0];

        // Get the distance and duration of the leg
        const distance = leg?.distance?.text;
        const duration = leg?.duration?.text;

        // Log the distance and duration
        console.log(`Distance: ${distance}, Duration: ${duration}`);
      });

    console.log(this.markerPositions);
  }

  mapOptions = {
    disableDefaultUI: true, // Désactiver l'interface utilisateur par défaut
    zoomControl: false, // Désactiver le contrôle du zoom
    // Ajoutez d'autres options si nécessaire
  };
}
