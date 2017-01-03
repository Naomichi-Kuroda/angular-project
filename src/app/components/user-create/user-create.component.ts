import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from "@angular/forms";
import { ConstantService } from "../../services/constant.service";
import { ToastsManager, Toast } from "ng2-toastr";
import { CompanyService } from "../../services/company.service";
import { UserListComponent } from "../user-list/user-list.component";

@Component({
    selector: 'user-create',
    templateUrl: './user-create.component.html',
})
export class UserCreateComponent implements OnInit, OnChanges {

    @ViewChild(UserListComponent) chileUserList: UserListComponent;
    @Input() companyId: string;
    createForm: FormGroup;
    userList: FormArray;

    jsonPostBody: any;

    constructor(
        private fb: FormBuilder,
        private constantService: ConstantService,
        private companyService: CompanyService,
        private toastr: ToastsManager
    ) { }

    ngOnInit() {
        this.createForm = this.fb.group({
            userList: this.fb.array([
            ]),
        });
        this.userList = <FormArray>this.createForm.controls['userList'];
        this.addUser();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.companyId = changes['companyId'].currentValue;
        this.ngOnInit()
    }

    initUser() {
        return this.fb.group({
            lastName: [''],
            firstName: [''],
            email: ['']
        });
    }

    addUser() {
        this.userList.push(this.initUser());
    }

    removeUser(i: number) {
        this.userList.removeAt(i);
    }

    createUsers() {
        let model = {
            userList: []
        };

        for(var k in this.userList.controls) {
            model.userList.push(
                {
                    lastName: this.userList.controls[k].value.lastName,
                    firstName: this.userList.controls[k].value.firstName,
                    email: this.userList.controls[k].value.email,
                }
            );
        }

        this.companyService.storeUsers(this.companyId, model).subscribe(
            res => {
                this.jsonPostBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.toastSuccess('追加完了しました', 'アカウント追加');
                this.chileUserList.getUserList();
                this.ngOnInit();
            }
        )
    };

    toastSuccess(message, title) {
        this.toastr.success(message, title, {dismiss: 'controlled'})
            .then((toast: Toast) => {
                setTimeout(() => {
                    this.toastr.dismissToast(toast);
                }, this.constantService.SECOND_DISPLAY_TOAST);
            });
    }

}
