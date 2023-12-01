import { Component, OnInit, inject } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  // private route__: Route__;

  constructor(private router: Router) {}
  ngOnInit(): void {
    // window.location.reload();
  }

  goToTransportHomePage(): void {
    this.router.navigate(['/transport']).then(() => {
      window.location.reload();
    });
  }
}

// export interface Route__ {
//   transportHome: string,
// }
