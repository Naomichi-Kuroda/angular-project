import { Component, OnInit, Input, ViewChildren, QueryList, SimpleChanges, OnChanges } from '@angular/core';
import { DateFormComponent } from "../date-form/date-form.component";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { ConstantService } from "../../services/constant.service";
import { RoomService } from "../../services/room.service";
import { ToastsManager, Toast } from "ng2-toastr";
import { ResidentService } from "../../services/resident.service";

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
    deleteResidentId: string;

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
        private residentService: ResidentService,
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
            residentId: [''],
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

    editResident(i) {
        let residentId = this.residentList.controls[i].value.residentId;
        let model = {
            residentName: this.residentList.controls[i].value.residentName,
            phoneNumber: this.residentList.controls[i].value.phoneNumber,
            startDate: this.childrenDateForm.toArray()[3*i+0].date,
            endDate: this.childrenDateForm.toArray()[3*i+1].date,
            limitDate: this.childrenDateForm.toArray()[3*i+2].date,
            memo: this.residentList.controls[i].value.memo,
        };

        this.residentService.update(residentId, model).subscribe(
            res => {
                this.jsonPostBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.toastSuccess('編集完了しました', '居住者編集');
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

    setDeleteResidentId(i) {
        this.deleteResidentId = this.residentList.controls[i].value.residentId;
    }

    deleteResident() {
        this.residentService.destroy(this.deleteResidentId).subscribe(
            res => {
                this.jsonDeleteBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.toastWarning('削除完了しました', '居住者削除');
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

}
