import { Component, OnInit } from '@angular/core';
import { CompanyService } from "../../services/company.service";

@Component({
    selector: 'company-list',
    templateUrl: './company-list.component.html',
})
export class CompanyListComponent implements OnInit {

    companyList: any;
    jsonGetBody: any;

    constructor(
        private companyService: CompanyService,
    ) { }

    ngOnInit() {
        this.getCompanyList();
    }

    getCompanyList() {
        this.companyService.index().subscribe(
            res => {
                this.jsonGetBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.setCompanyList();
            }
        );
    }

    setCompanyList() {
        this.companyList = this.jsonGetBody.companyList;
    }

}
