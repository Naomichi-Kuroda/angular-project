import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

    towerId: string;

    constructor() { }

    ngOnInit() {
    }

    setTowerId(towerId) {
        this.towerId = towerId;
    }
}
