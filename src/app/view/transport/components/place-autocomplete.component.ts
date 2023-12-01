import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

export interface PlaceSearchResult {
  address: string;
  location?: google.maps.LatLng;
  imageUrl?: string;
  iconUrl?: string;
  name?: string;
}

@Component({
  selector: 'app-place-autocomplete',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule],
  template: `
    <!-- <mat-form-field appearance="outline">
      <input />
    </mat-form-field> -->

    <!-- <div class="col-12">
      <div class="input-style-2 input-required">
        <span class="input-style-1-active"></span>
        <input type="text"  />
      </div>
    </div> -->

    <!-- <div class="col-12"> -->
    <div class="input-style input-style-2 input-required mb-3">
      <span class="color-highlight input-style-1-active">{{ label }}</span>
      <!-- <em>(*)</em> -->
      <input
        class="form-control"
        type="text"
        [placeholder]="placeholder"
        #inputField
        matInput
        required
      />
    </div>
    <!-- </div> -->
  `,
  styles: [
    `
      .mat-form-field {
        width: 100%;
      }
    `,
  ],
})
export class PlaceAutocompleteComponent implements OnInit {
  @ViewChild('inputField')
  inputField!: ElementRef;

  @Input() placeholder = 'Enter address...';
  @Input() label = 'Lieux';

  @Output() placeChanged = new EventEmitter<PlaceSearchResult>();

  autocomplete: google.maps.places.Autocomplete | undefined;

  listener: any;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.inputField.nativeElement
    );

    this.autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = this.autocomplete?.getPlace();
        const result: PlaceSearchResult = {
          address: this.inputField.nativeElement.value,
          name: place?.name,
          location: place?.geometry?.location,
          imageUrl: this.getPhotoUrl(place),
          iconUrl: place?.icon,
        };
        console.log(
          'Voici les coordonné de la place: ' +
            this.inputField.nativeElement.value,
          place?.name,
          place?.geometry?.location,
          this.getPhotoUrl(place),
          place?.icon
        );

        console.log('result : ', result);

        this.placeChanged.emit(result);
      });
    });
  }

  getPhotoUrl(
    place: google.maps.places.PlaceResult | undefined
  ): string | undefined {
    return place?.photos && place?.photos.length > 0
      ? place?.photos[0].getUrl({ maxWidth: 500 })
      : undefined;
  }

  ngOnDestroy() {
    if (this.autocomplete) {
      google.maps.event.clearInstanceListeners(this.autocomplete);
    }
  }
}
