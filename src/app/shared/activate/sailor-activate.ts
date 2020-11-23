import { CanActivate, ActivatedRouteSnapshot } from "@angular/router";

import {ActivatedRoute, Router, RouterStateSnapshot} from "@angular/router";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Promise } from 'protractor/node_modules/@types/q';
import { UserService } from 'src/app/service/user.service';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class SailorActivate implements CanActivate {
    constructor(private userService: UserService, private router: Router) {

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        return this.userService.user_connected().pipe(map(userConnected => {
            if (userConnected && userConnected.sailor) {
                return true;
            }

            this.router.navigate(['/sign-in']);

            return false;
        }));

    }
}
