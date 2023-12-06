import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../../../../store/services/session/local-storage.service';
import { ApiService } from '../../../../store/services/data/api.service';
import { NavigationService } from '../../../../store/helpers/navigation.service';

@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrl: './extra.component.css',
})
export class ExtraComponent {
  myForm!: FormGroup;
  infoRs: any = [];
  infoRs0: any = [];
  str1: string = 'airports';
  str2: string = 'assis-depart-info';
  str3: string = 'assistancArriveeReservationInfo';
  str4: string = 'assistanceTransitReservationInfo';
  str5: string = 'depart-extra-info';
  loading: boolean = true;
  theAirport: any = {};
  airports: any = {};
  selectedOptions: any[] = [];
  showSnackbar: boolean = false;
  submittingForm: boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private apiService: ApiService,
    private navigationService: NavigationService
  ) {}
  ngOnInit() {
    this.airports = this.localStorageService.getItem(this.str1);
    this.infoRs0 = this.localStorageService.getItem(this.str2);
    this.infoRs = this.localStorageService.getItem(this.str5);

    if (this.infoRs) {
      // Si les données sont présentes, utilisez-les pour initialiser le formulaire
      this.myForm = new FormGroup({
        arrival_airport_id: new FormControl(
          this.infoRs.arrival_airport_id,
          Validators.required
        ),
        arrival_at: new FormControl(
          this.infoRs.arrival_at,
          Validators.required
        ),

        arrival_time: new FormControl(
          this.infoRs.arrival_time,
          Validators.required
        ),
        special_request: new FormControl(this.infoRs.special_request),
        // options: new FormControl(this.infoRs.option),
      });
      console.log('efkjgherk', this.infoRs.arrival_at);

      this.selectedOptions = this.infoRs.options || [];
    } else {
      // Si les données ne sont pas présentes, créez un nouveau formulaire
      const currentDate = new Date().toISOString().split('T')[0]; // Format "YYYY-MM-DD"
      this.myForm = new FormGroup({
        arrival_airport_id: new FormControl('', Validators.required),
        arrival_at: new FormControl(currentDate, Validators.required),
        arrival_time: new FormControl('', Validators.required),
        special_request: new FormControl(''),
        options: new FormControl(''),
      });
    }

    this.getAirportInfo(this.infoRs0.departure_airport_id);
    this.loading = false;
  }
  onSubmit() {
    this.submittingForm = true;
    this.myForm.value.options = this.selectedOptions;
    // Vérifiez si le formulaire est valide
    if (this.myForm.valid) {
      // this.infoRs.arrival_airport_id = this.myForm.value.arrival_airport_id;
      // this.infoRs.arrival_at = this.myForm.value.arrival_at;
      // this.infoRs.arrival_time = this.myForm.value.arrival_time;
      // this.infoRs.special_request = this.myForm.value.special_request;
      // this.infoRs.options = this.selectedOptions;

      this.localStorageService.setItem(this.str5, this.myForm.value);

      console.log('La valeur est: ', this.myForm.value, this.infoRs);
    } else {
      this.showSnackbar = true;
      setTimeout(() => {
        this.showSnackbar = false;
      }, 1000);
    }

    setTimeout(() => {
      this.submittingForm = false;
    }, 300);

    this.goTo('assis-info-passenger-m');
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

  handleClick(option: any): void {
    const optionIndex = this.selectedOptions.findIndex(
      (selectedOption) => selectedOption.id === option.id
    );

    if (optionIndex === -1) {
      // Si l'option n'est pas déjà sélectionnée, l'ajouter
      this.selectedOptions.push(option);
    } else {
      // Si l'option est déjà sélectionnée, la retirer
      this.selectedOptions.splice(optionIndex, 1);
    }

    // Afficher les options sélectionnées dans la console
    console.log('Options sélectionnées :', this.selectedOptions);
  }

  isSelected(option: any): boolean {
    return this.selectedOptions.some(
      (selectedOption) => selectedOption.id === option.id
    );
  }

  goTo(route_ohh: string): void {
    this.navigationService.goToPage(route_ohh);
  }
}
