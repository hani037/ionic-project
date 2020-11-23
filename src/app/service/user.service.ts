import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import {from, Observable, of} from 'rxjs';

import { mergeMap, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import {Plugins} from "protractor/built/plugins";
import { Storage } from '@ionic/storage';
import {Platform} from "@ionic/angular";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private auth_cookie = 'auth';
  token: string;
  usersUrl = '/api/v1/users';
  tokensUrl = '/api/v1/tokens';

  readonly _userConnected = new BehaviorSubject<User>(null);
  private dataStore: { user: User } = { user : new User()};
  readonly userConnectedObservable = this._userConnected.asObservable();
  userConnected = new User();

  users: User[] = [];

  @Output() userEmitter = new EventEmitter<User>();

  constructor(private router:Router,private http: HttpClient, private storage: Storage, private platform: Platform) {

  }

  isLoggedInObservable(): Observable<User> {
    return this.userConnectedObservable;
  }

  init(): any{
    return this.me().subscribe();
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUsersCompany(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl + '/company');
  }

  getUser(id: String): Observable<User> {
    return this.http.get<User>(this.usersUrl + '/' + id);
  }

  createUser(user: User): Promise<User> {
    return this.http.post<User>(this.usersUrl, user).toPromise();
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.usersUrl, user);
  }

  async logout() {
    this.token = null;
    await this.storage.set('token','');
    //localStorage.setItem('token', '');
    // Récupération de l'objet
    this._userConnected.next(null);

  }
  login(userName: String, password: String): Promise<any> {
    const user = new User();
    user.userName = userName;
    user.password = password;
    console.log(password);
    if (!this.platform.is('cordova')) {
      return this.http.post(this.tokensUrl, { userName: userName, password: password}, { responseType: 'text'})
          .pipe(
              mergeMap( async token => {
                console.log(token);
                this.token = token;
                await this.storage.set('token',this.token);
                return this.me();
              }),
              mergeMap(user => {
                return user;
              }),mergeMap(user=>{

                User.clone( user, this.userConnected);
                this._userConnected.next(user);
                return of();
              })
          ).toPromise();
    }else {
      return this.http.post<{response: string}>(this.tokensUrl, { userName: userName, password: password})
          .pipe(
              mergeMap( async token=> {
                this.token = token.response;
                await this.storage.set('token',this.token);
                return this.me();
              }),
              mergeMap(user => {
                return user;
              }),mergeMap(user=>{
                User.clone( user, this.userConnected);
                this._userConnected.next(user);
                return of();
              })
          ).toPromise();
    }

  }

  me(): Observable<User> {
    if (this.token){
      return this.http.get<User>(this.tokensUrl + '/me').pipe(map(user => {
        this.dataStore.user = user;
        this._userConnected.next(this.dataStore.user);
        return user;
      }));
    }

  }
  user_connected(){
    if (this.token){
      return this.http.get<User>(this.tokensUrl + '/me');

    }else {
      return of(new User());
    }
  }

    getToken(){
   return  this.storage.get('token');
  }
   async autoLogin() {
    if (this.token){
      this.me().toPromise().then(user => {
          this.userConnected = user;
        return user;
      }).catch(error=> {
          if(error.status == 504){
              this.router.navigate(['404'])
          }
      });
    }else {
      return false;
    }
  }
  public async set_token(token){
      this.token=token;
      await this.autoLogin();
  }

    public get_address() {

    }
}
