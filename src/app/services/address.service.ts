import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from "@angular/http";
import { Router } from "@angular/router";
import { AuthHttp } from "angular2-jwt";
import { ConstantService } from "./constant.service";
import { Observable } from "rxjs";

@Injectable()
export class AddressService {

    apiUrl: string;
    headers: Headers;
    options: RequestOptions;

    constructor(
        private router: Router,
        private http: Http,
        private authHttp: AuthHttp,
        private constantService: ConstantService
    ) {
        this.apiUrl = this.constantService.API_ENDPOINT + 'address';
        this.headers = new Headers({'Content-Type': 'application/json'});
        this.options = new RequestOptions({ headers: this.headers });
    }

    get(zipCode: string) : Observable<any> {
        return this.http.get(this.apiUrl + "?keyword=" + zipCode)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error));
    }

}
