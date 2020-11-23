import { Injectable } from '@angular/core';
import { HttpErrorResponse,HttpEvent, HttpHandler, HttpResponse, HttpRequest, HttpInterceptor } from '@angular/common/http';


import { catchError, retry } from 'rxjs/operators';
import { UserService } from '../service/user.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

constructor(private userService: UserService) { }

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.userService.token;
         // auth is provided via constructor.
if (token&&req.url.split('/')[2]!='maps.googleapis.com') {
    // Logged in. Add Bearer token.
    return next.handle(
        req.clone({
            headers: req.headers.append('Authorization', 'Bearer ' + token)
        })
    );
}
// Not logged in. Continue without modification.
return next.handle(req);
}
}
