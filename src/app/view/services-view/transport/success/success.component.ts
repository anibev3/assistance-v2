import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { ApiService } from '../../../store/services/data/api.service';
// import { LocalStorageService } from '../../../store/services/session/local-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../../../../store/services/data/api.service';
import { LocalStorageService } from '../../../../store/services/session/local-storage.service';
import { NavigationService } from '../../../../store/helpers/navigation.service';
// import { NavigationService } from '../../../store/helpers/navigation.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrl: './success.component.css',
})
export class SuccessComponent implements OnInit {
  paymentId: string | null = null;
  sessionId: string | null = null;
  isOkReservation: boolean = false;
  baseUrl: string = 'https://blackcarxx.sherylux.com/api/v1';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
    private http: HttpClient,
    private router: Router,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.queryParams['session_id'];

    let lesAmounts = this.localStorageService.getItem('lesAmounts');
    let adresse_de_facturation = this.localStorageService.getItem(
      'adresse-de-facturation'
    );
    let depart_extra_info =
      this.localStorageService.getItem('depart-extra-info');
    let depart_airport = this.localStorageService.getItem('depart-airport');
    let assis_depart_info =
      this.localStorageService.getItem('assis-depart-info');
    let assis_info_passenger_m = this.localStorageService.getItem(
      'assis-info-passenger-m'
    );
    let assis_info_passenger_n = this.localStorageService.getItem(
      'assis-info-passenger-n'
    );

    switch (true) {
      case this.localStorageService.getItem('arrival_payment_id') !== null:
        this.paymentId = this.localStorageService.getItem('arrival_payment_id');
        break;

      case this.localStorageService.getItem('departure_payment_id') !== null:
        this.paymentId = this.localStorageService.getItem(
          'departure_payment_id'
        );
        break;

      case this.localStorageService.getItem('transit_payment_id') !== null:
        this.paymentId = this.localStorageService.getItem('transit_payment_id');
        break;

      case this.localStorageService.getItem('transport_payment_id') !== null:
        this.paymentId = this.localStorageService.getItem(
          'transport_payment_id'
        );
        break;

      default:
        // Si aucune clé n'est trouvée
        break;
    }

    console.log(
      'EEE',
      this.localStorageService.getItem('departure_payment_id')
    );

    if (this.sessionId === this.paymentId) {
      console.log("C'est vrai");
      if (this.localStorageService.getItem('transport_payment_id')) {
        console.log("C'est ça meme");

        const tpMapInfo = this.localStorageService.getItem('tpMapInfo');
        const selectedVehicle =
          this.localStorageService.getItem('selectedVehicle');
        const token = localStorage.getItem('authToken');

        const formData = {
          pick_lat: tpMapInfo.pick_lat,
          pick_lng: tpMapInfo.pick_lng,
          drop_lat: tpMapInfo.drop_lat,
          drop_lng: tpMapInfo.drop_lng,
          ride_type: 1,
          payment_opt: 1,
          vehicle_type: selectedVehicle.zone_type_id,
          pick_address: tpMapInfo.fromAdress,
          drop_address: tpMapInfo.toAdress,
          request_eta_amount: selectedVehicle.total,
          trip_start_time: '2024-01-12 14:45:54',
          is_later: true,
          commande_type: 'transport_simple',
        };

        // HTTP headers
        const headers = new HttpHeaders({
          Authorization: 'Bearer ' + token,
          accept: 'application/json',
        });

        console.log(formData);

        // Make HTTP request
        this.http
          .post<any>(`${this.baseUrl}/request/create`, formData, { headers })
          .subscribe(
            (response) => {
              if (response.successful) {
                const responseJson = response.data;
                console.log(responseJson);
              }
            },
            (error) => {
              console.error('Error:', error);
            }
          );
      } else {
        console.log("C'est ça meme 22");

        let formData = {};

        // Prepare form data
        // ================================================================================
        //  FORM DATA ARRIVAL
        // ================================================================================
        if (this.localStorageService.getItem('arrival_payment_id')) {
          formData = {
            // contact : 'berkhbvei',
            // flight_number : 'nhejvbjhe',
            // flight_company : ,
            // flight_class : ,
            // welcome_panel : ,
            // number_of_bags : ,
            // number_of_passengers : ,
            // reservation_type_id : 1,
            // departure_airport_id : ,
            // arrival_airport_id :,
            // arrival_at :,
            // arrival_time : i,
            // special_request : ,
            // service_at :,
            // departure_time :,
            // departure_at : ,
            // reservation_for_me : ,
            // passenger_name : ,
            // passenger_contact : ,
            // options : ,
          };
        }
        // ================================================================================

        // ================================================================================
        //  FORM DATA DDEPARTURE
        // ================================================================================
        if (this.localStorageService.getItem('departure_payment_id')) {
          let options = depart_extra_info.options;
          // let ids: string[] = options.map(
          //   (option: { id: { toString: () => any } }) => option.id.toString()
          // ); // sortie: ['1', '2']

          let ids: number[] = options.map((option: { id: any }) => option.id); // sortie: [1, 2]

          console.log(ids);

          console.log(options);

          let contact;
          let flightClass;
          let numberOfBags;
          let numberOfPassenger;
          let welcomePanel;
          let passengerName;
          let passengerEmail;
          let passengerContact;
          if (assis_info_passenger_m.reservationForMe) {
            contact = assis_info_passenger_m.contact;
            flightClass = assis_info_passenger_m.flightClass;
            numberOfBags = assis_info_passenger_m.numberOfBags;
            numberOfPassenger = assis_info_passenger_m.numberOfPassenger;
            welcomePanel = assis_info_passenger_m.welcomePanel;
          } else {
            passengerName = assis_info_passenger_m.passengerLastName;
            passengerEmail = assis_info_passenger_m.passengerEmail;
            passengerContact = assis_info_passenger_m.passengerLastName;
            flightClass = assis_info_passenger_n.flightClass;
            numberOfBags = assis_info_passenger_n.numberOfBags;
            numberOfPassenger = assis_info_passenger_n.numberOfPassenger;
            welcomePanel = assis_info_passenger_n.welcomePanel;
          }

          formData = {
            contact: contact,
            flight_number: assis_depart_info.departure_flight_number,
            flight_company: null,
            flight_class: flightClass,
            welcome_panel: welcomePanel,
            number_of_bags: numberOfBags,
            number_of_passengers: numberOfPassenger,
            reservation_type_id: 2,
            departure_airport_id: assis_depart_info.departure_airport_id,
            arrival_airport_id: depart_extra_info.arrival_airport_id,
            arrival_at: depart_extra_info.arrival_at,
            arrival_time: depart_extra_info.arrival_time,
            special_request: depart_extra_info.special_request,
            service_at:
              assis_depart_info.departure_at +
              ' ' +
              assis_depart_info.departure_time,
            departure_time: assis_depart_info.departure_time,
            departure_at: assis_depart_info.departure_at,
            reservation_for_me: assis_info_passenger_m.reservationForMe,
            passenger_name: passengerName,
            passenger_contact: passengerContact,
            options: ids,
          };
        }
        console.log('Visionnage de la form data', formData);

        // ================================================================================

        // ================================================================================
        //  FORM DATA TRANSIT
        // ================================================================================
        if (this.localStorageService.getItem('transit_payment_id')) {
          formData = {
            //   contact : ,
            //   flight_number : ,
            //   transit_flight_number : ,
            //   flight_company : ,
            //   flight_class : ,
            //   welcome_panel : ,
            //   number_of_bags : ,
            //   number_of_passengers : ,
            //   reservation_type_id : 3,
            //   departure_airport_id : ,
            //   transit_airport_id : ,
            //   arrival_at : ,
            //   departure_at : ,
            //   arrival_time : ,
            //   special_request : ,
            //   service_at : ,
            //   departure_time : ,
            //   reservation_for_me : ,
            //   passenger_name : ,
            //   passenger_contact : ,
            //   options : ,
          };
        }
        // ================================================================================

        this.apiService.initiateAssistanceReservation(formData).subscribe(
          (paymentResponse) => {
            console.log(
              'La response de l api de rreservation',
              paymentResponse
            );

            if (paymentResponse.success) {
              return (window.location.href = paymentResponse.data.session_url);
            } else {
              console.error('Échec du paiement.');
            }
          },
          (error) => {
            console.error(error);
          }
        );
      }
    }
  }

  goTo(route_ohh: string): void {
    this.navigationService.goToPage(route_ohh);
  }
}
