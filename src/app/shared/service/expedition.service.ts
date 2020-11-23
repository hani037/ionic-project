import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Expedition} from "../../model/order";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExpeditionService {
  addresssUrl = '/api/v1/expeditions';

  constructor(private http: HttpClient) { }

  getExpedition(): Observable<Expedition[]> {
    return this.http.get<Expedition[]>(this.addresssUrl);
  }

  getExpeditionSailor(): Observable<Expedition[]> {
      return this.http.get<Expedition[]>(this.addresssUrl+'/sailor');
  }

  changer_status(action: string, id:number) {
    return this.http.put<Expedition>(this.addresssUrl+'/'+id+'/status/'+action,{});
  }
}
