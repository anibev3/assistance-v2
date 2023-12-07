import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { HeaderComponent } from './view/component/header/header.component';
import { FooterComponent } from './view/component/footer/footer.component';
// import { ShMenuCartPopItemEditTransportComponent } from './view/transport/components/sh-menu-cart-pop-item-edit-transport/sh-menu-cart-pop-item-edit-transport.component';
// import { TransHomeComponent } from './view/transport/trans-home/trans-home.component';
// import { PanierTransportComponent } from './view/transport/components/panier-transport/panier-transport.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './view/session/register/register.component';
import { LoginComponent } from './view/session/login/login.component';
// import { SelectedCarComponent } from './view/transport/selected-car/selected-car.component';
import { IgxCarouselModule, IgxListModule } from 'igniteui-angular';
// import { InfoPassager1Component } from './view/transport/info-passager1/info-passager1.component';
// import { InfoPassager2Component } from './view/transport/info-passager2/info-passager2.component';
import { ReplacePipe } from './store/helpers/replace.pipe';
import { TestComponent } from './view/test/test/test.component';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
// import { ResumComponent } from './view/transport/resum/resum.component';
// import { PaiementComponent } from './view/transport/paiement/paiement.component';
// import { SuccessComponent } from './view/transport/success/success.component';
// import { FailureComponent } from './view/transport/failure/failure.component';
import { HistoriqueComponent } from './view/historique/historique.component';
import { TabViewModule } from 'primeng/tabview';
import { PaginatorModule } from 'primeng/paginator';
import { CustomDatePipe } from './store/helpers/date.pipe';
import { HomeAssistanceComponent } from './view/services-view/assistance/home-assistance/home-assistance.component';
import { TransHomeComponent } from './view/services-view/transport/trans-home/trans-home.component';
import { TpDetailResComponent } from './view/services-view/transport/tp-detail-res/tp-detail-res.component';
import { PanierTransportComponent } from './view/services-view/transport/components/panier-transport/panier-transport.component';
import { ShMenuCartPopItemEditTransportComponent } from './view/services-view/transport/components/sh-menu-cart-pop-item-edit-transport/sh-menu-cart-pop-item-edit-transport.component';
import { SelectedCarComponent } from './view/services-view/transport/selected-car/selected-car.component';
import { ResumComponent } from './view/services-view/transport/resum/resum.component';
import { InfoPassager1Component } from './view/services-view/transport/info-passager1/info-passager1.component';
import { PaiementComponent } from './view/services-view/components/paiement.component';
import { SuccessComponent } from './view/services-view/transport/success/success.component';
import { FailureComponent } from './view/services-view/transport/failure/failure.component';
import { DetailResComponent } from './view/services-view/assistance/detail-res/detail-res.component';
import { ProfilComponent } from './view/profil/profil.component';
import { RsDepartComponent } from './view/services-view/assistance/components/rs-depart.component';
import { RsArriveeComponent } from './view/services-view/assistance/components/rs-arrivee.component';
import { RsTransitComponent } from './view/services-view/assistance/components/rs-transit.component';
import { ExtraComponent } from './view/services-view/assistance/extra/extra.component';
import { AssisInfoPassenger1Component } from './view/services-view/assistance/assis-info-passenger-1/assis-info-passenger-1.component';
import { AssisInfoPassenger2Component } from './view/services-view/assistance/assis-info-passenger-2/assis-info-passenger-2.component';
import { ResumAssisComponent } from './view/services-view/assistance/resum-assis/resum-assis.component';
import { AssisServicesComponent } from './view/services-view/assistance/assis-services/assis-services.component';
import { MapStartReservationTransportComponent } from './view/services-view/transport/map-start-reservation-transport/map-start-reservation-transport.component';
// import { DetailResComponent } from './view/assistance/detail-res/detail-res.component';
// import { TpDetailResComponent } from './view/transport/tp-detail-res/tp-detail-res.component';
// import { HomeAssistanceComponent } from './view/assistance/home-assistance/home-assistance.component';

// import { MapStartReservationTransportComponent } from './view/transport/map-start-reservation-transport/map-start-reservation-transport.component';
// import { MapStartReservationTransportComponent } from './view/transport/map-start-reservation-transport/map-start-reservation-transport.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    TransHomeComponent,
    ShMenuCartPopItemEditTransportComponent,
    PanierTransportComponent,
    RegisterComponent,
    LoginComponent,
    SelectedCarComponent,
    InfoPassager1Component,
    InfoPassager1Component,
    ReplacePipe,
    ResumComponent,
    PaiementComponent,
    SuccessComponent,
    FailureComponent,
    HistoriqueComponent,
    CustomDatePipe,
    DetailResComponent,
    TpDetailResComponent,
    HomeAssistanceComponent,
    ProfilComponent,
    RsDepartComponent,
    RsArriveeComponent,
    RsTransitComponent,
    ExtraComponent,
    AssisInfoPassenger1Component,
    AssisInfoPassenger2Component,
    ResumAssisComponent,
    AssisServicesComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GoogleMapsModule,
    HttpClientModule,
    IgxCarouselModule,
    IgxListModule,
    BrowserAnimationsModule,
    TabViewModule,
    PaginatorModule,
    ReactiveFormsModule,
    MapStartReservationTransportComponent,
  ],
})
export class AppModule {}
