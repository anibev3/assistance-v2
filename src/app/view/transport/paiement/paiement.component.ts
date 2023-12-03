import { Component } from '@angular/core';
import { NavigationService } from '../../../store/helpers/navigation.service';
import { PaiementService } from '../../../store/services/paiement/paiement.service';
import { LocalStorageService } from '../../../store/services/session/local-storage.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrl: './paiement.component.css',
})
export class PaiementComponent {
  constructor(
    private navigationService: NavigationService,
    private paiementService: PaiementService,
    private localStorageService: LocalStorageService
  ) {}

  goTo(route_ohh: string): void {
    this.navigationService.goToPage(route_ohh);
  }

  processToPaiement(): void {
    const vehiculePrice = 10000;
    const totalTVA = 20000;

    const cart = [
      {
        name: 'Trajet Simple',
        price: vehiculePrice,
        quantity: 1,
      },
      {
        name: 'Montant TVA',
        price: totalTVA,
        quantity: 1,
      },
    ];

    this.paiementService.initiatePayment(cart).subscribe(
      (paymentResponse) => {
        console.log('La response de l api de strip', paymentResponse);

        if (paymentResponse.success) {
          this.localStorageService.setItem(
            'transport_payment_id',
            paymentResponse.data.session_id
          );
          console.log(paymentResponse.data.session_url);
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
