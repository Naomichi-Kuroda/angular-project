import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ConstantService } from "../../services/constant.service";
import { RoleService } from "../../services/role.service";
import { ToastsManager, Toast } from "ng2-toastr";

@Component({
    selector: 'role-create',
    templateUrl: './role-create.component.html',
})
export class RoleCreateComponent implements OnInit {

    @Input() roleId: string;

    createForm: FormGroup;
    manageRoleList: any;
    contentRoleList: any;
    residenceRoleList: any;

    error: any;
    jsonPostBody: any;

    constructor(
        private fb: FormBuilder,
        private constantService: ConstantService,
        private roleService: RoleService,
        private toastr: ToastsManager
    ) { }

    ngOnInit() {
        this.manageRoleList = this.constantService.ROLE_MANAGE;
        this.contentRoleList = this.constantService.ROLE_CONTENT;
        this.residenceRoleList = this.constantService.ROLE_RESIDENCE;
        this.createForm = this.fb.group({
            roleId: [''],
            roleName: [''],
            memo: [''],
        });
    }

    createRole() {
        let model = {
            roleName: this.createForm.value.roleName,
            manage: this.manageRoleList.filter(opt => opt.checked).map(opt => opt.id),
            content: this.contentRoleList.filter(opt => opt.checked).map(opt => opt.id),
            residence: this.residenceRoleList.filter(opt => opt.checked).map(opt => opt.id),
            memo: this.createForm.value.memo,
        };
        this.roleService.create(model).subscribe(
            res => {
                this.jsonPostBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.toastSuccess('追加完了しました', 'ロール追加');
            }
        )
    }

    toastSuccess(message, title) {
        this.toastr.success(message, title, {dismiss: 'controlled'})
            .then((toast: Toast) => {
                setTimeout(() => {
                    this.toastr.dismissToast(toast);
                }, this.constantService.SECOND_DISPLAY_TOAST);
            });
    }

}
