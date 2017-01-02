import { Component, OnInit, ViewChild } from '@angular/core';
import { AddressFormComponent } from "../address-form/address-form.component";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ConstantService } from "../../services/constant.service";
import { CompanyService } from "../../services/company.service";
import { ToastsManager, Toast } from "ng2-toastr";

@Component({
    selector: 'company-create',
    templateUrl: './company-create.component.html',
})
export class CompanyCreateComponent implements OnInit {

    @ViewChild(AddressFormComponent) chileAddressForm: AddressFormComponent;

    createForm: FormGroup;
    address: any;

    jsonPostBody: any;

    isEditMode: boolean;

    constructor(
        private fb: FormBuilder,
        private constantService: ConstantService,
        private companyService: CompanyService,
        private toastr: ToastsManager
    ) { }

    ngOnInit() {
        this.isEditMode = true;
        this.chileAddressForm.ngOnInit();
        this.createForm = this.fb.group({
            companyName: [''],
            phoneNumber: [''],
            memo: [''],
        });
    }

    createCompany() {
        this.address = this.chileAddressForm.address;
        let model = {
            companyName: this.createForm.value.companyName,
            address: {
                zipCode: this.address.zipCode,
                prefecture: this.address.prefecture,
                city: this.address.city,
                town: this.address.town,
            },
            phoneNumber: this.createForm.value.phoneNumber,
            memo: this.createForm.value.memo,
        };

        this.companyService.store(model).subscribe(
            res => {
                this.jsonPostBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.toastSuccess('追加完了しました', '会社追加');
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
