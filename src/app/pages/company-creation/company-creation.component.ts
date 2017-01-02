import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'company-creation',
    templateUrl: './company-creation.component.html',
})
export class CompanyCreationComponent implements OnInit {

    companyId: string;

    constructor() { }

    ngOnInit() {
    }

    setCompanyId(companyId) {
        this.companyId = companyId;
    }

}
