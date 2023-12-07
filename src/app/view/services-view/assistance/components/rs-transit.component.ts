import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../../../../store/services/session/local-storage.service';
import { ApiService } from '../../../../store/services/data/api.service';
import { NavigationService } from '../../../../store/helpers/navigation.service';

@Component({
  selector: 'app-rs-transit',
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
              <span class="input-style-1-active">Aéroport</span>
              <select
                class="form-control filled"
                id="departure_airport_id_t"
                formControlName="departure_airport_id_t"
                required
                *ngIf="airports.length > 0; else noAirportsMessage"
              >
                <option value="" selected>Entrez l'aéroport</option>
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
              <span class="input-style-1-active">Date - Départ</span>
              <input
                type="date"
                value="2022-08-26"
                style="height: 50px"
                id="departure_date_t"
                formControlName="departure_date_t"
              />
            </div>
          </div>
          <div class="">
            <div class="input-style-2 input-required">
              <span class="input-style-1-active">Heure - Départ</span>
              <input
                type="time"
                id="departure_time_t"
                formControlName="departure_time_t"
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
                id="departure_numero_de_vol_t"
                formControlName="departure_numero_de_vol_t"
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
export class RsTransitComponent implements OnInit {
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
      departure_airport_id_t: new FormControl('', Validators.required),
      departure_date_t: new FormControl('', Validators.required),
      departure_time_t: new FormControl('', Validators.required),
      departure_numero_de_vol_t: new FormControl('', Validators.required),
    });

    this.loading = false;
  }
  onSubmit() {
    console.log('La valeur est: ', this.myForm?.value);
    if (localStorage.getItem('assistanceArriveeReservationInfo')) {
      this.localStorageService.removeItem('assistanceArriveeReservationInfo');
    }
    if (localStorage.getItem('assistanceDepartReservationInfo')) {
      this.localStorageService.removeItem('assistanceDepartReservationInfo');
    }
    this.localStorageService.setItem(
      'assistanceTransitReservationInfo',
      this.myForm.value
    );
    this.goTo('extra');
  }
  goTo(route_ohh: string): void {
    this.navigationService.goToPage(route_ohh);
  }
}
