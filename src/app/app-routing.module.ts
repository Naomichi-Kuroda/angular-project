import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from "./components/error/error.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./guards/auth-guard";
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/register/register.component";
import { RegisterClientComponent } from "./components/register-client/register-client.component";
import { AccountEditComponent } from "./components/account-edit/account-edit.component";
import { ResidenceComponent } from "./pages/residence/residence.component";
import { CompanyComponent } from "./pages/company/company.component";
import { CompanyCreationComponent } from "./pages/company-creation/company-creation.component";

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'register-client/:id', component: RegisterClientComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'account', component: AccountEditComponent, canActivate: [AuthGuard] },
    { path: 'residence', component: ResidenceComponent, canActivate: [AuthGuard] },
    { path: 'company', component: CompanyComponent, canActivate: [AuthGuard] },
    { path: 'company/creation', component: CompanyCreationComponent, canActivate: [AuthGuard] },
    { path: 'error/:code/:message', component: ErrorComponent },
    { path: '**', component: ErrorComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
