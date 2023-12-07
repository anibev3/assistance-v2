import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../../../../store/services/session/local-storage.service';
import { ApiService } from '../../../../store/services/data/api.service';
import { NavigationService } from '../../../../store/helpers/navigation.service';

@Component({
  selector: 'app-rs-arrivee',
  template: `
    <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
      <div *ngIf="loading">
        <div class="align-self-center align-item-center">
          <div class="spinner-border color-highlight" role="status"></div>
          <p>Chargement en cours...</p>
        </div>
      </div>
      <div *ngIf="!loading">
        <div class="mb-2 rounded-s" style="margin: 10px;">
          <div class="" style="margin-top: 20px">
            <div class="input-style-2 input-required">
              <span class="input-style-1-active">Aéroport d'arrivée</span>
              <select
                class="form-control filled"
                id="arrival_airport_id"
                formControlName="arrival_airport_id"
                required
                *ngIf="airports.length > 0; else noAirportsMessage"
              >
                <option value="" selected>
                  Sélectionnez l'aéroport d'arrivé
                </option>
                <option *ngFor="let airport of airports" [value]="airport.id">
                  {{ airport.name }}
                </option>
              </select>
            </div>
          </div>
          <ng-template #noAirportsMessage>
            <p>Aucun aéroport disponible pour le moment.</p>
          </ng-template>
          <div class="">
            <div class="input-style-2 input-required">
              <span class="input-style-1-active">Date de Vol</span>
              <input
                type="date"
                value="2022-08-26"
                style="height: 50px"
                id="arrival_at"
                formControlName="arrival_at"
              />
            </div>
          </div>
          <div class="">
            <div class="input-style-2 input-required">
              <span class="input-style-1-active">Heure du Vol</span>
              <input
                type="time"
                id="arrival_time"
                formControlName="arrival_time"
                value="23:30"
                sstyle="height: 50px;"
              />
            </div>
          </div>
          <div class="">
            <div class="input-style-2 input-required">
              <span class="input-style-1-active">Numéro de Vol</span>
              <input
                type="text"
                id="arrival_flight_number"
                formControlName="arrival_flight_number"
                placeholder="Ex: AF702, U24657, BA2490"
                style="height: 50px"
              />
            </div>
          </div>
        </div>
      </div>
      <button
        class="btn btn-full bg-highlight btn-m rounded-sm shadow-xl text-uppercase font-900 mb-2 w-100"
        type="submit"
        [disabled]="myForm.invalid"
      >
        Valider
      </button>
      <div class="divider my-2"></div>
      <button
        class="close-menu btn btn-full bg-gransparent color-red2-dark btn-m text-uppercase font-900 mb-2 w-100"
      >
        Supprimer
      </button>
    </form>
  `,
  styles: [``],
})
export class RsArriveeComponent implements OnInit {
  myForm!: FormGroup;
  airports: any = [];
  str1: string = 'airports';
  loading: boolean = true;

  constructor(
    private localStorageService: LocalStorageService,
    private apiService: ApiService,
    private navigationService: NavigationService
  ) {}
  ngOnInit() {
    console.log(
      'Liste des aéroports dans le composant :',
      this.apiService.getAirports()
    );
    this.airports = this.localStorageService.getItem(this.str1);

    this.myForm = new FormGroup({
      arrival_airport_id: new FormControl('', Validators.required),
      arrival_at: new FormControl('', Validators.required),
      arrival_time: new FormControl('', Validators.required),
      arrival_flight_number: new FormControl('', Validators.required),
    });

    this.loading = false;
    // console.log(this.airports.id);
  }
  onSubmit() {
    console.log('La valeur est: ', this.myForm?.value);
    if (localStorage.getItem('assistanceDepartReservationInfo')) {
      this.localStorageService.removeItem('assistanceDepartReservationInfo');
    }
    if (localStorage.getItem('assistanceTransitReservationInfo')) {
      this.localStorageService.removeItem('assistanceTransitReservationInfo');
    }
    this.localStorageService.setItem(
      'assistanceArriveeReservationInfo',
      this.myForm.value
    );
    this.goTo('extra');
  }
  goTo(route_ohh: string): void {
    this.navigationService.goToPage(route_ohh);
  }
}
