import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ConstantService } from "../../services/constant.service";
import { Address } from "../../models/address";
import { AddressService } from "../../services/address.service";

@Component({
    selector: 'address-form',
    templateUrl: './address-form.component.html',
    styles: [`
        dl {
            margin-bottom: 0;
        }
        dd {
            margin-bottom: 10px;
        }
    `],
})
export class AddressFormComponent implements OnInit {

    @Input() address: Address;
    addressForm: FormGroup;
    prefectureList: Array<any>;

    @Input() isEditMode: boolean;
    styleShow = {
        '-webkit-appearance': 'none',
        'border': 'none',
        'background': 'none',
        'box-shadow': 'none',
        'overflow': 'auto'
    };

    constructor(
        private fb: FormBuilder,
        private constantService: ConstantService,
        private addressService: AddressService,
    ) { }

    ngOnInit() {
        this.address = new Address;
        this.prefectureList = this.constantService.PREFECTURES;
        this.addressForm = this.fb.group({
            'zipCode': [''],
            'prefecture': [''],
            'city': [''],
            'town': [''],
        });
    }

    search() {
        this.addressService.index(this.addressForm.value.zipCode).subscribe(
            res => {
                this.address = res.result;
            },
            error => {
                console.log(error);
            },
        );
    }

}
