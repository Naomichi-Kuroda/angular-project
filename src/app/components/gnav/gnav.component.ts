import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ConstantService } from "../../services/constant.service";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'gnav',
    templateUrl: './gnav.component.html',
})
export class GnavComponent implements OnInit {

    app_name: string;
    user: any;

    constructor(
        private router: Router,
        private constantService: ConstantService,
        private authService: AuthService,
    ) { }

    ngOnInit() {
        this.app_name = this.constantService.APP_NAME;
        this.user = {
            "lastName": "黒田",
            "firstName": "直道",
        };
    }

    logout(): void {
        this.authService.logout();
    }

}
