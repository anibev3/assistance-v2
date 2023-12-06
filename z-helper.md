.toLocaleString("fr-FR", {
maximumFractionDigits: 0
})

<!-- ________________________________ -->

showSnackbar: boolean = false;

<div
            class="snackbar-toast bg-green1-dark color-white"
            style="
              margin-bottom: calc(
                100px + (env(safe-area-inset-bottom)) * 1.1
              ) !important;
              background-color: rgb(255, 0, 0) !important;
            "
            *ngIf="showSnackbar"
          >
            <i class="fa fa-shopping-cart mr-3"></i>Ajouté avec succès
          </div>
