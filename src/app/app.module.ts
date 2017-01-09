// Module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { AppRoutingModule } from "./app-routing.module";
import { ModalModule, DatepickerModule, DropdownModule } from "ng2-bootstrap";
import { ToastModule } from "ng2-toastr";

// Service
import { AuthHttp, AuthConfig, provideAuth, AUTH_PROVIDERS } from "angular2-jwt";
import { AuthGuard } from "./guards/auth-guard";
import { ConstantService } from "./services/constant.service";
import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";
import { AddressService } from "./services/address.service";
import { TowerService } from "./services/tower.service";
import { ResidenceService } from "./services/residence.service";
import { RoomService } from "./services/room.service";
import { ResidentService } from "./services/resident.service";
import { CompanyService } from "./services/company.service";
import { ValidationService } from "./services/validation.service";
import { RoleService } from "./services/role.service";

// Page
import { ResidenceComponent } from "./pages/residence/residence.component";
import { CompanyComponent } from "./pages/company/company.component";
import { CompanyCreationComponent } from "./pages/company-creation/company-creation.component";
import { ClientComponent } from "./pages/client/client.component";

// Component
import { AppComponent } from './app.component';
import { ErrorComponent } from "./components/error/error.component";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/register/register.component";
import { GnavComponent } from "./components/gnav/gnav.component";
import { AddressFormComponent } from "./components/address-form/address-form.component";
import { TowerListComponent } from "./components/tower-list/tower-list.component";
import { TowerEditComponent } from "./components/tower-edit/tower-edit.component";
import { RoomFormComponent } from "./components/room-form/room-form.component";
import { ResidenceCreateComponent } from "./components/residence-create/residence-create.component";
import { RoomListComponent } from "./components/room-list/room-list.component";
import { ResidentCreateComponent } from "./components/resident-create/resident-create.component";
import { DateFormComponent } from "./components/date-form/date-form.component";
import { ResidentEditComponent } from "./components/resident-edit/resident-edit.component";
import { RoomEditComponent } from "./components/room-edit/room-edit.component";
import { AccountEditComponent } from "./components/account-edit/account-edit.component";
import { PasswordEditComponent } from "./components/password-edit/password-edit.component";
import { CompanyListComponent } from "./components/company-list/company-list.component";
import { CompanyCreateComponent } from "./components/company-create/company-create.component";
import { UserCreateComponent } from "./components/user-create/user-create.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { UserConfirmComponent } from "./components/user-confirm/user-confirm.component";
import { RegisterClientComponent } from "./components/register-client/register-client.component";
import { ValidationMessageComponent } from "./components/validation-message/validation-message.component";
import { ClientListComponent } from "./components/client-list/client-list.component";
import { ClientEditComponent } from "./components/client-edit/client-edit.component";
import { RoleComponent } from "./components/role/role.component";
import { RoleListComponent } from "./components/role-list/role-list.component";
import { RoleEditComponent } from "./components/role-edit/role-edit.component";
import { RoleCreateComponent } from "./components/role-create/role-create.component";

function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig({
        tokenName: 'token',
        tokenGetter: (() => sessionStorage.getItem('token')),
        globalHeaders: [{'Content-Type':'application/json'}],
    }), http, options);
}

@NgModule({
    declarations: [
        AppComponent,
        ErrorComponent,
        LoginComponent,
        HomeComponent,
        RegisterComponent,
        GnavComponent,
        AddressFormComponent,
        TowerListComponent,
        TowerEditComponent,
        RoomFormComponent,
        ResidenceComponent,
        ResidenceCreateComponent,
        RoomListComponent,
        ResidentCreateComponent,
        DateFormComponent,
        ResidentEditComponent,
        RoomEditComponent,
        AccountEditComponent,
        PasswordEditComponent,
        CompanyComponent,
        CompanyListComponent,
        CompanyCreateComponent,
        UserCreateComponent,
        CompanyCreationComponent,
        UserListComponent,
        UserConfirmComponent,
        RegisterClientComponent,
        ValidationMessageComponent,
        ClientListComponent,
        ClientComponent,
        ClientEditComponent,
        RoleComponent,
        RoleListComponent,
        RoleEditComponent,
        RoleCreateComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AppRoutingModule,
        ModalModule.forRoot(),
        DatepickerModule.forRoot(),
        DropdownModule.forRoot(),
        ToastModule
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
        UserService,
        AddressService,
        TowerService,
        ResidenceService,
        RoomService,
        ResidentService,
        CompanyService,
        ValidationService,
        RoleService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
