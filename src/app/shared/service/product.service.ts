import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {from, Observable, of} from 'rxjs';
import { Product } from '../../model/product';
import {HTTP} from "@ionic-native/http/ngx";
import {Platform} from "@ionic/angular";
import {UserService} from "../../service/user.service";
import {Address_lat_long} from "../../model/address_lat_long";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsUrl = '/api/v1/products';
  // @ts-ignore
  //private products: Product[] = [{id: 2, name: 'Fire TV Stick ', description: 'Notre Fire TV Stick le plus vendu, maintenant ', stock: 15, price: 29.99, score: null, sailor: null, images: []}, {id: 12, name: 'P with sailor', description: 'grrr', stock: 12, price: 5.99, score: null, sailor: {id: 2, name: 'vvv', description: null, score: null, userId: '4028e38172cffd380172d00151600000'}, images: []}, {id: 22, name: 'imprimante', description: 'kkkkkkckkksksks  kkdkdk kdkdkdkdk', stock: 12, price: 65.88, score: null, sailor: {id: 2, name: 'vvv', description: null, score: null, userId: '4028e38172cffd380172d00151600000'}, images: ['http://res.cloudinary.com/dijmdqpky/image/upload/v1592679734/ic1sbxo5czphmqlsbwrc.jpg', 'http://res.cloudinary.com/dijmdqpky/image/upload/v1592679738/xplipnchh23wyr8xq7jk.jpg']}, {id: 32, name: 'gg', description: 'ggg', stock: 12, price: 25.0, score: null, sailor: {id: 2, name: 'vvv', description: null, score: null, userId: '4028e38172cffd380172d00151600000'}, images: ['', '', '', '', '', ' ']}, {id: 42, name: 'pa', description: 'hhhhhh', stock: null, price: 12.0, score: null, sailor: {id: 12, name: 'aaa', description: null, score: null, userId: '4028875b7367f0ae01736981d6bc0000'}, images: []},{id: 42, name: 'pa', description: 'hhhhhh', stock: null, price: 12.0, score: null, sailor: {id: 12, name: 'aaa', description: null, score: null, userId: '4028875b7367f0ae01736981d6bc0000'}, images: []},{id: 42, name: 'pa', description: 'hhhhhh', stock: null, price: 12.0, score: null, sailor: {id: 12, name: 'aaa', description: null, score: null, userId: '4028875b7367f0ae01736981d6bc0000'}, images: []},{id: 42, name: 'pa', description: 'hhhhhh', stock: null, price: 12.0, score: null, sailor: {id: 12, name: 'aaa', description: null, score: null, userId: '4028875b7367f0ae01736981d6bc0000'}, images: []}];
  private products: Product[];
  constructor(private http: HttpClient, private nativeHttp: HTTP,
              private platform: Platform,private userService:UserService) { }

  /*getProducts(){
    return this.products;
  }*/
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }
  getProducts_page(page:number, size:number ): Observable<{ content: Product[],totalElements:number }> {
    return this.http.post<{content: Product[],totalElements:number}>(this.productsUrl+'/search?page='+page+'&size='+size,{});
  }

  // tslint:disable-next-line:ban-types
  getProduct(id: Number) {
    return this.http.get<Product>(this.productsUrl+'/'+id);

  }
  getProductsOfConnectedSailor(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl+'/sailor');
  }
  getProductsOfSailor(id): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl+'/sailor/'+id);
  }

  createUpdateProduct(product): Observable<Product> {
    if(product.id){
      return this.http.put<Product>(this.productsUrl, product);
    } else {
      console.log(product);

      return this.http.post<Product>(this.productsUrl, product);
    }
  }

  uploadImage(idProdct, file, position: number) : Observable<void> {
    /* const formData = new FormData();
     console.log(file)
     formData.append('file', file);
     */
    return this.http.put<void>(this.productsUrl + '/' + idProdct + '/upload/' + position, {base64:file});
  }

  search(product: string, distance: number, address: Address_lat_long,page,size) {
    let obj;
    if(product==''&&distance==undefined){
      obj={}
    }else if(distance==undefined){
      obj={latGeoPoint:address.latGeoPoint,longGeoPoint:address.longGeoPoint,distance:1+'km',searchText:product}

    }else if(product==''){
      obj={}
    }
    else {
      obj={latGeoPoint:address.latGeoPoint,longGeoPoint:address.longGeoPoint,distance:distance+'km',searchText:product}
    }

    return this.http.post<{content: Product[],totalElements:number}>(this.productsUrl+'/search?page='+page+'&size='+size,obj
    )


  }

}
