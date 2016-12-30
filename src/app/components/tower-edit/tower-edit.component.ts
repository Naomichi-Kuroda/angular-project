import { Component, OnInit, ViewChild, Input, SimpleChanges, OnChanges } from '@angular/core';
import { AddressFormComponent } from "../address-form/address-form.component";
import { FormGroup, FormBuilder } from "@angular/forms";
import { TowerService } from "../../services/tower.service";
import { ConstantService } from "../../services/constant.service";
import { ToastsManager, Toast } from "ng2-toastr";
import { RoomFormComponent } from "../room-form/room-form.component";

@Component({
    selector: 'tower-edit',
    templateUrl: './tower-edit.component.html',
})
export class TowerEditComponent implements OnInit, OnChanges {

    @Input() towerId: string;
    @ViewChild(AddressFormComponent) chileAddressForm: AddressFormComponent;
    @ViewChild(RoomFormComponent) childRoomForm: RoomFormComponent;

    model: any;
    editForm: FormGroup;
    address: any;

    jsonGetBody: any;
    jsonPostBody: any;
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
            residenceName: [''],
            towerName: [''],
            memo: [''],
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
        this.address = this.chileAddressForm.address;
        let model = {
            residenceName: this.editForm.value.residenceName,
            towerName: this.editForm.value.towerName,
            address: {
                zipCode: this.address.zipCode,
                prefecture: this.address.prefecture,
                city: this.address.city,
                town: this.address.town,
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
                this.toastSuccess('編集完了しました', '建物編集');
            }
        )
    }

    toastSuccess(message, title) {
        this.toastr.success(message, title, {dismiss: 'controlled'})
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
                this.toastWarning('削除完了しました', '建物削除');
            }
        )
    }

    toastWarning(message, title) {
        this.toastr.warning(message, title, {dismiss: 'controlled'})
            .then((toast: Toast) => {
                setTimeout(() => {
                    this.toastr.dismissToast(toast);
                }, this.constantService.SECOND_DISPLAY_TOAST);
            });
    }

    addRooms() {
        let model = {
            roomList: []
        };
        for(var i in this.childRoomForm.tags) {
            model.roomList.push(
                {
                    roomName: this.childRoomForm.tags[i],
                }
            );
        }
        this.towerService.storeRooms(this.towerId, model).subscribe(
            res => {
                this.jsonPostBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.toastSuccess('追加完了しました', '部屋追加');
                this.childRoomForm.ngOnInit();
            }
        )

    }

}
