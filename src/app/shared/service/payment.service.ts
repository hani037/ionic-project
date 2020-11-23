import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Session} from "../../model/session";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  paymentsUrl = '/api/v1/payments';
  public panier = new BehaviorSubject<boolean>(null);

  constructor(private http: HttpClient) { }


  createSession(orderId): Observable<Session> {
    return this.http.post<Session>(this.paymentsUrl + '/session/order/' + orderId, null);
  }
  chargeCard(token: string): Observable<any>  {
    const headers = new HttpHeaders({'token': token});
    return this.http.post(this.paymentsUrl+'/charge', {token:token}, {headers: headers});
  }

}
