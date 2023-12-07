import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../store/helpers/navigation.service';
import { PaiementService } from '../../../store/services/paiement/paiement.service';
import { LocalStorageService } from '../../../store/services/session/local-storage.service';
import { FormControl, FormGroup } from '@angular/forms';
// import { NavigationService } from '../../../store/helpers/navigation.service';
// import { PaiementService } from '../../../store/services/paiement/paiement.service';
// import { LocalStorageService } from '../../../store/services/session/local-storage.service';

@Component({
  selector: 'app-paiement',
  template: `
    <div class="theme-light" data-highlight="blue2">
      <div id="preloader">
        <div class="spinner-border color-highlight" role="status"></div>
      </div>

      <div id="page">
        <!-- header and footer bar go here-->

        <div class="page-content py-0 my-0">
          <div class="page-title page-title-small">
            <h2 class="font-12">
              <a href="#" data-back-button><i class="fa fa-arrow-left"></i></a
              >Paiement
            </h2>
          </div>

          <div class="card header-card" data-card-height="150">
            <div class="card-overlay bg-black opacity-0"></div>
            <div class="card-overlay dark-mode-tint"></div>
            <div
              class="card-bg preload-img"
              data-src="assets/images/pictures/20s.jpg"
            ></div>
          </div>
          <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
            <div class="card card-style">
              <div class="content">
                <div class="d-flex justify-content-between">
                  <div
                    class="align-self-center align-item-center"
                    style="margin-top: -10px"
                  >
                    <h1 class="mb-n2 font-14 font-700">Entreprise ?</h1>
                  </div>
                  <div
                    class="d-flex justify-content-between"
                    style="margin: -15px"
                  >
                    <div
                      [class.selected-option]="selectedOption === true"
                      class="content rounded-s shadow-xs"
                      (click)="selectOption(true); toggleCollapse()"
                      data-toast="sh-alert"
                      style="height: 30px; width: 58px"
                    >
                      <h1
                        class="mb-n2 font-14 font-700 mb-0 text-center"
                        style="margin-left: -3px"
                      >
                        OUI
                      </h1>
                    </div>
                    <div
                      [class.rs-for-me-option]="selectedOption === false"
                      class="content rounded-s shadow-xs"
                      (click)="selectOption(false); toggleCollapse()"
                      data-toast="sh-alert"
                      style="height: 30px; width: 58px"
                    >
                      <h1
                        class="mb-n2 font-14 font-700 mb-0 text-center"
                        style="margin-left: -3px"
                      >
                        NON
                      </h1>
                    </div>
                  </div>
                </div>

                <br />

                <div>
                  <div *ngIf="!isCollapseVisible">
                    <div class="input-style input-style-2 input-required mb-3">
                      <span class="color-highlight input-style-1-active"
                        >Prénom</span
                      >
                      <em>(*)</em>
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Entrez le prénom"
                        formControlName="prenomFacturation"
                      />
                    </div>
                    <div class="input-style input-style-2 input-required mb-3">
                      <span class="color-highlight input-style-1-active"
                        >Nom</span
                      >
                      <em>(*)</em>
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Entrez le nom"
                        formControlName="nomFacturation"
                      />
                    </div>
                  </div>

                  <div class="text-center my-1 py-0">
                    <div
                      [ngClass]="{
                        collapse: !isCollapseVisible,
                        show: isCollapseVisible
                      }"
                      id="collapse-price"
                    >
                      <div
                        class="input-style input-style-2 input-required mb-3"
                      >
                        <span class="color-highlight input-style-1-active"
                          >Non de l'entreprise</span
                        >

                        <input
                          class="form-control"
                          type="text"
                          placeholder="Ex: +225 07 08 00 77 31"
                          formControlName="nomEntrepriseFacturation"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="input-style input-style-2 input-required mb-3">
                    <span class="color-highlight input-style-1-active"
                      >Adresse</span
                    >
                    <em>(*)</em>
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Entrez l'Adresse de notification"
                      formControlName="adresseFacturation"
                    />
                  </div>

                  <div class="input-style input-style-2 mb-3 input-required">
                    <div class="input-style-2 input-required">
                      <span class="input-style-1-active">Pays</span>
                    </div>
                    <em><i class="fa fa-angle-down"></i></em>
                    <select
                      class="form-control"
                      formControlName="paysFacturation"
                    >
                      <option selected disabled>Bagages</option>
                      <option value="1">1</option>

                      <option value="2">2</option>
                    </select>
                  </div>

                  <div class="row mb-0">
                    <div class="col-7">
                      <div class="input-style input-style-2 input-required">
                        <span class="input-style-1-active">Ville</span>
                        <em><i class="fa fa-angle-down"></i></em>
                        <select
                          class="form-control"
                          formControlName="villeFacturation"
                        >
                          <option selected disabled>Bagages</option>
                          <option value="1">1</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-5">
                      <div class="input-style input-style-2 input-required">
                        <span class="color-highlight input-style-1-active"
                          >Code postal</span
                        >
                        <em>(*)</em>
                        <input
                          class="form-control"
                          type="text"
                          placeholder="Ex: 123"
                          formControlName="codePostalFacturation"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="card mt-4 preload-img mb-0"
              data-src="assets/images/pictures/20s.jpg"
            >
              <div class="card-body py-4">
                <h2 class="color-white text-center">Confirmer le Paiement</h2>
                <p class="color-white boxed-text-xl">
                  Appuyer sur le bouton pour confirmer le paiement
                </p>
                <div class="card card-style mx-0">
                  <div class="content">
                    <div class="row mt-2 mb-0">
                      <div class="col-6 text-left">
                        <h6 class="font-600">Total</h6>
                      </div>
                      <div class="col-6 text-right">
                        <h6 class="font-600">0 <sup>A</sup></h6>
                      </div>
                      <div class="col-6 text-left">
                        <h6 class="font-600 color-blue2-dark">
                          Réduction Fidelux
                        </h6>
                      </div>
                      <div class="col-6 text-right">
                        <h6 class="font-600 color-blue2-dark">
                          -10 000 <sup>FCFA</sup>
                        </h6>
                      </div>
                      <div class="col-12">
                        <div class="divider mt-1 mb-2"></div>
                      </div>
                      <div class="col-6 text-left"><h4>Total à payer</h4></div>
                      <div class="col-6 text-right">
                        <h4>90 000 <sup>FCFA</sup></h4>
                      </div>
                    </div>

                    <div class="divider mt-1"></div>

                    <button
                      class="btn btn-full bg-highlight btn-m rounded-sm shadow-xl text-uppercase font-900 mb-2 w-100"
                      type="submit"
                      [disabled]="submittingForm"
                    >
                      <!-- [disabled]="myForm.invalid"
              > -->
                      <span *ngIf="!submittingForm">Continuez</span>
                      <span
                        *ngIf="submittingForm"
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="card-overlay bg-black opacity-95"></div>
              <div class="card-overlay dark-mode-tint"></div>
            </div>
          </form>
        </div>
        <!-- end of page content-->

        <!-- <div
          id="sh-menu-cart-pop-item-edit"
          data-menu-load="sh-menu-cart-pop-item-edit.html"
          class="menu menu-box-bottom menu-box-detached rounded-m"
          data-menu-height="455"
          data-menu-effect="menu-over"
        ></div> -->

        <div
          id="sh-menu-success-2"
          class="menu menu-box-bottom menu-box-detached bg-blue2-dark rounded-m"
          data-menu-height="305"
          data-menu-effect="menu-over"
        >
          <h3 class="text-center mt-4">
            <i
              class="fa fa-3x fa-check-circle color-white shadow-xl rounded-circle"
            ></i>
          </h3>
          <h5 class="text-center mt-3 text-uppercase font-700 color-white">
            Paiement effectué avec succès
          </h5>
          <p class="my-0 boxed-text-l color-white opacity-70">
            Vous recevrez par email les détails de votre paiement et la
            confirmation de votre réservation
          </p>
          <p class="my-0 boxed-text-l color-white opacity-70">
            Merci de votre confiance
          </p>
          <a
            href="sh-reservation.html"
            class="my-2 btn btn-m btn-center-m button-s shadow-l rounded-s text-uppercase font-900 bg-white"
            >Terminer</a
          >
        </div>
      </div>
    </div>

    <div
      class="snackbar-toast bg-green1-dark color-white text-center"
      style="
    margin-bottom: calc(100px + (env(safe-area-inset-bottom)) * 1.1) !important;
    background-color: rgb(193, 14, 14) !important;
  "
      *ngIf="showSnackbar"
    >
      <i class="fa fa-shopping-cart mr-3"></i>Remplissez tous les champs
    </div>
  `,
  styles: [``],
})
export class PaiementComponent implements OnInit {
  myForm!: FormGroup;
  infoRs: any = [];
  infoRs2: any = [];
  infoRs3: any = [];
  infoRs4: any = [];
  str1: string = 'airports';
  str2: string = 'assistanceDepartReservationInfo';
  str3: string = 'assistancArriveeReservationInfo';
  str4: string = 'assistanceTransitReservationInfo';
  str5: string = 'adresse-de-facturation';
  str6: string = 'assis-depart-info';
  str7: string = 'lesAmounts';
  str8: string = 'depart-extra-info';

  service01: string = 'SER0001';
  service02: string = 'SER0002';
  service03: string = 'SER0003';

  loading: boolean = true;
  theAirport: any = {};
  airports: any = {};
  selectedOptions: any[] = [];
  showSnackbar: boolean = false;
  submittingForm: boolean = false;
  selectedOption: boolean | null = false;
  isCollapseVisible: boolean | null = false;
  isAssistance: boolean | null = false;

  constructor(
    private navigationService: NavigationService,
    private paiementService: PaiementService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.airports = this.localStorageService.getItem(this.str1);
    this.infoRs = this.localStorageService.getItem(this.str5);
    this.infoRs2 = this.localStorageService.getItem(this.str6);
    this.infoRs3 = this.localStorageService.getItem(this.str7);
    this.infoRs4 = this.localStorageService.getItem(this.str8);

    console.log('this.infoRs2.code_service', this.infoRs2.code_service);

    if (
      this.infoRs2.code_service === this.service01 ||
      this.infoRs2.code_service === this.service02 ||
      this.infoRs2.code_service === this.service03
    ) {
      this.isAssistance = true;
    }

    if (this.infoRs) {
      this.selectedOption = this.infoRs.isEntreprise;
      if (this.selectedOption) {
        this.isCollapseVisible = true;
      }
      this.myForm = new FormGroup({
        isEntreprise: new FormControl(this.infoRs.isEntreprise),
        prenomFacturation: new FormControl(this.infoRs.prenomFacturation),
        nomFacturation: new FormControl(this.infoRs.nomFacturation),
        adresseFacturation: new FormControl(this.infoRs.adresseFacturation),
        villeFacturation: new FormControl(this.infoRs.villeFacturation),
        codePostalFacturation: new FormControl(
          this.infoRs.codePostalFacturation
        ),
        paysFacturation: new FormControl(this.infoRs.paysFacturation),
        nomEntrepriseFacturation: new FormControl(
          this.infoRs.nomEntrepriseFacturation
        ),
      });
      console.log('Info dispo en storage', this.infoRs);
      // console.log('Info dispo en storage', this.myForm.value);

      // this.selectedOptions = this.infoRs.options || [];
    } else {
      console.log('Il n y a aucune donnée en storage');

      // Si les données ne sont pas présentes, créez un nouveau formulaire
      const currentDate = new Date().toISOString().split('T')[0]; // Format "YYYY-MM-DD"
      this.myForm = new FormGroup({
        isEntreprise: new FormControl(''),
        prenomFacturation: new FormControl(''),
        nomFacturation: new FormControl(''),
        adresseFacturation: new FormControl(''),
        villeFacturation: new FormControl(''),
        codePostalFacturation: new FormControl(''),
        paysFacturation: new FormControl(''),
        nomEntrepriseFacturation: new FormControl(''),
      });
    }

    // this.getAirportInfo(this.infoRs.departure_airport_id);
    this.loading = false;
  }

  onSubmit() {
    this.submittingForm = true;
    // Vérifiez si le formulaire est valide
    this.myForm.value.isEntreprise = this.selectedOption;
    console.log('this.myForm.valid', this.myForm.valid);
    console.log('this.myForm.value', this.myForm.value);
    console.log('reservation for me', this.selectedOption);

    setTimeout(() => {
      this.submittingForm = false;
    }, 300);

    if (this.myForm.value.isEntreprise) {
      if (
        !this.myForm.value.villeFacturation ||
        !this.myForm.value.codePostalFacturation ||
        !this.myForm.value.adresseFacturation ||
        !this.myForm.value.paysFacturation ||
        !this.myForm.value.nomEntrepriseFacturation
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
    } else {
      if (
        !this.myForm.value.prenomFacturation ||
        !this.myForm.value.nomFacturation ||
        !this.myForm.value.adresseFacturation ||
        !this.myForm.value.villeFacturation ||
        !this.myForm.value.codePostalFacturation ||
        !this.myForm.value.adresseFacturation ||
        !this.myForm.value.paysFacturation
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
    }

    this.infoRs = this.myForm.value;

    this.localStorageService.setItem(this.str5, this.infoRs);

    setTimeout(() => {
      this.submittingForm = false;
      this.processToPaiement();

      console.log(this.generateCartItems());
    }, 300);
  }

  goTo(route_ohh: string): void {
    this.navigationService.goToPage(route_ohh);
  }

  processToPaiement(): void {
    const vehiculePrice = 10000;
    const totalTVA = 20000;

    let cart: any[] = [];
    console.log('this.isAssistance', this.isAssistance);

    if (this.isAssistance) {
      cart = this.generateCartItems();
    } else {
      cart = [
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
    }

    console.log('la carte avant soumission', cart);

    this.paiementService.initiatePayment(cart).subscribe(
      (paymentResponse) => {
        console.log('La response de l api de strip', paymentResponse);

        if (paymentResponse.success) {
          if (this.infoRs2.code_service === this.service01) {
            this.localStorageService.setItem(
              'arrival_payment_id',
              paymentResponse.data.session_id
            );
          } else if (this.infoRs2.code_service === this.service02) {
            this.localStorageService.setItem(
              'departure_payment_id',
              paymentResponse.data.session_id
            );
          } else if (this.infoRs2.code_service === this.service03) {
            this.localStorageService.setItem(
              'transit_payment_id',
              paymentResponse.data.session_id
            );
          } else {
            this.localStorageService.setItem(
              'transport_payment_id',
              paymentResponse.data.session_id
            );
          }

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

  generateCartItems(): CartItem[] {
    const carts: CartItem[] = [];

    const cart1: CartItem = {
      name: this.infoRs2.name,
      price: this.infoRs3.servicePrice,
      quantity: 1,
    };
    carts.push(cart1);

    if (this.infoRs4.options.length !== 0 || this.infoRs4.options !== null) {
      // let totalMontant = 0;
      // for (const montant of this.arrivalForm.option_id) {
      //   totalMontant += parseInt(montant, 10);
      // }

      const cart2: CartItem = {
        name: 'Extra',
        price: this.infoRs3.extra_amount,
        quantity: 1,
      };
      carts.push(cart2);
    }

    if (this.infoRs3.additional_passenger_amount !== 0) {
      const cart3: CartItem = {
        name: 'Passagers en plus',
        price: this.infoRs3.additional_passenger_amount,
        quantity: 1,
      };
      carts.push(cart3);
    }

    if (this.infoRs3.additional_bags_amount !== 0) {
      const cart5: CartItem = {
        name: 'Bagages en plus',
        price: this.infoRs3.additional_bags_amount,
        quantity: 1,
      };
      carts.push(cart5);
    }

    const cart6: CartItem = {
      name: 'Montant TVA',
      price: this.infoRs3.tvaAmount,
      quantity: 1,
    };
    carts.push(cart6);

    return carts;
  }
}

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
}
