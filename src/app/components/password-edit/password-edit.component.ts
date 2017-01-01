import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ConstantService } from "../../services/constant.service";
import { UserService } from "../../services/user.service";
import { ToastsManager, Toast } from "ng2-toastr";

@Component({
    selector: 'password-edit',
    templateUrl: './password-edit.component.html',
    exportAs: 'child'
})
export class PasswordEditComponent implements OnInit {

    @ViewChild('lgModal') lgModal;
    @Input() userId: string;
    editForm: FormGroup;
    error: string;
    jsonPutBody: any;

    constructor(
        private fb: FormBuilder,
        private constantService: ConstantService,
        private userService: UserService,
        public toastr: ToastsManager
    ) { }

    ngOnInit() {
        this.editForm = this.fb.group({
            oldPassword: [''],
            newPassword: [''],
            confirmNewPassword: [''],
        });
    }

    show() {
        this.lgModal.show();
    }

    hide() {
        this.lgModal.hide();
    }

    editPassword() {
        let model = {
            oldPassword: this.editForm.value.oldPassword,
            newPassword: this.editForm.value.newPassword,
            confirmNewPassword: this.editForm.value.confirmNewPassword,
        };
        this.userService.updatePassword(this.userId, model).subscribe(
            res => {
                this.jsonPutBody = res;
            },
            error => {
                console.log(error);
            },
            () => {
                this.toastSuccess('追加完了しました', '建物追加');
                this.ngOnInit();
                this.hide();
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
