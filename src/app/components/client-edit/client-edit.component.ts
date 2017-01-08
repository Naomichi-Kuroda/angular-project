import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ConstantService } from "../../services/constant.service";
import { UserService } from "../../services/user.service";
import { ToastsManager, Toast } from "ng2-toastr";
import { RoleService } from "../../services/role.service";

@Component({
    selector: 'client-edit',
    templateUrl: './client-edit.component.html',
})
export class ClientEditComponent implements OnInit, OnChanges {

    @Input() userId: string;

    model: any;
    editForm: FormGroup;
    statusList: any;
    roleList: any;

    error: any;
    GetBody: any;
    jsonGetBody: any;
    jsonPostBody: any;
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
        private userService: UserService,
        private roleService: RoleService,
        private toastr: ToastsManager
    ) { }

    ngOnInit() {
        this.statusList = this.constantService.convertObjectToArray(this.constantService.USER_STATUS);
        this.isEditMode = false;
        this.model = {
            roleId: '',
            lastName: '',
            firstName: '',
            email: '',
            phoneNumber: '',
            registDate: '',
            status: '',
            memo: '',
        };
        this.editForm = this.fb.group({
            roleId: [''],
            lastName: [''],
            firstName: [''],
            email: [''],
            phoneNumber: [''],
            memo: [''],
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        this.userId = changes['userId'].currentValue;
        if(this.userId) {
            this.getRoles();
            this.getUser();
        }
    }

    getRoles() {
        this.roleService.index().subscribe(
            res => {
                this.GetBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.setRoles();
            }
        );
    }

    setRoles() {
        this.roleList = this.GetBody.roleList;
    }

    getUser() {
        this.userService.show(this.userId).subscribe(
            res => {
                this.jsonGetBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.setUser();
            }
        );
    }

    setUser() {
        this.model = this.jsonGetBody;
    }

    onEditMode() {
        this.isEditMode = true;
    }

    onShowMode() {
        this.isEditMode = false;
    }

    editUser() {
        let model = {
            roleId: this.editForm.value.roleId,
            lastName: this.editForm.value.lastName,
            firstName: this.editForm.value.firstName,
            email: this.editForm.value.email,
            phoneNumber: this.editForm.value.phoneNumber,
            memo: this.editForm.value.memo,
        };
        this.userService.update(this.userId, model).subscribe(
            res => {
                this.jsonPutBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.toastSuccess('編集完了しました', '建物編集');
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


    deleteUser() {
        this.userService.destroy(this.userId).subscribe(
            res => {
                this.jsonDeleteBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.toastWarning('削除完了しました', '建物削除');
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
