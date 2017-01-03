import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'error',
    templateUrl: './error.component.html',
})
export class ErrorComponent implements OnInit {

    code: string;
    message: string;

    constructor(
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.code = this.route.snapshot.params['code'];
        this.message = this.route.snapshot.params['message'];
    }

}
