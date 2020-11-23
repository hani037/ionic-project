import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Product} from "../../model/product";
import {sailor} from "../../model/sailor";
import {Address_lat_long} from "../../model/address_lat_long";
import {ClientReview} from "../../model/ClientReview";
import {Sailor} from "../../model/order";

@Injectable({
  providedIn: 'root'
})
export class SailorService {
  public add_image = new BehaviorSubject<boolean>(null);
    sailorUrl = '/api/v1/sailors';
  constructor(private http: HttpClient) { }
  getSailors(): Observable<{content: sailor[],totalElements:number}> {
    return this.http.post<{content: sailor[],totalElements:number}>(this.sailorUrl+'/search',{});
  }
  getSailor(id){
    return this.http.get<Sailor>('api/v1/sailors/'+id);

  }
  updateSailor(sailor:Sailor){
    return this.http.put<Sailor>('api/v1/sailors/',sailor);

  }
  getSailorByToken(){
    return this.http.get<Sailor>('api/v1/sailors');

  }
  search(sailor: string, distance: number, address: Address_lat_long,page,size) {
     const obj={searchText:sailor}

    return this.http.post<{content: sailor[],totalElements:number}>(this.sailorUrl+'/search?page='+page+'&size='+size,obj
    )


  }
  getsailor_page(page:number, size:number ): Observable<{ content: sailor[],totalElements:number }> {
    return this.http.post<{content: sailor[],totalElements:number}>(this.sailorUrl+'/search?page='+page+'&size='+size,{});
  }
  uploadImage(file)  {

    this.http.put<void>(this.sailorUrl  + '/image/' , {base64:file}).subscribe(data=>{
      this.add_image.next(true);
    });
  }
}
