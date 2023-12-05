import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../../../../store/services/session/local-storage.service';
import { ApiService } from '../../../../store/services/data/api.service';

@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrl: './extra.component.css',
})
export class ExtraComponent {
  myForm!: FormGroup;
  infoRs: any = [];
  str1: string = 'airports';
  str2: string = 'assistanceDepartReservationInfo';
  str3: string = 'assistancArriveeReservationInfo';
  str4: string = 'assistanceTransitReservationInfo';
  loading: boolean = true;
  theAirport: any = {};
  airports: any = {};

  constructor(
    private localStorageService: LocalStorageService,
    private apiService: ApiService
  ) {}
  ngOnInit() {
    this.airports = this.localStorageService.getItem(this.str1);
    this.infoRs = this.localStorageService.getItem(this.str2);

    this.myForm = new FormGroup({
      arrival_airport_id: new FormControl('', Validators.required),
      arrival_at: new FormControl('', Validators.required),
      arrival_time: new FormControl('', Validators.required),
      // arrival_flight_number: new FormControl('', Validators.required),
    });

    console.log('Verif:', this.infoRs.departure_airport_id);

    this.getAirportInfo(this.infoRs.departure_airport_id);
    this.loading = false;
  }
  onSubmit() {
    //   console.log('La valeur est: ', this.myForm?.value);
    //   const airportId = localStorage.getItem(this.reservationId);
    //   this.localStorageService.setItem(
    //     'assistanceArriveeReservationInfo',
    //     this.myForm.value
    //   );
  }

  getAirportInfo(airportId: string) {
    if (airportId !== null) {
      this.apiService.getSingleAirports(airportId).subscribe(
        (responseData) => {
          this.theAirport = responseData;
          console.log('voici l aeroport en question ', this.theAirport);

          this.loading = false;
        },
        (error) => {
          console.error(error);
          this.loading = false;
        }
      );
    } else {
      console.error(
        "La clé spécifiée n'a pas été trouvée dans le localStorage."
      );
      this.loading = false;
    }
  }
}
