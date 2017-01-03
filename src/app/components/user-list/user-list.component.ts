import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { CompanyService } from "../../services/company.service";
import { ConstantService } from "../../services/constant.service";

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {

    @Input() companyId: string;
    userList: any;
    statusList: any;
    jsonGetBody: any;

    constructor(
        private constantService: ConstantService,
        private companyService: CompanyService,
    ) { }

    ngOnInit() {
        this.statusList = this.constantService.convertObjectToArray(this.constantService.USER_STATUS);
    }

    getUserList() {
        this.companyService.indexUsers(this.companyId).subscribe(
            res => {
                this.jsonGetBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.setUserList();
            }
        );
    }

    setUserList() {
        this.userList = this.jsonGetBody.userList;
    }

}
