import { ChangeDetectorRef, Component } from '@angular/core';
import { LocalStorageService } from '../../../store/services/session/local-storage.service';
import { NavigationService } from '../../../store/helpers/navigation.service';

@Component({
  selector: 'app-info-passager1',
  templateUrl: './info-passager1.component.html',
  styleUrl: './info-passager1.component.css',
})
export class InfoPassager1Component {
  constructor(
    private localStorageService: LocalStorageService,
    private cdr: ChangeDetectorRef,
    private navigationService: NavigationService
  ) {}

  goTo(route_ohh: string): void {
    this.navigationService.goToPage(route_ohh);
  }
}
