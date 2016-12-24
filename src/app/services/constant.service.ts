import { Injectable } from '@angular/core';

@Injectable()
export class ConstantService {

    APP_NAME: string;
    API_ENDPOINT: string;

    constructor() {
        this.APP_NAME = "Angular";
        this.API_ENDPOINT = "http://localhost:8000/api/";
    }

}
