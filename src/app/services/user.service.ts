import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from "@angular/http";
import { Router } from "@angular/router";
import { AuthHttp } from "angular2-jwt";
import { ConstantService } from "./constant.service";
import { Observable } from "rxjs";

@Injectable()
export class UserService {

    apiUrl: string;
    headers: Headers;
    options: RequestOptions;

    constructor(
        private router: Router,
        private http: Http,
        private authHttp: AuthHttp,
        private constantService: ConstantService
    ) {
        this.apiUrl = this.constantService.API_ENDPOINT + 'user';
        this.headers = new Headers({'Content-Type': 'application/json'});
        this.options = new RequestOptions({ headers: this.headers });
    }

    index(): Observable<any> {
        return this.http.get(this.apiUrl)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json()));
    }

    indexClients(): Observable<any> {
        return this.http.get(this.apiUrl + '/indexClients')
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json()));
    }

    show(id: string) : Observable<any> {
        return this.http.get(this.apiUrl + '/' + id)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json()));
    }

    sendConfirmationMail(id: string) : Observable<any> {
        return this.http.get(this.apiUrl + '/sendmail/' + id)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json()));
    }

    store(body: Object): Observable<any> {
        return this.http.post(this.apiUrl, body, this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json()));
    }

    storeClient(id: string, body: Object): Observable<any> {
        return this.http.put(this.apiUrl + '/storeClient/' + id, body, this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json()));
    }

    update(id: string, body: Object): Observable<any> {
        return this.http.put(this.apiUrl + '/' + id, body, this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json()));
    }

    updatePassword(id: string, body: Object): Observable<any> {
        return this.http.put(this.apiUrl + '/updatePassword/' + id, body, this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json()));
    }

}
