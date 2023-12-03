import { Component, OnInit, inject } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NavigationService } from '../../store/helpers/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  // private route__: Route__;

  constructor(
    private router: Router,
    private navigationService: NavigationService
  ) {}
  ngOnInit(): void {
    // window.location.reload();
  }

  goToTransportHomePage(): void {
    this.router.navigate(['/transport']).then(() => {
      window.location.reload();
    });
  }

  goTo(route_ohh: string): void {
    this.navigationService.goToPage(route_ohh);
  }
}

// export interface Route__ {
//   transportHome: string,
// }
