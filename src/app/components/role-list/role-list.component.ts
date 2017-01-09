import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ConstantService } from "../../services/constant.service";
import { RoleService } from "../../services/role.service";

@Component({
    selector: 'role-list',
    templateUrl: './role-list.component.html',
})
export class RoleListComponent implements OnInit {

    @Output() selectRoleId: EventEmitter<string> = new EventEmitter<string>();
    roleList: any;

    jsonGetBody: any;

    constructor(
        private roleService: RoleService,
    ) { }

    ngOnInit() {
        this.getRoleList();
    }

    getRoleList() {
        this.roleService.index().subscribe(
            res => {
                this.jsonGetBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.setRoleList();
            }
        );
    }

    setRoleList() {
        this.roleList = this.jsonGetBody.roleList;
    }

    onRoleId(roleId) {
        this.selectRoleId.emit(roleId);
    }

}
