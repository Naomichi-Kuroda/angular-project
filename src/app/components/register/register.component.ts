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

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private constantService: ConstantService,
        private userService: UserService,
        public toastr: ToastsManager
    ) { }

    ngOnInit() {
        this.model = {
            'lastName': '',
            'firstName': '',
            'email': '',
            'password': '',
            'phoneNumber': '',
        };
        this.registerForm = this.fb.group({
            'lastName': [ '', [ Validators.required ] ],
            'firstName': [ '', [ Validators.required ] ],
            'email': [ '', [ Validators.required ] ],
            'password': [ '', [ Validators.required ] ],
            'passwordConfirm': [ '', [ Validators.required ] ],
            'phoneNumber': [ '', [ Validators.required ] ],
        });
    }

    register() {
        this.userService.store(this.model).subscribe(
            res => {
                this.jsonPostBody = res.result;
            },
            error => {
                console.log(error);
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
