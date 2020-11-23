import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Platform } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import {UserService} from "../service/user.service";

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'head' | 'delete' | 'upload' | 'download';

@Injectable()
export class NativeHttpInterceptor implements HttpInterceptor {
    constructor(
        private nativeHttp: HTTP,
        private platform: Platform,
        private userService: UserService
    ) {
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!this.platform.is('cordova')||request.url.split('/')[2]=='maps.googleapis.com') {
            return next.handle(request);
        }

        return from(this.handleNativeRequest(request));
    }

    private async handleNativeRequest(request: HttpRequest<any>): Promise<HttpResponse<any>> {
        const token = this.userService.token;
        const headerKeys = request.headers.keys();
        const headers = {};

        headerKeys.forEach((key) => {
            headers[key] = request.headers.get(key);
        });

        try {
            await this.platform.ready();
            const method = <HttpMethod>request.method.toLowerCase();
            let nativeHttpResponse;
            console.log(request.url.slice(4))
            if(request.url.slice(4)=='/v1/payments/charge'){
                nativeHttpResponse = await this.nativeHttp.sendRequest('http://a4f3408a2e8944f538ff1ccfd84e6500-1864466040.eu-west-3.elb.amazonaws.com:8080'+request.url.slice(4), {
                    method: method,
                    data: request.body,
                    headers: { Authorization: 'Bearer ' + token,token: request.body.token },
                    serializer: 'json',
                });
            }
            else if(token){
                console.log('a1');
                nativeHttpResponse = await this.nativeHttp.sendRequest('http://a4f3408a2e8944f538ff1ccfd84e6500-1864466040.eu-west-3.elb.amazonaws.com:8080'+request.url.slice(4), {
                    method: method,
                    data: request.body,
                    headers: { Authorization: 'Bearer ' + token },
                    serializer: 'json',
                });
            }else {
                console.log('a2');
                nativeHttpResponse = await this.nativeHttp.sendRequest('http://a4f3408a2e8944f538ff1ccfd84e6500-1864466040.eu-west-3.elb.amazonaws.com:8080'+request.url.slice(4), {
                    method: method,
                    data: request.body,
                    headers: headers,
                    serializer: 'json',
                });
            }

            console.log(headers);
            let body;

            try {
                body = JSON.parse(nativeHttpResponse.data);
            } catch (error) {
                body = {response: nativeHttpResponse.data};
            }

            const response = new HttpResponse({
                body: body,
                status: nativeHttpResponse.status,
                headers: request.headers, //nativeHttpResponse.headers,
                url: nativeHttpResponse.url,
            });

            return Promise.resolve(response);
        } catch (error) {
            if (!error.status) {
                return Promise.reject(error);
            }

            const response = new HttpResponse({
                body: JSON.parse(error.error),
                status: error.status,
                headers: error.headers,
                url: error.url,
            });

            return Promise.reject(response);
        }


        /*    private async handleNativeRequest(request: HttpRequest<any>): Promise<HttpResponse<any>> {
                const headerKeys = request.headers.keys();
                const headers = new Headers();

                headerKeys.forEach((key) => {
                    headers[key] = request.headers.get(key);
                });

                try {
                    await this.platform.ready();

                    const method = <HttpMethod> request.method.toLowerCase();

                    const nativeHttpResponse = await this.nativeHttp.sendRequest('http://a9ad2e12aa0b94357821a5cb222b7bce-51371841.eu-west-3.elb.amazonaws.com:8080'+request.url.slice(4), {
                        method: method,
                        data: request.body,
                        headers: headers,
                        serializer: 'json',
                });

                    let body;

                    try {
                        body = JSON.parse(nativeHttpResponse.data);
                    } catch (error) {
                        body = { response: nativeHttpResponse.data };
                    }

                    const response = new HttpResponse({
                        body: body,
                        status: nativeHttpResponse.status,
                        headers: nativeHttpResponse.headers,
                        url: nativeHttpResponse.url,
                    });

                    return Promise.resolve(response);
                } catch (error) {
                    if (!error.status) { return Promise.reject(error); }

                    const response = new HttpResponse({
                        body: JSON.parse(error.error),
                        status: error.status,
                        headers: error.headers,
                        url: error.url,
                    });

                    return Promise.reject(response);
                }
            }*/
    }
}
