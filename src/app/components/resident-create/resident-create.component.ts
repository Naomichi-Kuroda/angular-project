import { Component, OnInit, ViewChild, Input, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ConstantService } from "../../services/constant.service";
import { RoomService } from "../../services/room.service";
import { ToastsManager, Toast } from "ng2-toastr";
import { DateFormComponent } from "../date-form/date-form.component";

@Component({
    selector: 'resident-create',
    templateUrl: './resident-create.component.html',
    exportAs: 'child'
})
export class ResidentCreateComponent implements OnInit {

    @Input() roomId: string;
    @ViewChild('lgModal') lgModal;
    @ViewChildren(DateFormComponent) childrenDateForm: QueryList<DateFormComponent>;

    createForm: FormGroup;

    jsonPostBody: any;

    constructor(
        private fb: FormBuilder,
        private constantService: ConstantService,
        private roomService: RoomService,
        private toastr: ToastsManager
    ) { }

    ngOnInit() {
        this.createForm = this.fb.group({
            residentName: [''],
            phoneNumber: [''],
            startDate: [''],
            endDate: [''],
            limitDate: [''],
            memo: [''],
        });
    }

    show() {
        this.lgModal.show();
    }

    hide() {
        this.lgModal.hide();
    }

    createResident() {
        let model = {
            residentName: this.createForm.value.residentName,
            phoneNumber: this.createForm.value.phoneNumber,
            startDate: this.childrenDateForm.toArray()[0].dt.toISOString().substring(0, 19).replace('T', ' '),
            endDate: this.childrenDateForm.toArray()[1].dt.toISOString().substring(0, 19).replace('T', ' '),
            limitDate: this.childrenDateForm.toArray()[2].dt.toISOString().substring(0, 19).replace('T', ' '),
            memo: this.createForm.value.memo,
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
                this.hide();
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
