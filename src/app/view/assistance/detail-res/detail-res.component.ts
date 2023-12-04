import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../store/services/data/api.service';
import { NavigationService } from '../../../store/helpers/navigation.service';

@Component({
  selector: 'app-detail-res',
  templateUrl: './detail-res.component.html',
  styleUrl: './detail-res.component.css',
})
export class DetailResComponent implements OnInit {
  // resId!: string;
  private reservationId = 'reservationId';
  reservation: any = {};
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private navigationService: NavigationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const resId = localStorage.getItem(this.reservationId);

    if (resId !== null) {
      this.apiService.getAssistanceDetail(resId).subscribe(
        (responseData) => {
          this.reservation = responseData.data.reservation;
          console.log('voici le detail de assistance: ', this.reservation);

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
    // this.navigationService.goToPage(route_ohh);
    this.router.navigate([route_ohh]).then(() => {
      window.location.reload();
    });
  }
}
