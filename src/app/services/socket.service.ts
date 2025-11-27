import { Injectable, NgZone } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { ToastrService } from 'ngx-toastr';
import { API_URL } from '../../main';
import { BehaviorSubject } from 'rxjs';
import { Customers } from '../interfaces/customers';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket: Socket;
  
  private _absenceCounter = new BehaviorSubject<number>(0);
  public absenceCounter$ = this._absenceCounter.asObservable();

  constructor(private toastr: ToastrService, private zone: NgZone) {
    this.socket = io(API_URL);
    // Debug connessione 
    // this.socket.on('connect', () => console.log('✅ Socket connesso, id:', this.socket.id)); 
    // this.socket.on('connect_error', (err) => console.error('❌ Errore connessione socket:', err)); 
    // this.socket.on('disconnect', (reason) => console.warn('⚠️ Socket disconnesso:', reason));
    this.listenForChangeOrderStatus();
  }


  // Contatori condivisi
  private _orders = new BehaviorSubject<number>(0);
  orders$ = this._orders.asObservable();

  private _quotations = new BehaviorSubject<number>(0);
  quotations$ = this._quotations.asObservable();

  private isCustomer(id: string) {
    const c = localStorage.getItem('customer');
    if(!c)
      return false;
    const customer: any  = JSON.parse(c);
    if(customer.c._id == id)
      return true;

    return false;
  }

  // -------------------------------------------------------------
  // 🔹 UTILITY: toastr configurato
  // -------------------------------------------------------------
  private notify(message: string, title: string, type: 'info' | 'error') {
    const options = {
      timeOut: 0,
      extendedTimeOut: 0,
      closeButton: true,
      tapToDismiss: false
    };

    type === 'info'
      ? this.toastr.info(message, title, options)
      : this.toastr.error(message, title, options);
  }

  // -------------------------------------------------------------
  // 🔹 LISTENER SOCKET
  // -------------------------------------------------------------
  private listenForChangeOrderStatus() {
    this.socket.on('updateOrderStatus', (data: { customerId: string, id: string, status: string}) => {
      //console.log('🔹 Evento updateOrderStatus ricevuto:', data); // log evento ricevuto
      if(this.isCustomer(data.customerId))
      {
        this.zone.run(() => {
          this.notify(
            `L'ammnistrazione ha cambiato stato in ${data.status} al tuo ordine con numero ordine : ${data.id}`,
            `Cambio stato ordine n. ${data.id}`,
            'info'
          );
        });
      }
    });
    this.socket.on('createOrderFromQuotation', (data: { customerId: string, id: string, status: string}) => {
      //console.log('🔹 Evento updateOrderStatus ricevuto:', data); // log evento ricevuto
      if(this.isCustomer(data.customerId))
      {
        this.zone.run(() => {
          this.notify(
            `L'ammnistrazione ha confermato e trasformato il tuo preventivo in ordine.`,
            `Conferma preventivo n. ${data.id}`,
            'info'
          );
        });

        // Aggiorna contatori
        this._orders.next(this._orders.value + 1);
        this._quotations.next(this._quotations.value - 1);
      }
    });
  }

  // Metodo per inizializzare i contatori con valori del backend
  public setInitialCounts(orders: number, quotations: number) {
    this._orders.next(orders);
    this._quotations.next(quotations);
  }
}
