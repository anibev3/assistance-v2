import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../store/services/data/api.service';
// import * as $ from 'jquery';
import { TabViewModule } from 'primeng/tabview';
import { NavigationService } from '../../store/helpers/navigation.service';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.css',
  // standalone: true,
  // imports: [TabViewModule],
})
export class HistoriqueComponent implements OnInit {
  reservations: any[] = [];
  reservationsAvenir: any[] = [];
  reservationsAnnulees: any[] = [];
  reservationsTerminees: any[] = [];
  loading: boolean = true;

  constructor(
    private apiService: ApiService,
    private navigationService: NavigationService
  ) {}
  first: number = 0;
  rows: number = 10;

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
  }
  ngOnInit() {
    this.apiService.getTransportHistory().subscribe(
      (responseData) => {
        console.log("voici l'historique de transport: ", responseData);

        // this.loading = false;
      },
      (error) => {
        console.error(error);
        // this.loading = false;
      }
    );
    this.apiService.getAssistanceHistory().subscribe(
      (responseData) => {
        console.log("voici l'historique de assistance: ", responseData);
        this.reservations = responseData.data.reservations;

        // Filtrer les réservations en fonction de l'état
        this.reservationsAvenir = this.reservations.filter(
          (res) => res.state === 'A venir'
        );
        this.reservationsAnnulees = this.reservations.filter(
          (res) => res.state === 'Annulée'
        );
        this.reservationsTerminees = this.reservations.filter(
          (res) => res.state === 'Terminée'
        );
        console.log(this.reservationsAvenir);

        console.log(this.reservationsAnnulees);

        console.log(this.reservationsTerminees);
        this.loading = false;
      },
      (error) => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  getReservationDetailLink(reservationId: string): string[] {
    return ['/assist-res-detail/', reservationId];
  }

  goTo(route_ohh: string, id: string): void {
    console.log(route_ohh, id);

    localStorage.setItem('reservationId', id);
    this.navigationService.goToPage(route_ohh);
  }
}
