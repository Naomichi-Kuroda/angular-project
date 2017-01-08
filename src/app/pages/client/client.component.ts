import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'client',
    templateUrl: './client.component.html',
})
export class ClientComponent implements OnInit {

    userId: string;

    constructor() { }

    ngOnInit() {
    }

    setUserId(userId) {
        this.userId = userId;
    }

}
