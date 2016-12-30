import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { ConstantService } from "../../services/constant.service";
import { ResidenceService } from "../../services/residence.service";
import { ToastsManager, Toast } from "ng2-toastr";
import { AddressFormComponent } from "../address-form/address-form.component";
import { RoomFormComponent } from "../room-form/room-form.component";

@Component({
    selector: 'residence-create',
    templateUrl: './residence-create.component.html',
    styles: [`
        dl {
            margin-bottom: 0;
        }
        dd {
            margin-bottom: 10px;
        }
    `],
    exportAs: 'child'
})
export class ResidenceCreateComponent implements OnInit {

    @ViewChild('lgModal') lgModal;
    @ViewChild(AddressFormComponent) chileAddressForm: AddressFormComponent;
    @ViewChildren(RoomFormComponent) childrenRoomForm: QueryList<RoomFormComponent>;

    createForm: FormGroup;
    address: any;
    towerList: FormArray;
    roomList: any;

    jsonPostBody: any;

    isEditMode: boolean;

    constructor(
        private fb: FormBuilder,
        private constantService: ConstantService,
        private residenceService: ResidenceService,
        private toastr: ToastsManager
    ) { }

    ngOnInit() {
        this.isEditMode = true;
        this.chileAddressForm.ngOnInit();
        this.createForm = this.fb.group({
            residenceName: [''],
            towerList: this.fb.array([
            ]),
        });
        this.towerList = <FormArray>this.createForm.controls['towerList'];
    }

    initTower() {
        return this.fb.group({
            towerName: [''],
            roomList: ['']
        });
    }

    addTower() {
        this.towerList.push(this.initTower());
    }

    removeTower(i: number) {
        this.towerList.removeAt(i);
    }

    show() {
        this.lgModal.show();
    }

    hide() {
        this.lgModal.hide();
    }

    createResidence() {
        this.address = this.chileAddressForm.address;
        let model = {
            residenceName: this.createForm.value.residenceName,
            address: {
                zipCode: this.address.zipCode,
                prefecture: this.address.prefecture,
                city: this.address.city,
                town: this.address.town,
            },
            towerList: []
        };

        for(var k in this.towerList.controls) {
            model.towerList.push(
                {
                    towerName: this.towerList.controls[k].value.towerName,
                    roomList: []
                }
            );
            for(var l in this.childrenRoomForm.toArray()[k].tags) {
                model.towerList[k].roomList.push(
                    {
                        roomName: this.childrenRoomForm.toArray()[k].tags[l],
                    }
                );
            }
        }

        this.residenceService.store(model).subscribe(
            res => {
                this.jsonPostBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.toastSuccess();
                this.hide();
                this.ngOnInit();
            }
        )
    };

    toastSuccess() {
        this.toastr.success('追加完了しました', '建物追加', {dismiss: 'controlled'})
            .then((toast: Toast) => {
                setTimeout(() => {
                    this.toastr.dismissToast(toast);
                }, this.constantService.SECOND_DISPLAY_TOAST);
            });
    }

}
