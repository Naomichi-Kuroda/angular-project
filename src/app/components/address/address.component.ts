import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ConstantService } from "../../services/constant.service";
import { Address } from "../../models/address";
import { AddressService } from "../../services/address.service";

@Component({
    selector: 'address',
    templateUrl: './address.component.html',
})
export class AddressComponent implements OnInit {

    @Input() address: Address;
    addressForm: FormGroup;
    prefectureList: Array<any>;

    constructor(
        private fb: FormBuilder,
        private constantService: ConstantService,
        private addressService: AddressService,
    ) {
        this.address = new Address;
        this.prefectureList = this.constantService.PREFECTURES;
        this.addressForm = this.fb.group({
            'zipCode': [''],
            'prefecture': [''],
            'city': [''],
            'town': [''],
        });
    }

    ngOnInit() {
    }

    search() {
        this.addressService.get(this.addressForm.value.zipCode).subscribe(
            res => {
                this.address = res.result;
            },
            error => {
                console.log(error);
            },
        );
    }

}
