import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginInfo } from '../../models/session/session.model';

@Injectable({
  providedIn: 'root',
})
export class PaiementService {
  private baseUrl = 'https://payment.sherylux.com';
  // private authToken = 'votre_token';
  constructor(private http: HttpClient) {}

  initiatePayment(cart: any[]): Observable<any> {
    const form_data = {
      customer_email: 'assistancev2@email.com',
      success_url: 'http://localhost:4200/success',
      cancel_url: 'http://localhost:4200/failure',
      cart: cart,
    };

    console.log('======> la formData de stripe: ', form_data);

    return this.http.post<any>(`${this.baseUrl}/api/sendtopay`, form_data);
  }
}
