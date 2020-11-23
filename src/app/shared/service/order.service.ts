import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../../model/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  addresssUrl = '/api/v1/orders';

  constructor(private http: HttpClient) { }

  createDraftOrder(): Observable<Order> {
    return this.http.post<Order>(this.addresssUrl +'/draft', {});
  }
  getOrder(): Observable<Order[]> {
    return this.http.get<Order[]>(this.addresssUrl);
  }
}
