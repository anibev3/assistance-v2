import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { AuthGuardService } from './store/auth-guard.service';
import { ShMenuCartPopItemEditTransportComponent } from './view/transport/components/sh-menu-cart-pop-item-edit-transport/sh-menu-cart-pop-item-edit-transport.component';
import { TransHomeComponent } from './view/transport/trans-home/trans-home.component';
import { MapStartReservationTransportComponent } from './view/transport/map-start-reservation-transport/map-start-reservation-transport.component';
import { LoginComponent } from './view/session/login/login.component';
import { SelectedCarComponent } from './view/transport/selected-car/selected-car.component';
import { InfoPassager1Component } from './view/transport/info-passager1/info-passager1.component';
import { InfoPassager2Component } from './view/transport/info-passager2/info-passager2.component';
import { TestComponent } from './view/test/test/test.component';
import { ResumComponent } from './view/transport/resum/resum.component';
import { PaiementComponent } from './view/transport/paiement/paiement.component';
import { SuccessComponent } from './view/transport/success/success.component';
import { FailureComponent } from './view/transport/failure/failure.component';
import { HistoriqueComponent } from './view/historique/historique.component';
import { TpDetailResComponent } from './view/transport/tp-detail-res/tp-detail-res.component';
import { DetailResComponent } from './view/assistance/detail-res/detail-res.component';
import { HomeAssistanceComponent } from './view/assistance/home-assistance/home-assistance.component';
// import { DetailResComponent } from './view/assistance/detail-res/detail-res.component';
// import { MapStartReservationTransportComponent } from './view/transport/map-start-reservation-transport/map-start-reservation-transport.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'transport', component: TransHomeComponent },

  {
    path: 'map',
    component: MapStartReservationTransportComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'car',
    component: SelectedCarComponent,
  },
  {
    path: 'info-passager-n',
    component: InfoPassager1Component,
  },
  {
    path: 'info-passager-m',
    component: InfoPassager2Component,
  },
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: 'resum',
    component: ResumComponent,
  },
  {
    path: 'paiement',
    component: PaiementComponent,
  },

  {
    path: 'success',
    component: SuccessComponent,
  },

  {
    path: 'failure',
    component: FailureComponent,
  },

  {
    path: 'historique',
    component: HistoriqueComponent,
  },
  { path: 'assist-res-detail', component: DetailResComponent },
  { path: 'transp-res-detail', component: TpDetailResComponent },
  { path: 'assistance', component: HomeAssistanceComponent },
  // {
  //   path: 'paiement-reservation',
  //   component: PaiementReservationComponent,
  //   canActivate: [AuthGuardService],
  // },
  // {
  //   path: '',
  //   component: MenuComponent,
  //   children: [
  //     { path: 'list-hotel', component: ListHotelComponent },
  //     { path: 'list-hotel', component: ListHotelComponent },
  //     { path: 'list-hotel', component: ListHotelComponent },
  //     { path: 'list-hotel', component: ListHotelComponent },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
