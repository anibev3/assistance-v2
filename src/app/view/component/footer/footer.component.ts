import { Component } from '@angular/core';
import { AuthService } from '../../../store/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {
    this.email, this.password;
  }

  onSubmit() {
    const credentials = { username: this.email, password: this.password };

    console.log('+++++++++++++++++++++++++++++++++');
    console.log(credentials, this.email);
    console.log('+++++++++++++++++++++++++++++++++');

    // this.authService.login(credentials).subscribe(
    //   (response) => {
    //     console.log(response);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }
}
