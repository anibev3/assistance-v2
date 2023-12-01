import { Component } from '@angular/core';
import { AuthService } from '../../../store/auth.service';
import { LoginInfo } from '../../../store/models/session/session.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <!-- <body class="theme-light" data-highlight="blue2"> -->
    <div id="preloader" *ngIf="isLoading">
      <div class="spinner-border color-highlight" role="status"></div>
    </div>

    <div id="page">
      <div class="page-content bg-black pb-0">
        <div class="card bg-29 mt-4 pt-4" data-card-height="cover-card">
          <div class="card-center my-4">
            <div class="mx-4 mt-4 pt-4">
              <h1 class="text-center my-3 py-3">
                <img
                  src="assets/images/preload-logo-sh-white.png"
                  style="
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                    width: 80%;
                  "
                />
              </h1>
              <h6 class="text-center color-white font-12 font-300">
                Veuillez vous connecter <br />
              </h6>
              <div
                class="input-style input-light has-icon input-style-1 input-required pb-1"
              >
                <i class="input-icon fa fa-user color-white"></i>
                <span>Email</span>
                <input
                  type="email"
                  placeholder="Entrez votre adresse email"
                  name="email"
                  [(ngModel)]="email"
                />
              </div>

              <div
                class="input-style input-light has-icon input-style-1 input-required pb-1"
              >
                <i class="input-icon fa fa-user color-white"></i>
                <span>Mot de passe</span>
                <input
                  type="password"
                  placeholder="Entrez votre votre de passe"
                  name="password"
                  [(ngModel)]="password"
                />
              </div>

              <a
                href="#"
                class="btn btn-m mt-2 mb-4 btn-full bg-highlight rounded-sm text-uppercase font-900"
                (click)="login()"
                >Se Connecter</a
              >

              <div class="divider bg-white opacity-10 my-2"></div>

              <div class="row">
                <div class="col-12 text-center">
                  <a
                    href="sh-forgot.html"
                    class="text-center color-white font-12 font-300"
                    >Mot de passe oublié ?</a
                  >
                </div>
                <!-- <div class="col-6 text-right"><a href="sh-forgot.html" class="color-blue2-dark font-11 font-400">Récupérer mon mot de passe</a></div> -->
              </div>
            </div>
          </div>
          <div class="card-overlay bg-black opacity-80"></div>
        </div>
      </div>
      <!-- end of page content-->
    </div>
    <!-- </body> -->
  `,
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;

  private loginInfo: LoginInfo | undefined;

  constructor(private authService: AuthService, private router: Router) {
    this.email;
    this.password;
  }

  ngOnInit() {}

  login(): void {
    this.isLoading = true;
    this.loginInfo = {
      email: this.email,
      password: this.password,
    };
    console.log('this.loginInfo', JSON.stringify(this.loginInfo));

    this.authService.login(this.loginInfo).subscribe(
      (response) => {
        const { token, user } = response;
        this.authService.storeUserCredentials(token, user);
        console.log("Réponse de l'api : " + JSON.stringify(response));

        this.redirectToPreviousPage();
      },
      (error) => {
        console.log("L'erreur est : ", error);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  private redirectToPreviousPage(): void {
    // Récupérer l'URL de la page précédente depuis le service de navigation
    const returnUrl = this.authService.getReturnUrl();

    // Naviguer vers la page précédente ou une page par défaut si returnUrl est vide
    const navigateTo = returnUrl || '/home';
    this.router.navigate([navigateTo]).then(() => {
      window.location.reload();
    });

    // Réinitialiser l'URL de retour après la redirection
    this.authService.clearReturnUrl();
  }
}
