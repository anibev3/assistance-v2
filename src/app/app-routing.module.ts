import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { AuthGuardService } from './store/auth-guard.service';
import { SuccessComponent } from './view/services-view/transport/success/success.component';
import { FailureComponent } from './view/services-view/transport/failure/failure.component';
import { HistoriqueComponent } from './view/historique/historique.component';
import { DetailResComponent } from './view/services-view/assistance/detail-res/detail-res.component';
import { PaiementComponent } from './view/services-view/transport/paiement/paiement.component';
import { TestComponent } from './view/test/test/test.component';
import { ResumComponent } from './view/services-view/transport/resum/resum.component';
import { InfoPassager2Component } from './view/services-view/transport/info-passager2/info-passager2.component';
import { TpDetailResComponent } from './view/services-view/transport/tp-detail-res/tp-detail-res.component';
import { HomeAssistanceComponent } from './view/services-view/assistance/home-assistance/home-assistance.component';
import { InfoPassager1Component } from './view/services-view/transport/info-passager1/info-passager1.component';
import { LoginComponent } from './view/session/login/login.component';
import { SelectedCarComponent } from './view/services-view/transport/selected-car/selected-car.component';
import { TransHomeComponent } from './view/services-view/transport/trans-home/trans-home.component';
import { MapStartReservationTransportComponent } from './view/services-view/transport/map-start-reservation-transport/map-start-reservation-transport.component';
import { ProfilComponent } from './view/profil/profil.component';
import { ExtraComponent } from './view/services-view/assistance/extra/extra.component';

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
  { path: 'profil', component: ProfilComponent },
  { path: 'extra', component: ExtraComponent },
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
