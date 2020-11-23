import { CanActivate, ActivatedRouteSnapshot, UrlTree } from "@angular/router";

import {ActivatedRoute, Router, RouterStateSnapshot} from "@angular/router";
import { Injectable } from '@angular/core';

import { Promise } from 'q';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from 'src/app/service/user.service';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
    providedIn: 'root'
})
export class GlobalActivate implements CanActivate {
  constructor(private userService: UserService, private router: Router) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
      return this.userService.user_connected().pipe(map(userConnected => {
          if (userConnected && userConnected.id &&  userConnected.sailor) {
            this.router.navigate(['/sailor']);
            return false;
          } else {
            return true;
          }

      }));
  }
}
