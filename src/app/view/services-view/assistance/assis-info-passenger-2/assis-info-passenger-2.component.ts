import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LocalStorageService } from '../../../../store/services/session/local-storage.service';
import { ApiService } from '../../../../store/services/data/api.service';
import { NavigationService } from '../../../../store/helpers/navigation.service';

@Component({
  selector: 'app-assis-info-passenger-2',
  templateUrl: './assis-info-passenger-2.component.html',
  styleUrl: './assis-info-passenger-2.component.css',
})
export class AssisInfoPassenger2Component {
  myForm!: FormGroup;
  infoRs: any = [];
  str1: string = 'airports';
  str2: string = 'assistanceDepartReservationInfo';
  str3: string = 'assistancArriveeReservationInfo';
  str4: string = 'assistanceTransitReservationInfo';
  str5: string = 'assis-info-passenger-m';
  str6: string = 'assis-info-passenger-n';
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
    this.infoRs = this.localStorageService.getItem(this.str6);

    if (this.infoRs) {
      this.myForm = new FormGroup({
        flightClass: new FormControl(this.infoRs.flightClass),
        numberOfPassenger: new FormControl(this.infoRs.numberOfPassenger),
        numberOfBags: new FormControl(this.infoRs.numberOfBags),
        welcomePanel: new FormControl(this.infoRs.welcomePanel),
      });
    } else {
      const currentDate = new Date().toISOString().split('T')[0]; // Format "YYYY-MM-DD"
      this.myForm = new FormGroup({
        flightClass: new FormControl(''),
        numberOfPassenger: new FormControl(''),
        numberOfBags: new FormControl(''),
        welcomePanel: new FormControl(''),
      });
    }
    this.loading = false;
  }
  onSubmit() {
    this.submittingForm = true;

    if (
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

    this.infoRs = this.myForm.value;

    this.localStorageService.setItem(this.str6, this.infoRs);

    setTimeout(() => {
      this.submittingForm = false;
    }, 300);

    setTimeout(() => {
      this.goTo('assis-resum-info');
    }, 300);
  }

  goTo(route_ohh: string): void {
    this.navigationService.goToPage(route_ohh);
  }
}
