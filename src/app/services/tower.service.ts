import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { ConstantService } from "./constant.service";
import { Observable } from "rxjs";

@Injectable()
export class TowerService {

    apiUrl: string;

    constructor(
        private http: Http,
        private constantService: ConstantService
    ) {
        this.apiUrl = this.constantService.API_ENDPOINT + 'tower';
    }

    getAll(): Observable<any> {
        return this.http.get(this.apiUrl)
            .map((res:Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    get(id: string) : Observable<any> {
        return this.http.get(this.apiUrl + '/' + id)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(body: Object): Observable<any> {
        let bodyString = JSON.stringify(body);
        let headers      = new Headers({ 'Content-Type': 'application/json' });
        let options       = new RequestOptions({ headers: headers });

        return this.http.post(this.apiUrl, body, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    update(id: string, body: Object): Observable<any> {
        let bodyString = JSON.stringify(body);
        let headers      = new Headers({ 'Content-Type': 'application/json' });
        let options       = new RequestOptions({ headers: headers });

        return this.http.put(this.apiUrl + '/' + id, body, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    remove(id: string): Observable<any> {
        return this.http.delete(this.apiUrl + '/' + id)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

}
