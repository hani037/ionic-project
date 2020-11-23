import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Horaire} from "../../model/horaire";
import {HttpClient} from "@angular/common/http";
import {Product} from "../../model/product";
import {UserService} from "../../service/user.service";

@Injectable({
  providedIn: 'root'
})
export class HoraireService {
  TimetableUrl = '/api/v1/sailors';
  public _clicked = new BehaviorSubject<boolean>(null);
  public  horaire2 = {monday:[],tuesday:[],wednesday:[]
    ,thursday:[],friday:[],saturday:[]
    ,sunday:[]};
  public horaire:Horaire ;
  public _horaire = new BehaviorSubject<Horaire>(null);
  public  horaire1={monday:[{start:'10:00',end:'11:00'}],tuesday:[{start:'10:00',end:'11:00'}],wednesday:[{start:'10:00',end:'11:00'}]
    ,thursday:[{start:'10:00',end:'11:00'}],friday:[{start:'10:00',end:'11:00'}],saturday:[{start:'10:00',end:'11:00'}]
    ,sunday:[{start:'10:00',end:'11:00'}]};
    constructor(private http: HttpClient,private userService: UserService) { }

  public clicked(){
    this._clicked.next(true);
  }

  public modifier_horaire(){

      for (let i=0;i<this.horaire.monday.length;i++){
        for (let j=0;j<this.horaire.monday.length;j++){
          if (i==j){
            continue;
          }
        if ((+(this.horaire.monday[i].start.split(':')[0])*3600)+(+(this.horaire.monday[i].start.split(':')[1])*60)>=(+(this.horaire.monday[j].start.split(':')[0])*3600)+(+(this.horaire.monday[j].start.split(':')[1])*60)&&
            (+(this.horaire.monday[i].start.split(':')[0])*3600)+(+(this.horaire.monday[i].start.split(':')[1])*60)<=(+(this.horaire.monday[j].end.split(':')[0])*3600)+(+(this.horaire.monday[j].end.split(':')[1])*60)){
          if ((+(this.horaire.monday[i].end.split(':')[0])*3600)+(+(this.horaire.monday[i].end.split(':')[1])*60)>=(+(this.horaire.monday[j].end.split(':')[0])*3600)+(+(this.horaire.monday[j].end.split(':')[1])*60)){
            this.horaire.monday[i].start=this.horaire.monday[j].start;
            this.horaire.monday.splice(j,1)
          }else {
            this.horaire.monday[i].start=this.horaire.monday[j].start;
            this.horaire.monday[i].end=this.horaire.monday[j].end;
            this.horaire.monday.splice(j,1)
          }

        }else if
          ((+(this.horaire.monday[i].end.split(':')[0])*3600)+(+(this.horaire.monday[i].end.split(':')[1])*60)>=(+(this.horaire.monday[j].start.split(':')[0])*3600)+(+(this.horaire.monday[j].start.split(':')[1])*60)&&
              (+(this.horaire.monday[i].end.split(':')[0])*3600)+(+(this.horaire.monday[i].end.split(':')[1])*60)<=(+(this.horaire.monday[j].end.split(':')[0])*3600)+(+(this.horaire.monday[j].end.split(':')[1])*60)){
            if ((+(this.horaire.monday[i].start.split(':')[0])*3600)+(+(this.horaire.monday[i].start.split(':')[1])*60)>=(+(this.horaire.monday[j].start.split(':')[0])*3600)+(+(this.horaire.monday[j].start.split(':')[1])*60)){
              this.horaire.monday[i].end=this.horaire.monday[j].end;
              this.horaire.monday[i].start=this.horaire.monday[j].start;
              this.horaire.monday.splice(j,1)
            }else {
              this.horaire.monday[i].end=this.horaire.monday[j].end;
              this.horaire.monday.splice(j,1)
            }

          }
        }
      }
    for (let i=0;i<this.horaire.tuesday.length;i++){
      for (let j=0;j<this.horaire.tuesday.length;j++){
        if (i==j){
          continue;
        }
        if ((+(this.horaire.tuesday[i].start.split(':')[0])*3600)+(+(this.horaire.tuesday[i].start.split(':')[1])*60)>=(+(this.horaire.tuesday[j].start.split(':')[0])*3600)+(+(this.horaire.tuesday[j].start.split(':')[1])*60)&&
            (+(this.horaire.tuesday[i].start.split(':')[0])*3600)+(+(this.horaire.tuesday[i].start.split(':')[1])*60)<=(+(this.horaire.tuesday[j].end.split(':')[0])*3600)+(+(this.horaire.tuesday[j].end.split(':')[1])*60)){
          if ((+(this.horaire.tuesday[i].end.split(':')[0])*3600)+(+(this.horaire.tuesday[i].end.split(':')[1])*60)>=(+(this.horaire.tuesday[j].end.split(':')[0])*3600)+(+(this.horaire.tuesday[j].end.split(':')[1])*60)){
            this.horaire.tuesday[i].start=this.horaire.tuesday[j].start;
            this.horaire.tuesday.splice(j,1)
          }else {
            this.horaire.tuesday[i].start=this.horaire.tuesday[j].start;
            this.horaire.tuesday[i].end=this.horaire.tuesday[j].end;
            this.horaire.tuesday.splice(j,1)
          }

        }else if
        ((+(this.horaire.tuesday[i].end.split(':')[0])*3600)+(+(this.horaire.tuesday[i].end.split(':')[1])*60)>=(+(this.horaire.tuesday[j].start.split(':')[0])*3600)+(+(this.horaire.tuesday[j].start.split(':')[1])*60)&&
            (+(this.horaire.tuesday[i].end.split(':')[0])*3600)+(+(this.horaire.tuesday[i].end.split(':')[1])*60)<=(+(this.horaire.tuesday[j].end.split(':')[0])*3600)+(+(this.horaire.tuesday[j].end.split(':')[1])*60)){
          if ((+(this.horaire.tuesday[i].start.split(':')[0])*3600)+(+(this.horaire.tuesday[i].start.split(':')[1])*60)>=(+(this.horaire.tuesday[j].start.split(':')[0])*3600)+(+(this.horaire.tuesday[j].start.split(':')[1])*60)){
            this.horaire.tuesday[i].end=this.horaire.tuesday[j].end;
            this.horaire.tuesday[i].start=this.horaire.tuesday[j].start;
            this.horaire.tuesday.splice(j,1)
          }else {
            this.horaire.tuesday[i].end=this.horaire.tuesday[j].end;
            this.horaire.tuesday.splice(j,1)
          }

        }
      }
    }
    for (let i=0;i<this.horaire.wednesday.length;i++){
      for (let j=0;j<this.horaire.wednesday.length;j++){
        if (i==j){
          continue;
        }
        if ((+(this.horaire.wednesday[i].start.split(':')[0])*3600)+(+(this.horaire.wednesday[i].start.split(':')[1])*60)>=(+(this.horaire.wednesday[j].start.split(':')[0])*3600)+(+(this.horaire.wednesday[j].start.split(':')[1])*60)&&
            (+(this.horaire.wednesday[i].start.split(':')[0])*3600)+(+(this.horaire.wednesday[i].start.split(':')[1])*60)<=(+(this.horaire.wednesday[j].end.split(':')[0])*3600)+(+(this.horaire.wednesday[j].end.split(':')[1])*60)){
          if ((+(this.horaire.wednesday[i].end.split(':')[0])*3600)+(+(this.horaire.wednesday[i].end.split(':')[1])*60)>=(+(this.horaire.wednesday[j].end.split(':')[0])*3600)+(+(this.horaire.wednesday[j].end.split(':')[1])*60)){
            this.horaire.wednesday[i].start=this.horaire.wednesday[j].start;
            this.horaire.wednesday.splice(j,1)
          }else {
            this.horaire.wednesday[i].start=this.horaire.wednesday[j].start;
            this.horaire.wednesday[i].end=this.horaire.wednesday[j].end;
            this.horaire.wednesday.splice(j,1)
          }

        }else if
        ((+(this.horaire.wednesday[i].end.split(':')[0])*3600)+(+(this.horaire.wednesday[i].end.split(':')[1])*60)>=(+(this.horaire.wednesday[j].start.split(':')[0])*3600)+(+(this.horaire.wednesday[j].start.split(':')[1])*60)&&
            (+(this.horaire.wednesday[i].end.split(':')[0])*3600)+(+(this.horaire.wednesday[i].end.split(':')[1])*60)<=(+(this.horaire.wednesday[j].end.split(':')[0])*3600)+(+(this.horaire.wednesday[j].end.split(':')[1])*60)){
          if ((+(this.horaire.wednesday[i].start.split(':')[0])*3600)+(+(this.horaire.wednesday[i].start.split(':')[1])*60)>=(+(this.horaire.wednesday[j].start.split(':')[0])*3600)+(+(this.horaire.wednesday[j].start.split(':')[1])*60)){
            this.horaire.wednesday[i].end=this.horaire.wednesday[j].end;
            this.horaire.wednesday[i].start=this.horaire.wednesday[j].start;
            this.horaire.wednesday.splice(j,1)
          }else {
            this.horaire.wednesday[i].end=this.horaire.wednesday[j].end;
            this.horaire.wednesday.splice(j,1)
          }

        }
      }
    }
    for (let i=0;i<this.horaire.thursday.length;i++){
      for (let j=0;j<this.horaire.thursday.length;j++){
        if (i==j){
          continue;
        }
        if ((+(this.horaire.thursday[i].start.split(':')[0])*3600)+(+(this.horaire.thursday[i].start.split(':')[1])*60)>=(+(this.horaire.thursday[j].start.split(':')[0])*3600)+(+(this.horaire.thursday[j].start.split(':')[1])*60)&&
            (+(this.horaire.thursday[i].start.split(':')[0])*3600)+(+(this.horaire.thursday[i].start.split(':')[1])*60)<=(+(this.horaire.thursday[j].end.split(':')[0])*3600)+(+(this.horaire.thursday[j].end.split(':')[1])*60)){
          if ((+(this.horaire.thursday[i].end.split(':')[0])*3600)+(+(this.horaire.thursday[i].end.split(':')[1])*60)>=(+(this.horaire.thursday[j].end.split(':')[0])*3600)+(+(this.horaire.thursday[j].end.split(':')[1])*60)){
            this.horaire.thursday[i].start=this.horaire.thursday[j].start;
            this.horaire.thursday.splice(j,1)
          }else {
            this.horaire.thursday[i].start=this.horaire.thursday[j].start;
            this.horaire.thursday[i].end=this.horaire.thursday[j].end;
            this.horaire.thursday.splice(j,1)
          }

        }else if
        ((+(this.horaire.thursday[i].end.split(':')[0])*3600)+(+(this.horaire.thursday[i].end.split(':')[1])*60)>=(+(this.horaire.thursday[j].start.split(':')[0])*3600)+(+(this.horaire.thursday[j].start.split(':')[1])*60)&&
            (+(this.horaire.thursday[i].end.split(':')[0])*3600)+(+(this.horaire.thursday[i].end.split(':')[1])*60)<=(+(this.horaire.thursday[j].end.split(':')[0])*3600)+(+(this.horaire.thursday[j].end.split(':')[1])*60)){
          if ((+(this.horaire.thursday[i].start.split(':')[0])*3600)+(+(this.horaire.thursday[i].start.split(':')[1])*60)>=(+(this.horaire.thursday[j].start.split(':')[0])*3600)+(+(this.horaire.thursday[j].start.split(':')[1])*60)){
            this.horaire.thursday[i].end=this.horaire.thursday[j].end;
            this.horaire.thursday[i].start=this.horaire.thursday[j].start;
            this.horaire.thursday.splice(j,1)
          }else {
            this.horaire.thursday[i].end=this.horaire.thursday[j].end;
            this.horaire.thursday.splice(j,1)
          }

        }
      }
    }
    for (let i=0;i<this.horaire.friday.length;i++){
      for (let j=0;j<this.horaire.friday.length;j++){
        if (i==j){
          continue;
        }
        if ((+(this.horaire.friday[i].start.split(':')[0])*3600)+(+(this.horaire.friday[i].start.split(':')[1])*60)>=(+(this.horaire.friday[j].start.split(':')[0])*3600)+(+(this.horaire.friday[j].start.split(':')[1])*60)&&
            (+(this.horaire.friday[i].start.split(':')[0])*3600)+(+(this.horaire.friday[i].start.split(':')[1])*60)<=(+(this.horaire.friday[j].end.split(':')[0])*3600)+(+(this.horaire.friday[j].end.split(':')[1])*60)){
          if ((+(this.horaire.friday[i].end.split(':')[0])*3600)+(+(this.horaire.friday[i].end.split(':')[1])*60)>=(+(this.horaire.friday[j].end.split(':')[0])*3600)+(+(this.horaire.friday[j].end.split(':')[1])*60)){
            this.horaire.friday[i].start=this.horaire.friday[j].start;
            this.horaire.friday.splice(j,1)
          }else {
            this.horaire.friday[i].start=this.horaire.friday[j].start;
            this.horaire.friday[i].end=this.horaire.friday[j].end;
            this.horaire.friday.splice(j,1)
          }

        }else if
        ((+(this.horaire.friday[i].end.split(':')[0])*3600)+(+(this.horaire.friday[i].end.split(':')[1])*60)>=(+(this.horaire.friday[j].start.split(':')[0])*3600)+(+(this.horaire.friday[j].start.split(':')[1])*60)&&
            (+(this.horaire.friday[i].end.split(':')[0])*3600)+(+(this.horaire.friday[i].end.split(':')[1])*60)<=(+(this.horaire.friday[j].end.split(':')[0])*3600)+(+(this.horaire.friday[j].end.split(':')[1])*60)){
          if ((+(this.horaire.friday[i].start.split(':')[0])*3600)+(+(this.horaire.friday[i].start.split(':')[1])*60)>=(+(this.horaire.friday[j].start.split(':')[0])*3600)+(+(this.horaire.friday[j].start.split(':')[1])*60)){
            this.horaire.friday[i].end=this.horaire.friday[j].end;
            this.horaire.friday[i].start=this.horaire.friday[j].start;
            this.horaire.friday.splice(j,1)
          }else {
            this.horaire.friday[i].end=this.horaire.friday[j].end;
            this.horaire.friday.splice(j,1)
          }

        }
      }
    }
    for (let i=0;i<this.horaire.sunday.length;i++){
      for (let j=0;j<this.horaire.sunday.length;j++){
        if (i==j){
          continue;
        }
        if ((+(this.horaire.sunday[i].start.split(':')[0])*3600)+(+(this.horaire.sunday[i].start.split(':')[1])*60)>=(+(this.horaire.sunday[j].start.split(':')[0])*3600)+(+(this.horaire.sunday[j].start.split(':')[1])*60)&&
            (+(this.horaire.sunday[i].start.split(':')[0])*3600)+(+(this.horaire.sunday[i].start.split(':')[1])*60)<=(+(this.horaire.sunday[j].end.split(':')[0])*3600)+(+(this.horaire.sunday[j].end.split(':')[1])*60)){
          if ((+(this.horaire.sunday[i].end.split(':')[0])*3600)+(+(this.horaire.sunday[i].end.split(':')[1])*60)>=(+(this.horaire.sunday[j].end.split(':')[0])*3600)+(+(this.horaire.sunday[j].end.split(':')[1])*60)){
            this.horaire.sunday[i].start=this.horaire.sunday[j].start;
            this.horaire.sunday.splice(j,1)
          }else {
            this.horaire.sunday[i].start=this.horaire.sunday[j].start;
            this.horaire.sunday[i].end=this.horaire.sunday[j].end;
            this.horaire.sunday.splice(j,1)
          }

        }else if
        ((+(this.horaire.sunday[i].end.split(':')[0])*3600)+(+(this.horaire.tuesday[i].end.split(':')[1])*60)>=(+(this.horaire.sunday[j].start.split(':')[0])*3600)+(+(this.horaire.sunday[j].start.split(':')[1])*60)&&
            (+(this.horaire.sunday[i].end.split(':')[0])*3600)+(+(this.horaire.tuesday[i].end.split(':')[1])*60)<=(+(this.horaire.sunday[j].end.split(':')[0])*3600)+(+(this.horaire.sunday[j].end.split(':')[1])*60)){
          if ((+(this.horaire.sunday[i].start.split(':')[0])*3600)+(+(this.horaire.tuesday[i].start.split(':')[1])*60)>=(+(this.horaire.sunday[j].start.split(':')[0])*3600)+(+(this.horaire.sunday[j].start.split(':')[1])*60)){
            this.horaire.sunday[i].end=this.horaire.sunday[j].end;
            this.horaire.sunday[i].start=this.horaire.sunday[j].start;
            this.horaire.sunday.splice(j,1)
          }else {
            this.horaire.sunday[i].end=this.horaire.sunday[j].end;
            this.horaire.sunday.splice(j,1)
          }

        }
      }
    }
    for (let i=0;i<this.horaire.saturday.length;i++){
      for (let j=0;j<this.horaire.saturday.length;j++){
        if (i==j){
          continue;
        }
        if ((+(this.horaire.saturday[i].start.split(':')[0])*3600)+(+(this.horaire.saturday[i].start.split(':')[1])*60)>=(+(this.horaire.saturday[j].start.split(':')[0])*3600)+(+(this.horaire.saturday[j].start.split(':')[1])*60)&&
            (+(this.horaire.saturday[i].start.split(':')[0])*3600)+(+(this.horaire.saturday[i].start.split(':')[1])*60)<=(+(this.horaire.saturday[j].end.split(':')[0])*3600)+(+(this.horaire.saturday[j].end.split(':')[1])*60)){
          if ((+(this.horaire.saturday[i].end.split(':')[0])*3600)+(+(this.horaire.saturday[i].end.split(':')[1])*60)>=(+(this.horaire.saturday[j].end.split(':')[0])*3600)+(+(this.horaire.saturday[j].end.split(':')[1])*60)){
            this.horaire.saturday[i].start=this.horaire.tuesday[j].start;
            this.horaire.saturday.splice(j,1)
          }else {
            this.horaire.saturday[i].start=this.horaire.saturday[j].start;
            this.horaire.saturday[i].end=this.horaire.saturday[j].end;
            this.horaire.saturday.splice(j,1)
          }

        }else if
        ((+(this.horaire.saturday[i].end.split(':')[0])*3600)+(+(this.horaire.tuesday[i].end.split(':')[1])*60)>=(+(this.horaire.saturday[j].start.split(':')[0])*3600)+(+(this.horaire.saturday[j].start.split(':')[1])*60)&&
            (+(this.horaire.saturday[i].end.split(':')[0])*3600)+(+(this.horaire.tuesday[i].end.split(':')[1])*60)<=(+(this.horaire.saturday[j].end.split(':')[0])*3600)+(+(this.horaire.saturday[j].end.split(':')[1])*60)){
          if ((+(this.horaire.saturday[i].start.split(':')[0])*3600)+(+(this.horaire.tuesday[i].start.split(':')[1])*60)>=(+(this.horaire.saturday[j].start.split(':')[0])*3600)+(+(this.horaire.saturday[j].start.split(':')[1])*60)){
            this.horaire.saturday[i].end=this.horaire.saturday[j].end;
            this.horaire.saturday[i].start=this.horaire.saturday[j].start;
            this.horaire.saturday.splice(j,1)
          }else {
            this.horaire.saturday[i].end=this.horaire.saturday[j].end;
            this.horaire.saturday.splice(j,1)
          }

        }
      }
    }
    return this.http.put<Horaire>(this.TimetableUrl+'/timetable',this.horaire);

  }
  public set_horaire(){
    return this.http.put<Horaire>(this.TimetableUrl+'/timetable',{});

  }
  public async get_horaire(){
  console.log(this.userService.userConnected.id)
    this.horaire = await this.http.get<Horaire>(this.TimetableUrl+'/'+this.userService.userConnected.id+'/timetable').toPromise()
    this._horaire .next(this.horaire);

  }
  public  get_horaire_sailor(id){

    return   this.http.get<Horaire>(this.TimetableUrl+'/'+id+'/timetable')

  }
  public modifier_start(day,indice,value) {
      console.log('start');
    this.horaire[day][indice].start = value;
    this._horaire.next(this.horaire);
    console.log(this.horaire);

  }
  public add (day){
      if(this.horaire[day]==null){
        this.horaire[day] = []
      }
    this.horaire[day].push({start:'10:00',end:'11:00'})
    console.log(this.horaire)
    this._horaire.next(this.horaire);
  }
  public modifier_end(day,indice,value){
    this.horaire[day][indice].end = value;
    this._horaire.next(this.horaire);
    console.log(this.horaire);
  }
  public cancel(day,indice){
      this.horaire[day].splice(indice,1);
      this._horaire.next(this.horaire);
      console.log(this.horaire);
  }

    cancel_all(day: string) {
      this.horaire[day]=[];
      this._horaire.next(this.horaire);

    }
}
