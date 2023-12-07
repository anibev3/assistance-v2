import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { AuthGuardService } from './store/auth-guard.service';
import { SuccessComponent } from './view/services-view/transport/success/success.component';
import { FailureComponent } from './view/services-view/transport/failure/failure.component';
import { HistoriqueComponent } from './view/historique/historique.component';
import { DetailResComponent } from './view/services-view/assistance/detail-res/detail-res.component';
import { PaiementComponent } from './view/services-view/components/paiement.component';
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
import { AssisInfoPassenger1Component } from './view/services-view/assistance/assis-info-passenger-1/assis-info-passenger-1.component';
import { AssisInfoPassenger2Component } from './view/services-view/assistance/assis-info-passenger-2/assis-info-passenger-2.component';
import { ResumAssisComponent } from './view/services-view/assistance/resum-assis/resum-assis.component';
import { AuthGuard } from './store/fonctions/auth.gard';
import { AssisServicesComponent } from './view/services-view/assistance/assis-services/assis-services.component';

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
    canActivate: [AuthGuard],
  },
  {
    path: 'info-passager-n',
    component: InfoPassager1Component,
    canActivate: [AuthGuard],
  },
  {
    path: 'info-passager-m',
    component: InfoPassager2Component,
    canActivate: [AuthGuard],
  },
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: 'resum',
    component: ResumComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'paiement',
    component: PaiementComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'success',
    component: SuccessComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'failure',
    component: FailureComponent,
  },

  {
    path: 'historique',
    component: HistoriqueComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'assist-res-detail',
    component: DetailResComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'transp-res-detail',
    component: TpDetailResComponent,
    canActivate: [AuthGuard],
  },
  { path: 'assistance', component: HomeAssistanceComponent },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },
  { path: 'extra', component: ExtraComponent, canActivate: [AuthGuard] },
  {
    path: 'assis-info-passenger-m',
    component: AssisInfoPassenger1Component,
    canActivate: [AuthGuard],
  },
  {
    path: 'assis-info-passenger-n',
    component: AssisInfoPassenger2Component,
    canActivate: [AuthGuard],
  },
  {
    path: 'assis-resum-info',
    component: ResumAssisComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'assis-services',
    component: AssisServicesComponent,
  },
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
