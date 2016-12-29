import { Component, OnInit, ViewChild, Input, SimpleChanges, OnChanges } from '@angular/core';
import { AddressFormComponent } from "../address-form/address-form.component";
import { FormGroup, FormBuilder } from "@angular/forms";
import { TowerService } from "../../services/tower.service";
import { ConstantService } from "../../services/constant.service";
import { ToastsManager, Toast } from "ng2-toastr";

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
        'overflow': 'hidden',
    };

    constructor(
        private fb: FormBuilder,
        private constantService: ConstantService,
        private towerService: TowerService,
        private toastr: ToastsManager
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
            memo: this.editForm.value.memo,
        };
        this.towerService.update(this.towerId, model).subscribe(
            res => {
                this.jsonPutBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.toastSuccess();
            }
        )
    }

    toastSuccess() {
        this.toastr.success('編集完了しました', '建物編集', {dismiss: 'controlled'})
            .then((toast: Toast) => {
                setTimeout(() => {
                    this.toastr.dismissToast(toast);
                }, this.constantService.SECOND_DISPLAY_TOAST);
            });
    }


    deleteTower() {
        this.towerService.destroy(this.towerId).subscribe(
            res => {
                this.jsonDeleteBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.toastWarning();
            }
        )
    }

    toastWarning() {
        this.toastr.warning('削除完了しました', '建物削除', {dismiss: 'controlled'})
            .then((toast: Toast) => {
                setTimeout(() => {
                    this.toastr.dismissToast(toast);
                }, this.constantService.SECOND_DISPLAY_TOAST);
            });
    }

    addRooms() {

    }

}
