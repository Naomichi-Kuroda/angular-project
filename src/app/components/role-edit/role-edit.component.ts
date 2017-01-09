import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ConstantService } from "../../services/constant.service";
import { RoleService } from "../../services/role.service";
import { ToastsManager, Toast } from "ng2-toastr";

@Component({
    selector: 'role-edit',
    templateUrl: './role-edit.component.html',
})
export class RoleEditComponent implements OnInit, OnChanges {

    @Input() roleId: string;

    model: any;
    editForm: FormGroup;
    manageRoleList: any;
    contentRoleList: any;
    residenceRoleList: any;

    error: any;
    jsonGetBody: any;
    jsonPutBody: any;
    jsonDeleteBody: any;

    isEditMode: boolean;
    styleShow = {
        '-webkit-appearance': 'none',
        'border': 'none',
        'background': 'none',
        'box-shadow': 'none',
        'overflow': 'hidden',
    };

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
        this.isEditMode = false;
        this.model = {
            roleId: '',
            roleName: '',
            manage: [],
            content: [],
            residence: [],
            memo: '',
        };
        this.editForm = this.fb.group({
            roleId: [''],
            roleName: [''],
            memo: [''],
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        this.roleId = changes['roleId'].currentValue;
        if(this.roleId) {
            this.getRole();
        }
    }

    getRole() {
        this.roleService.show(this.roleId).subscribe(
            res => {
                this.jsonGetBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.setRole();
            }
        );
    }

    setRole() {
        this.model = this.jsonGetBody;
        for(var i in this.manageRoleList) {
            if(this.model.manage.indexOf(this.manageRoleList[i].id) >= 0) {
                this.manageRoleList[i].checked = true;
            } else {
                this.manageRoleList[i].checked = false;
            }
        }
        for(var i in this.contentRoleList) {
            if(this.model.content.indexOf(this.contentRoleList[i].id) >= 0) {
                this.contentRoleList[i].checked = true;
            } else {
                this.contentRoleList[i].checked = false;
            }
        }
        for(var i in this.residenceRoleList) {
            if(this.model.residence.indexOf(this.residenceRoleList[i].id) >= 0) {
                this.residenceRoleList[i].checked = true;
            } else {
                this.residenceRoleList[i].checked = false;
            }
        }
    }

    onEditMode() {
        this.isEditMode = true;
    }

    onShowMode() {
        this.isEditMode = false;
    }

    editRole() {
        let model = {
            roleName: this.editForm.value.roleName,
            manage: this.manageRoleList.filter(opt => opt.checked).map(opt => opt.id),
            content: this.contentRoleList.filter(opt => opt.checked).map(opt => opt.id),
            residence: this.residenceRoleList.filter(opt => opt.checked).map(opt => opt.id),
            memo: this.editForm.value.memo,
        };
        this.roleService.update(this.roleId, model).subscribe(
            res => {
                this.jsonPutBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.toastSuccess('編集完了しました', 'ロール編集');
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

    deleteRole() {
        this.roleService.destroy(this.roleId).subscribe(
            res => {
                this.jsonDeleteBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.toastWarning('削除完了しました', 'ロール削除');
            }
        )
    }

    toastWarning(message, title) {
        this.toastr.warning(message, title, {dismiss: 'controlled'})
            .then((toast: Toast) => {
                setTimeout(() => {
                    this.toastr.dismissToast(toast);
                }, this.constantService.SECOND_DISPLAY_TOAST);
            });
    }

}
