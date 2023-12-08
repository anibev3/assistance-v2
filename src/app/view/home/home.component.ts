import { Component, OnInit, inject } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NavigationService } from '../../store/helpers/navigation.service';
import { AuthService } from '../../store/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  // private route__: Route__;

  userInfo: any = {};
  isAuthenticateed: boolean = false;

  constructor(
    private router: Router,
    private navigationService: NavigationService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    // window.location.reload();

    if (this.authService.isAuthenticated()) {
      this.isAuthenticateed = true;
      this.userInfo = this.authService.getUser();
    }

    console.log('oh la', this.userInfo);
    console.log(this.authService.isAuthenticated());
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
