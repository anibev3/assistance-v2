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

    if (this.sessionId === this.paymentId) {
      console.log("C'est vrai");
      if (this.localStorageService.getItem('transport_payment_id')) {
        console.log("C'est ça meme");

        const tpMapInfo = this.localStorageService.getItem('tpMapInfo');
        const selectedVehicle =
          this.localStorageService.getItem('selectedVehicle');
        const token = localStorage.getItem('authToken');

        // Prepare form data
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

                // Extract data for email template
                // const email = (sessionStorage.getItem('formDataTosend.reservationForMe') === 'true') ? sessionStorage.getItem('user.email') : sessionStorage.getItem('formDataTosend.passenger_mail');
                // const email = 'anibe.mails@gmail.com';
                // const name =
                //   this.localStorageService.getItem('user.lastName') +
                //   this.localStorageService.getItem('user.firstName');
                // const amount = responseJson.vehiculePrice;
                // const amount = '1000';

                // ... (other variables)

                // Call your function to send notification
                // this.sendTransportConfirmationNotif(email, name, amount, /* other parameters */);

                // Store response JSON in session
                // sessionStorage.setItem('transport_response_json', JSON.stringify(responseJson));

                // Clear session data
                // this.localStorageService.removeItem('coord_de_depart');
                // this.localStorageService.removeItem('coord_d_arrivee');

                // Redirect to the next page
                // this.router.navigate(['/web-service02/sh-booking-vehicle-receved']);
              }
            },
            (error) => {
              console.error('Error:', error);
              // Handle error as needed
            }
          );

        // sendTransportConfirmationNotif(email: string, name: string, amount: string /* other parameters */) {
        //   // Implement your notification logic here
        // }
      }
    }

    // Appelez l'API avec l'identifiant de session
    // this.apiService.callApiAfterPaymentSuccess(sessionId).subscribe(
    //   (response) => {
    //     // Traitez la réponse de l'API
    //     console.log(response);

    //     // Redirigez l'utilisateur vers la page de succès
    //     // (vous pouvez également utiliser une méthode de navigation appropriée)
    //     window.location.href = '/success-page';
    //   },
    //   (error) => {
    //     console.error(error);

    //     // Redirigez l'utilisateur vers la page d'échec si nécessaire
    //     window.location.href = '/error-page';
    //   }
    // );
  }

  goTo(route_ohh: string): void {
    this.navigationService.goToPage(route_ohh);
  }
}
