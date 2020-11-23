import { CanActivate, ActivatedRouteSnapshot } from "@angular/router";

import {ActivatedRoute, Router, RouterStateSnapshot} from "@angular/router";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { mergeMap, map, take } from 'rxjs/operators';
import { UserService } from 'src/app/service/user.service';
import { Promise } from 'q';
@Injectable({
    providedIn: 'root'
})
export class LoginActivate implements CanActivate {
    constructor(private userService: UserService, private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        return this.userService.user_connected().pipe(map(userConnected => {
            console.log(userConnected);

            if (userConnected.sailor) {
                this.router.navigate(['/sailor']);
                return false;
            }else if (userConnected.id && userConnected){
                this.router.navigate(['/']);

                return false
            }

            return true;
        }));

    }
}
