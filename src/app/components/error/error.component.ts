import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'error',
    templateUrl: './error.component.html',
})
export class ErrorComponent implements OnInit {

    statusCode: string;
    errorMessage: string;

    constructor() { }

    ngOnInit() {
        this.statusCode = '404';
        this.errorMessage = '存在しないページです';
    }

}
