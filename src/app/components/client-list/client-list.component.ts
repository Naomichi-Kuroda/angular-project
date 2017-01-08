import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from "../../services/user.service";
import { ConstantService } from "../../services/constant.service";

@Component({
    selector: 'client-list',
    templateUrl: './client-list.component.html',
})
export class ClientListComponent implements OnInit {

    @Output() selectUserId: EventEmitter<string> = new EventEmitter<string>();
    statusList: any;
    userList: any;
    jsonGetBody: any;

    constructor(
        private constantService: ConstantService,
        private userService: UserService,
    ) { }

    ngOnInit() {
        this.statusList = this.constantService.convertObjectToArray(this.constantService.USER_STATUS);
        this.getUserList();
    }

    getUserList() {
        this.userService.indexClients().subscribe(
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

    onUserId(userId) {
        this.selectUserId.emit(userId);
    }

}
