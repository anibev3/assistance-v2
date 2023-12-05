import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trans-home',
  templateUrl: './trans-home.component.html',
  styleUrl: './trans-home.component.css',
})
export class TransHomeComponent {
  constructor(private router: Router) {}

  goToTransportMapPage(): void {
    this.router.navigate(['/map']).then(() => {
      window.location.reload();
    });
  }
}
