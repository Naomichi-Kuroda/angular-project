import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/user.service";
import { ConstantService } from "../../services/constant.service";
import { ToastsManager, Toast } from "ng2-toastr";

@Component({
    selector: 'register-client',
    templateUrl: './register-client.component.html',
})
export class RegisterClientComponent implements OnInit {

    userId: string;
    model: any;
    registerForm: FormGroup;

    jsonGetBody: any;
    jsonPutBody: any;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private constantService: ConstantService,
        private userService: UserService,
        public toastr: ToastsManager
    ) { }

    ngOnInit() {
        this.userId = this.route.snapshot.params['id'];
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
            'password': [ '', [ Validators.required ] ],
            'passwordConfirm': [ '', [ Validators.required ] ],
            'phoneNumber': [ '', [ Validators.required ] ],
        });
        this.getUser();
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

    register() {
        this.userService.storeClient(this.userId, this.model).subscribe(
            res => {
                this.jsonPutBody = res.result;
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
