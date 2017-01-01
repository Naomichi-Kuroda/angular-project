import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ConstantService } from "../../services/constant.service";
import { AuthService } from "../../services/auth.service";
import { ToastsManager, Toast } from "ng2-toastr";
import { UserService } from "../../services/user.service";

@Component({
    selector: 'account-edit',
    templateUrl: './account-edit.component.html',
})
export class AccountEditComponent implements OnInit {

    userId: string;
    model: any;
    editForm: FormGroup;

    jsonGetBody: any;
    jsonPutBody: any;

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
        private authService: AuthService,
        private userService: UserService,
        private toastr: ToastsManager
    ) { }

    ngOnInit() {
        this.isEditMode = false;
        this.model = {
            userId: '',
            lastName: '',
            firstName: '',
            email: '',
            phoneNumber: '',
        };
        this.editForm = this.fb.group({
            lastName: [''],
            firstName: [''],
            email: [''],
            phoneNumber: [''],
        });
        this.getAccount();
    }

    getAccount() {
        this.authService.getUser().subscribe(
            res => {
                this.jsonGetBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.setAccount();
            }
        );
    }

    setAccount() {
        this.userId = this.jsonGetBody.userId;
        this.model = this.jsonGetBody;
    }

    onEditMode() {
        this.isEditMode = true;
    }

    onShowMode() {
        this.isEditMode = false;
    }

    editAccount() {
        let model = {
            lastName: this.editForm.value.lastName,
            firstName: this.editForm.value.firstName,
            email: this.editForm.value.email,
            phoneNumber: this.editForm.value.phoneNumber,
        };
        this.userService.update(this.userId, model).subscribe(
            res => {
                this.jsonPutBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.toastSuccess('編集完了しました', 'アカウント編集');
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
