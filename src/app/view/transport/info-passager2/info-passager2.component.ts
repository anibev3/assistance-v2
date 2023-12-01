import { Component } from '@angular/core';
import { NavigationService } from '../../../store/helpers/navigation.service';

@Component({
  selector: 'app-info-passager2',
  templateUrl: './info-passager2.component.html',
  styleUrl: './info-passager2.component.css',
})
export class InfoPassager2Component {
  constructor(private navigationService: NavigationService) {}

  goTo(route_ohh: string): void {
    this.navigationService.goToPage(route_ohh);
  }
}
