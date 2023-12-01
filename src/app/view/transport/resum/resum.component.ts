import { Component } from '@angular/core';
import { NavigationService } from '../../../store/helpers/navigation.service';

@Component({
  selector: 'app-resum',
  templateUrl: './resum.component.html',
  styleUrl: './resum.component.css',
})
export class ResumComponent {
  constructor(private navigationService: NavigationService) {}

  goTo(route_ohh: string): void {
    this.navigationService.goToPage(route_ohh);
  }
}
