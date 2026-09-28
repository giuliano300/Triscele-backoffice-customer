import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationStateService {
  private readonly orders = new BehaviorSubject<number>(0);
  readonly orders$ = this.orders.asObservable();

  private readonly quotations = new BehaviorSubject<number>(0);
  readonly quotations$ = this.quotations.asObservable();

  setInitialCounts(orders: number, quotations: number): void {
    this.orders.next(orders);
    this.quotations.next(quotations);
  }
}
