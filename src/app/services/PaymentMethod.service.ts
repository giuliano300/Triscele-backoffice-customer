import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../main';
import { PaymentMethodOption } from '../interfaces/payment-method';
@Injectable({ providedIn: 'root' })
export class PaymentMethodService {
  private readonly apiUrl = API_URL + 'payment-methods';
  constructor(private readonly http: HttpClient) {}
  getPaymentMethods(): Observable<PaymentMethodOption[]> { return this.http.get<PaymentMethodOption[]>(this.apiUrl); }
}
