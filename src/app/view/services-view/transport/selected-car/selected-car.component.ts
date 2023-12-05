import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../../store/services/session/local-storage.service';
import { NavigationService } from '../../../../store/helpers/navigation.service';
// import { LocalStorageService } from '../../../store/services/session/local-storage.service';
// import { NavigationService } from '../../../store/helpers/navigation.service';

@Component({
  selector: 'app-selected-car',
  templateUrl: './selected-car.component.html',
  styleUrls: ['./selected-car.component.scss'],
})
export class SelectedCarComponent implements OnInit {
  selectedVehicle: any; // Pour stocker l'élément sélectionné
  constructor(
    private localStorageService: LocalStorageService,
    private cdr: ChangeDetectorRef,
    private navigationService: NavigationService
  ) {}

  // Dans votre composant
  vehicleList: any[] = [];

  ngOnInit() {
    // Récupérer la liste des véhicules depuis le localStorage
    const storedData = this.localStorageService.getItem('availableCar');
    console.log('====> Les voici: ', JSON.stringify(this.selectedVehicle));
    if (storedData) {
      this.vehicleList = storedData;
      this.selectedVehicle = this.vehicleList[0]; // Sélectionner le premier élément par défaut
      console.log('====> Les voici: ', JSON.stringify(storedData));
    }
    const storedSelectedVehicle =
      this.localStorageService.getItem('selectedVehicle');

    if (storedSelectedVehicle) {
      this.selectedVehicle = storedSelectedVehicle;
    } else if (this.vehicleList.length > 0) {
      this.selectedVehicle = this.vehicleList[0];
      this.localStorageService.setItem('selectedVehicle', this.selectedVehicle);
    }
  }

  selectVehicle(vehicle: any): void {
    this.selectedVehicle = vehicle;
    this.cdr.detectChanges(); // Rafraîchir la vue
    this.localStorageService.setItem('selectedVehicle', this.selectedVehicle);
  }

  goTo(route_ohh: string): void {
    this.navigationService.goToPage(route_ohh);
  }
}
