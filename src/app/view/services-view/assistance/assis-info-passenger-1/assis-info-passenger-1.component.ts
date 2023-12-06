import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LocalStorageService } from '../../../../store/services/session/local-storage.service';
import { ApiService } from '../../../../store/services/data/api.service';
import { NavigationService } from '../../../../store/helpers/navigation.service';

@Component({
  selector: 'app-assis-info-passenger-1',
  templateUrl: './assis-info-passenger-1.component.html',
  styleUrl: './assis-info-passenger-1.component.css',
})
export class AssisInfoPassenger1Component {
  myForm!: FormGroup;
  infoRs: any = [];
  str1: string = 'airports';
  str2: string = 'assistanceDepartReservationInfo';
  str3: string = 'assistancArriveeReservationInfo';
  str4: string = 'assistanceTransitReservationInfo';
  str5: string = 'assis-info-passenger-m';
  loading: boolean = true;
  theAirport: any = {};
  airports: any = {};
  selectedOptions: any[] = [];
  showSnackbar: boolean = false;
  submittingForm: boolean = false;
  selectedOption: boolean | null = false;
  isCollapseVisible: boolean | null = false;

  constructor(
    private localStorageService: LocalStorageService,
    private apiService: ApiService,
    private navigationService: NavigationService,
    private fb: FormBuilder
  ) {
    // myForm: FormGroup;
    // this.myForm = this.fb.group({
    //   // ... autres champs du formulaire
    //   reservationForMe: ['', Validators.required],
    // });
  }
  ngOnInit() {
    this.airports = this.localStorageService.getItem(this.str1);
    this.infoRs = this.localStorageService.getItem(this.str5);

    if (this.infoRs) {
      // Si les données sont présentes, utilisez-les pour initialiser le formulaire
      this.selectedOption = this.infoRs.reservationForMe;
      if (this.selectedOption) {
        this.isCollapseVisible = true;
      }
      this.myForm = new FormGroup({
        reservationForMe: new FormControl(this.infoRs.reservationForMe),
        passengerFirstName: new FormControl(this.infoRs.passengerFirstName),
        passengerLastName: new FormControl(this.infoRs.passengerLastName),
        passengerEmail: new FormControl(this.infoRs.passengerEmail),
        passengerContact: new FormControl(this.infoRs.passengerContact),
        contact: new FormControl(this.infoRs.contact),
        flightClass: new FormControl(this.infoRs.flightClass),
        numberOfPassenger: new FormControl(this.infoRs.numberOfPassenger),
        numberOfBags: new FormControl(this.infoRs.numberOfBags),
        welcomePanel: new FormControl(this.infoRs.welcomePanel),
      });
      console.log('Info dispo en storage', this.infoRs);
      // console.log('Info dispo en storage', this.myForm.value);

      // this.selectedOptions = this.infoRs.options || [];
    } else {
      console.log('Il n y a aucune donnée en storage');

      // Si les données ne sont pas présentes, créez un nouveau formulaire
      const currentDate = new Date().toISOString().split('T')[0]; // Format "YYYY-MM-DD"
      this.myForm = new FormGroup({
        reservationForMe: new FormControl(''),
        passengerFirstName: new FormControl(''),
        passengerLastName: new FormControl(''),
        passengerEmail: new FormControl(''),
        passengerContact: new FormControl(''),
        contact: new FormControl(''),
        flightClass: new FormControl(''),
        numberOfPassenger: new FormControl(''),
        numberOfBags: new FormControl(''),
        welcomePanel: new FormControl(''),
      });
    }

    // this.getAirportInfo(this.infoRs.departure_airport_id);
    this.loading = false;
  }
  onSubmit() {
    this.submittingForm = true;
    // Vérifiez si le formulaire est valide
    this.myForm.value.reservationForMe = this.selectedOption;
    console.log('this.myForm.valid', this.myForm.valid);
    console.log('this.myForm.value', this.myForm.value);
    console.log('reservation for me', this.selectedOption);

    if (this.myForm.valid) {
      // this.infoRs.reservationForMe = this.selectedOption;
      this.infoRs = this.myForm.value;

      // if (this.infoRs.reservationForMe) {
      //   // IF RESERVATION FOR ME IS TRUE
      //   console.log('IF RESERVATION FOR ME IS TRUE');
      //   this.infoRs.contact = this.myForm.value.contact;
      //   this.infoRs.contact = this.myForm.value.contact;
      //   this.infoRs.flightClass = this.myForm.value.flightClass;
      //   this.infoRs.numberOfPassenger = this.myForm.value.numberOfPassenger;
      //   this.infoRs.numberOfBags = this.myForm.value.numberOfBags;
      //   this.infoRs.welcomePanel = this.myForm.value.welcomePanel;

      //   this.localStorageService.setItem(this.str5, this.infoRs);
      // } else if (!this.infoRs.reservationForMe) {
      //   // IF RESERVATION FOR ME IS FALSE
      //   console.log('IF RESERVATION FOR ME IS FALSE');
      //   this.infoRs.passengerFirstName = this.myForm.value.passengerFirstName;
      //   this.infoRs.passengerLastName = this.myForm.value.passengerLastName;
      //   this.infoRs.passengerEmail = this.myForm.value.passengerEmail;
      //   this.infoRs.passengerContact = this.myForm.value.passengerContact;

      //   this.localStorageService.setItem(this.str5, this.infoRs);
      // }

      this.localStorageService.setItem(this.str5, this.infoRs);

      console.log('La valeur est: ', this.myForm.value, this.infoRs);
    } else {
      this.showSnackbar = true;
      setTimeout(() => {
        this.showSnackbar = false;
      }, 1000);
      setTimeout(() => {
        this.submittingForm = false;
      }, 300);
      return;
    }

    setTimeout(() => {
      this.submittingForm = false;
    }, 300);

    if (this.myForm.value.reservationForMe) {
      if (
        !this.myForm.value.contact ||
        !this.myForm.value.flightClass ||
        !this.myForm.value.numberOfPassenger ||
        !this.myForm.value.numberOfBags ||
        !this.myForm.value.welcomePanel
      ) {
        this.showSnackbar = true;
        this.submittingForm = true;
        setTimeout(() => {
          this.showSnackbar = false;
        }, 1000);
        setTimeout(() => {
          this.submittingForm = false;
        }, 300);

        return;
      }
      setTimeout(() => {
        this.goTo('assis-resum-info');
      }, 300);
    } else {
      if (
        !this.myForm.value.passengerFirstName ||
        !this.myForm.value.passengerLastName ||
        !this.myForm.value.passengerEmail ||
        !this.myForm.value.passengerContact
      ) {
        this.showSnackbar = true;
        this.submittingForm = true;
        setTimeout(() => {
          this.showSnackbar = false;
        }, 1000);
        setTimeout(() => {
          this.submittingForm = false;
        }, 300);

        return;
      }
      setTimeout(() => {
        this.goTo('assis-info-passenger-n');
      }, 300);
    }
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

  goTo(route_ohh: string): void {
    this.navigationService.goToPage(route_ohh);
  }

  onReservationForMeChange(event: any) {
    const reservationForMeValue = event.target.value;
    console.log(reservationForMeValue);
  }

  selectOption(option: boolean) {
    this.selectedOption = option;
  }

  toggleCollapse() {
    if (this.selectedOption === true) {
      this.isCollapseVisible = true;
    } else {
      this.isCollapseVisible = false;
    }
  }
}
