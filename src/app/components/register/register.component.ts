import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

    model: any;
    registerForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private userService: UserService,
    ) { }

    ngOnInit() {
        this.model = {
            'lastName': '',
            'firstName': '',
            'email': '',
            'password': '',
        };
        this.registerForm = this.fb.group({
            'lastName': [ '', [ Validators.required ] ],
            'firstName': [ '', [ Validators.required ] ],
            'email': [ '', [ Validators.required ] ],
            'password': [ '', [ Validators.required ] ],
            'passwordConfirm': [ '', [ Validators.required ] ],
        });
    }

    register() {
        this.userService.create(this.model).subscribe(
            res => {
                this.router.navigate([ '/login' ]);
            },
            err => {
                console.log(err);
            },
        );
    }

}
