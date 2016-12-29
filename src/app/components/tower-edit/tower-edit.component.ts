import { Component, OnInit, ViewChild, Input, SimpleChanges, OnChanges } from '@angular/core';
import { AddressFormComponent } from "../address-form/address-form.component";
import { FormGroup, FormBuilder } from "@angular/forms";
import { TowerService } from "../../services/tower.service";
import { ConstantService } from "../../services/constant.service";

@Component({
    selector: 'tower-edit',
    templateUrl: './tower-edit.component.html',
})
export class TowerEditComponent implements OnInit, OnChanges {

    @Input() towerId: string;
    @ViewChild(AddressFormComponent)
    chileAddressForm: AddressFormComponent;

    model: any;
    editForm: FormGroup;
    addressForm: FormGroup;

    jsonGetBody: any;
    jsonPutBody: any;
    jsonDeleteBody: any;

    isEditMode: boolean;
    styleShow = {
        '-webkit-appearance': 'none',
        'border': 'none',
        'background': 'none',
        'box-shadow': 'none',
        'overflow': 'hidden'
    };

    constructor(
        private fb: FormBuilder,
        private constantService: ConstantService,
        private towerService: TowerService,
    ) { }

    ngOnInit() {
        this.isEditMode = false;
        this.addressForm = this.chileAddressForm.addressForm;
        this.model = {
            residenceName: '',
            towerName: '',
            address: {
                zipCode: '',
                prefecture: '',
                city: '',
                town: '',
            },
            memo: '',
        };
        this.editForm = this.fb.group({
            residenceName: [this.model.residenceName],
            towerName: [this.model.towerName],
            memo: [this.model.towerMemo],
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        this.towerId = changes['towerId'].currentValue;
        if(this.towerId) {
            this.getTower();
        }
    }

    getTower() {
        this.towerService.show(this.towerId).subscribe(
            res => {
                this.jsonGetBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.setTower();
            }
        );
    }

    setTower() {
        this.model = this.jsonGetBody;
    }

    onEditMode() {
        this.isEditMode = true;
    }

    onShowMode() {
        this.isEditMode = false;
    }

    addRooms() {

    }

    editTower() {
        let model = {
            residenceName: this.editForm.value.residenceName,
            towerName: this.editForm.value.towerName,
            address: {
                zipCode: this.addressForm.value.zipCode,
                prefecture: this.addressForm.value.prefecture,
                city: this.addressForm.value.city,
                town: this.addressForm.value.town,
            },
            towerMemo: this.editForm.value.towerMemo,
        };
        this.towerService.update(this.towerId, model).subscribe(
            res => {
                this.jsonPutBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.constantService.showSuccess('編集完了しました', '建物編集');
            }
        )
    }

    deleteTower() {
        this.towerService.remove(this.towerId).subscribe(
            res => {
                this.jsonDeleteBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.constantService.showWarning('削除完了しました', '建物削除');
            }
        )
    }

}
