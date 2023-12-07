import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../../store/services/session/local-storage.service';
import { NavigationService } from '../../../../store/helpers/navigation.service';

@Component({
  selector: 'app-resum-assis',
  templateUrl: './resum-assis.component.html',
  styleUrl: './resum-assis.component.css',
})
export class ResumAssisComponent implements OnInit {
  infoRs: any = [];

  service: any = [];

  depart: any = [];
  airports: any = [];
  airport: any = [];
  extra: any = [];
  passenger_m: any = [];
  passenger_n: any = [];

  str1: string = 'assis-depart-info'; //depart
  str2: string = 'airports'; //airports
  str3: string = 'depart-airport'; //airport
  str4: string = 'depart-extra-info'; //extra
  str5: string = 'assis-info-passenger-m'; //passenger_m
  str6: string = 'assis-info-passenger-n'; //passenger_n
  extra_amount: number = 0;
  additional_passenger_amount: number = 0;
  additional_bags_amount: number = 0;
  tauxTVA: number = 18;
  tvaAmount: number = 0;
  amountHT: number = 0;
  totalAmount: number = 0;
  showSnackbar: boolean = false;
  submittingForm: boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private navigationService: NavigationService
  ) {}
  ngOnInit() {
    this.depart = this.localStorageService.getItem(this.str1);
    this.airports = this.localStorageService.getItem(this.str2);
    this.airport = this.localStorageService.getItem(this.str3);
    this.extra = this.localStorageService.getItem(this.str4);
    this.passenger_m = this.localStorageService.getItem(this.str5);
    this.passenger_n = this.localStorageService.getItem(this.str6);

    this.getServiceInTheList();
    this.setExtraAmount();
    this.setOtherPassengerPrice();
    this.setOtherBagsPrice();
    this.calculateTotalWithoutTVA(
      this.service.pivot.default_price,
      this.extra_amount,
      this.additional_passenger_amount,
      this.additional_bags_amount,
      this.tauxTVA
    );
    this.calculateTotalWithTVA(this.amountHT, this.tvaAmount);

    // Exemple d'utilisation
    const lesAmounts: Record<string, number> = {
      servicePrice: this.service.pivot.default_price,
      extra_amount: this.extra_amount,
      additional_passenger_amount: this.additional_passenger_amount,
      additional_bags_amount: this.additional_bags_amount,
      tvaAmount: this.tvaAmount,
      totalAmount: this.totalAmount,
    };

    this.storeCalculatedAmounts(lesAmounts);
  }

  getServiceInTheList(): void {
    const service_ = this.airport.services;
    this.service = service_.filter(
      (res: { identifier: string }) => res.identifier === 'SER0002'
    );
    this.service = this.service['0'];
  }

  setExtraAmount(): void {
    if (this.extra.options && this.extra.options.length > 0) {
      this.extra_amount = this.extra.options.reduce(
        (
          accumulator: any,
          currentObject: {
            pivot: any;
            amount: any;
          }
        ) => {
          if (currentObject && currentObject.pivot.amount) {
            return accumulator + currentObject.pivot.amount;
          } else {
            return accumulator;
          }
        },
        0
      );
    } else {
      console.log("this.extra est vide ou n'existe pas.");
    }
  }

  setOtherPassengerPrice(): number {
    const priceForOtherPassenger: number = this.service.pivot.price_for_other;
    const defaultNumberOfPassengers: number =
      this.service.pivot.default_number_of_passengers;

    this.additional_passenger_amount =
      this.passenger_n.numberOfPassenger > defaultNumberOfPassengers
        ? (this.passenger_n.numberOfPassenger - defaultNumberOfPassengers) *
          priceForOtherPassenger
        : 0;

    console.log(this.additional_passenger_amount.toLocaleString('fr-FR'));

    return this.additional_passenger_amount;
  }

  setOtherBagsPrice(): number {
    const priceForOtherBags: number = this.service.pivot.price_for_other_bags;
    const defaultNumberOfBags: number =
      this.service.pivot.default_number_of_bags;

    this.additional_bags_amount =
      this.passenger_n.numberOfBags > defaultNumberOfBags
        ? (this.passenger_n.numberOfBags - defaultNumberOfBags) *
          priceForOtherBags
        : 0;

    console.log(this.additional_bags_amount.toLocaleString('fr-FR'));

    return this.additional_bags_amount;
  }

  calculateTotalWithoutTVA(
    default_price: number,
    extra_amount: number,
    additional_passenger_amount: number,
    additional_bags_amount: number,
    tauxTVA: number
  ): number {
    this.amountHT =
      default_price +
      extra_amount +
      additional_passenger_amount +
      additional_bags_amount;
    if (this.amountHT < 0 || tauxTVA < 0) {
      throw new Error('Les paramètres doivent être des nombres positifs.');
    }

    const vatAmount: number = this.amountHT * (tauxTVA / 100);
    this.tvaAmount = vatAmount;
    console.log(this.tvaAmount);

    return this.tvaAmount;
  }

  calculateTotalWithTVA(amountHT_: number, tvaAmount_: number): number {
    if (amountHT_ < 0 || tvaAmount_ < 0) {
      throw new Error('Les paramètres doivent être des nombres positifs.');
    }

    this.totalAmount = amountHT_ + tvaAmount_;

    return this.totalAmount;
  }

  onSubmit(): void {
    this.submittingForm = true;
    setTimeout(() => {
      this.submittingForm = false;
      this.navigationService.goToPage('paiement');
    }, 400);
  }

  storeCalculatedAmounts(amounts: Record<string, number>): void {
    if (!amounts || typeof amounts !== 'object') {
      throw new Error(
        'Le paramètre doit être un objet contenant des montants calculés.'
      );
    }
    const serializedAmounts: string = JSON.stringify(amounts);
    localStorage.setItem('lesAmounts', serializedAmounts);
  }
}
