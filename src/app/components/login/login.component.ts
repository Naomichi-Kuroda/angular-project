import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

    model: any;
    loginForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
    ) { }

    ngOnInit() {
        this.model = {
            'email': '',
            'password': '',
        };
        this.loginForm = this.fb.group({
            'email': ['', [Validators.required]],
            'password': ['', [Validators.required]],
            'remember': [''],
        });
    }

    login() {
        this.authService.login(this.model).subscribe(
            res => {
                this.authService.setTokenToStorage(res.token, this.loginForm.value.remember);
                this.router.navigate([ '/' ]);
            },
            err => {
                console.log(err);
            },
        );
    }

}
