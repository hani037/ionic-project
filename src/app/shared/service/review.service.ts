import { Injectable } from '@angular/core';
import {Product} from "../../model/product";
import {HttpClient} from "@angular/common/http";
import {ClientReview} from "../../model/ClientReview";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  reviewUrl = '/api/v1/reviews';

  constructor(private http: HttpClient) { }
  get_product_review(product_ID){
    return this.http.get<ClientReview[]>(this.reviewUrl+'/product/'+product_ID);

  }

  create_product_review(Client_Review, id: string){
    return this.http.post<{}>(this.reviewUrl+'/product/'+id,Client_Review);

  }

  put_product_review(Client_Review, id: string){
    return this.http.put<{}>(this.reviewUrl+'/'+id,Client_Review);

  }
}
