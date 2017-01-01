import { Component, OnInit, Input, ViewChildren, QueryList, SimpleChanges, OnChanges } from '@angular/core';
import { DateFormComponent } from "../date-form/date-form.component";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { ConstantService } from "../../services/constant.service";
import { RoomService } from "../../services/room.service";
import { ToastsManager, Toast } from "ng2-toastr";

@Component({
    selector: 'resident-edit',
    templateUrl: './resident-edit.component.html',
})
export class ResidentEditComponent implements OnInit, OnChanges {

    @Input() roomId: string;
    @ViewChildren(DateFormComponent) childrenDateForm: QueryList<DateFormComponent>;

    model: any;
    editForm: FormGroup;
    residentList: any;

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
        private roomService: RoomService,
        private toastr: ToastsManager
    ) { }

    ngOnInit() {
        this.isEditMode = false;
        this.model = { };
        this.editForm = this.fb.group({
            residentList: this.fb.array([
            ]),
        });
        this.residentList = <FormArray>this.editForm.controls['residentList'];
    }

    ngOnChanges(changes: SimpleChanges) {
        this.roomId = changes['roomId'].currentValue;
        if(this.roomId) {
            this.ngOnInit();
            this.getResidents();
        }
    }

    initResident() {
        return this.fb.group({
            residentName: [''],
            phoneNumber: [''],
            startDate: [''],
            endDate: [''],
            limitDate: [''],
            memo: [''],
        });
    }

    getResidents() {
        this.roomService.indexResidents(this.roomId).subscribe(
            res => {
                this.jsonGetBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.setResidents();
            }
        );
    }

    setResidents() {
        for(var i in this.jsonGetBody.residentList) {
            this.model[i] = this.jsonGetBody.residentList[i];
            this.residentList.push(this.initResident());
        }

    }

    onEditMode() {
        this.isEditMode = true;
    }

    onShowMode() {
        this.isEditMode = false;
    }

    editResident() {
        let model = {
            // residentName: this.editForm.value.residentName,
            // phoneNumber: this.editForm.value.phoneNumber,
            // startDate: this.childrenDateForm.toArray()[0].dt.toISOString().substring(0, 19).replace('T', ' '),
            // endDate: this.childrenDateForm.toArray()[1].dt.toISOString().substring(0, 19).replace('T', ' '),
            // limitDate: this.childrenDateForm.toArray()[2].dt.toISOString().substring(0, 19).replace('T', ' '),
            // memo: this.editForm.value.memo,
        };

        this.roomService.storeResident(this.roomId, model).subscribe(
            res => {
                this.jsonPostBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.toastSuccess('追加完了しました', '居住者追加');
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
