import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { HeaderComponent } from './view/component/header/header.component';
import { FooterComponent } from './view/component/footer/footer.component';
import { ShMenuCartPopItemEditTransportComponent } from './view/transport/components/sh-menu-cart-pop-item-edit-transport/sh-menu-cart-pop-item-edit-transport.component';
import { TransHomeComponent } from './view/transport/trans-home/trans-home.component';
import { PanierTransportComponent } from './view/transport/components/panier-transport/panier-transport.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './view/session/register/register.component';
import { LoginComponent } from './view/session/login/login.component';
import { SelectedCarComponent } from './view/transport/selected-car/selected-car.component';
import { IgxCarouselModule, IgxListModule } from 'igniteui-angular';
import { InfoPassager1Component } from './view/transport/info-passager1/info-passager1.component';
import { InfoPassager2Component } from './view/transport/info-passager2/info-passager2.component';
import { ReplacePipe } from './store/helpers/replace.pipe';
import { TestComponent } from './view/test/test/test.component';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { ResumComponent } from './view/transport/resum/resum.component';
import { PaiementComponent } from './view/transport/paiement/paiement.component';

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
    InfoPassager2Component,
    ReplacePipe,
    ResumComponent,
    PaiementComponent,
    // TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GoogleMapsModule,
    HttpClientModule,
    IgxCarouselModule,
    IgxListModule,
    BrowserAnimationsModule,
    // NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
