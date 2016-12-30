import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'residence',
    templateUrl: './residence.component.html',
    exportAs: 'child'
})
export class ResidenceComponent implements OnInit {

    towerId: string;

    constructor() { }

    ngOnInit() {
    }

    setTowerId(towerId) {
        this.towerId = towerId;
    }

}
