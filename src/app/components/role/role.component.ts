import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'role',
    templateUrl: './role.component.html',
    exportAs: 'child'
})
export class RoleComponent implements OnInit {

    @ViewChild('lgModal') lgModal;
    roleId: string;

    constructor() { }

    ngOnInit() {
    }

    show() {
        this.lgModal.show();
    }

    hide() {
        this.lgModal.hide();
    }

    setRoleId(roleId) {
        this.roleId = roleId;
    }

}
