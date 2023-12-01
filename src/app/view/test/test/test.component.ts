import { Component, OnInit, inject } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

/**
 * @title Snack-bar with an annotated custom component
 */

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
})
export class TestComponent implements OnInit {
  durationInSeconds = 5;

  constructor(private _snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.openSnackBar();
  }
  openSnackBar() {
    this._snackBar.openFromComponent(PizzaPartyAnnotatedComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}

@Component({
  selector: 'snack-bar-annotated-component-example-snack',
  template: ` <span class="example-pizza-party" matSnackBarLabel>
      Pizza party!!!
    </span>
    <span matSnackBarActions>
      <button
        mat-button
        matSnackBarAction
        (click)="snackBarRef.dismissWithAction()"
      >
        🍕
      </button>
    </span>`,
  styles: [
    `
      :host {
        display: flex;
      }

      .example-pizza-party {
        color: hotpink;
      }
    `,
  ],
  standalone: true,
  imports: [
    MatButtonModule,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
  ],
})
export class PizzaPartyAnnotatedComponent {
  snackBarRef = inject(MatSnackBarRef);
}
