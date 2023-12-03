import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../store/services/data/api.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.css',
})
export class HistoriqueComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getTransportHistory().subscribe(
      (responseData) => {
        console.log("voici l'historique: ", responseData);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
