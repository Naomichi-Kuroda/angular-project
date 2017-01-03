import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { ToastsManager, Toast } from "ng2-toastr";
import { ConstantService } from "../../services/constant.service";
import { ValidationService } from "../../services/validation.service";

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
        private validationService: ValidationService,
        private toastr: ToastsManager
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
        }, {validator: this.validationService.matchingPasswords('password', 'confirmPassword')});
    }

    register() {
        let model = {
            lastName: this.registerForm.value.lastName,
            firstName: this.registerForm.value.firstName,
            email: this.registerForm.value.email,
            password: this.registerForm.value.password,
            confirmPassword: this.registerForm.value.password,
            phoneNumber: this.registerForm.value.phoneNumber,
        };
        this.userService.store(model).subscribe(
            res => {
                this.jsonPostBody = res.result;
            },
            error => {
                this.error = this.constantService.hasError(error);
            },
            () => {
                this.toastSuccess('登録完了しました', 'ユーザー登録');
                this.router.navigate([ '/login' ]);
            }
        );
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
