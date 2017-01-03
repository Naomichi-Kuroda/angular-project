import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { ToastsManager, Toast } from "ng2-toastr";
import { ConstantService } from "../../services/constant.service";

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

    model: any;
    registerForm: FormGroup;

    jsonPostBody: any;
    error: any;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private constantService: ConstantService,
        private userService: UserService,
        public toastr: ToastsManager
    ) { }

    ngOnInit() {
        this.error = {
            lastName: [],
            firstName: [],
            email: [],
            password: [],
            phoneNumber: [],
        };
        this.registerForm = this.fb.group({
            lastName: [ '', [ Validators.required ] ],
            firstName: [ '', [ Validators.required ] ],
            email: [ '', [ Validators.required ] ],
            password: [ '', [ Validators.required ] ],
            confirmPassword: [ '', [ Validators.required ] ],
            phoneNumber: [ '', [ Validators.required ] ],
        });
    }

    register() {
        let model = {
            lastName: this.registerForm.value.lastName,
            firstName: this.registerForm.value.firstName,
            email: this.registerForm.value.email,
            password: this.registerForm.value.password,
            phoneNumber: this.registerForm.value.phoneNumber,
        };
        this.userService.store(model).subscribe(
            res => {
                this.jsonPostBody = res.result;
            },
            error => {
                this.hasError(error);
            },
            () => {
                this.toastSuccess('登録完了しました', 'ユーザー登録');
                this.router.navigate([ '/login' ]);
            }
        );
    }

    hasError(error) {
        this.error = error.status;
        if (this.error.code < 200 || this.error.code >= 400) {
            this.router.navigate([ '/error/' + this.error.code + '/' + this.error.message ]);
        } else {
            this.error = error.result;
        }

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
