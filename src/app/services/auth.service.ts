import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from "@angular/http";
import { Router } from "@angular/router";
import { AuthHttp, tokenNotExpired, JwtHelper } from "angular2-jwt";
import { ConstantService } from "./constant.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthService {

    apiUrl: string;
    headers: Headers;
    options: RequestOptions;

    jwtHelper: JwtHelper = new JwtHelper();
    token = sessionStorage.getItem('token');

    constructor(
        private router: Router,
        private http: Http,
        private constantService: ConstantService
    ) {
        this.apiUrl = this.constantService.API_ENDPOINT + 'authenticate';
        this.headers = new Headers({'Content-Type': 'application/json'});
        this.options = new RequestOptions({ headers: this.headers });
    }

    login(body: Object): Observable <any> {
        return this.http.post(this.apiUrl, body, this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json()));
    }

    setTokenToStorage(token: string, remember: boolean) {
        if(remember) {
            localStorage.setItem('token', token);
        }
        sessionStorage.setItem('token', token);
    }

    loggedIn() {
        return tokenNotExpired();
    }

    logout() {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

}
