import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { ConstantService } from "./constant.service";
import { Observable } from "rxjs";

@Injectable()
export class TowerService {

    apiUrl: string;
    headers: Headers;
    options: RequestOptions;

    constructor(
        private http: Http,
        private constantService: ConstantService
    ) {
        this.apiUrl = this.constantService.API_ENDPOINT + 'tower';
        this.headers = new Headers({'Content-Type': 'application/json'});
        this.options = new RequestOptions({ headers: this.headers });
    }

    index(): Observable<any> {
        return this.http.get(this.apiUrl)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json()));
    }

    indexRooms(id: string): Observable<any> {
        return this.http.get(this.apiUrl + '/indexRooms/' + id)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json()));
    }

    show(id: string) : Observable<any> {
        return this.http.get(this.apiUrl + '/' + id)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json()));
    }

    create(body: Object): Observable<any> {
        return this.http.post(this.apiUrl, body, this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json()));
    }

    update(id: string, body: Object): Observable<any> {
        return this.http.put(this.apiUrl + '/' + id, body, this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json()));
    }

    storeRooms(id: string, body: Object): Observable<any> {
        return this.http.put(this.apiUrl + '/storeRooms/' + id, body, this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json()));
    }

    destroy(id: string): Observable<any> {
        return this.http.delete(this.apiUrl + '/' + id)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json()));
    }

}
