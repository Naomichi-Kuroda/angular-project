// Module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { AppRoutingModule } from "./app-routing.module";

// Service
import { AuthHttp, AuthConfig } from "angular2-jwt";
import { AuthGuard } from "./guards/auth-guard";
import { ConstantService } from "./services/constant.service";
import { AuthService } from "./services/auth.service";

// Component
import { AppComponent } from './app.component';
import { ErrorComponent } from "./components/error/error.component";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/register/register.component";
import { UserService } from "./services/user.service";

function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig({
        tokenName: 'token',
        tokenGetter: (() => sessionStorage.getItem('token')),
    }), http, options);
}

@NgModule({
    declarations: [
        AppComponent,
        ErrorComponent,
        LoginComponent,
        HomeComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AppRoutingModule,
    ],
    providers: [
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        },
        AuthGuard,
        ConstantService,
        AuthService,
        UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
