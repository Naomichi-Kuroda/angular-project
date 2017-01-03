import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ConstantService } from "../../services/constant.service";
import { RoomService } from "../../services/room.service";
import { ToastsManager, Toast } from "ng2-toastr";

@Component({
    selector: 'room-edit',
    templateUrl: './room-edit.component.html',
})
export class RoomEditComponent implements OnInit, OnChanges {

    @Input() roomId: string;
    model: any;
    editForm: FormGroup;

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
        private roomService: RoomService,
        private toastr: ToastsManager
    ) { }

    ngOnInit() {
        this.isEditMode = false;
        this.model = {
            residenceName: '',
            towerName: '',
            roomName: '',
            leaveApplySpan: '',
            contractSpan: '',
            manageCode: '',
            memo: '',
        };
        this.editForm = this.fb.group({
            roomName: [''],
            leaveApplySpan: [''],
            contractSpan: [''],
            manageCode: [''],
            memo: [''],
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        this.roomId = changes['roomId'].currentValue;
        if(this.roomId) {
            this.getRoom();
        }
    }

    getRoom() {
        this.roomService.show(this.roomId).subscribe(
            res => {
                this.jsonGetBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.setRoom();
            }
        );
    }

    setRoom() {
        this.model = this.jsonGetBody;
    }

    onEditMode() {
        this.isEditMode = true;
    }

    onShowMode() {
        this.isEditMode = false;
    }

    editRoom() {
        let model = {
            roomName: this.editForm.value.roomName,
            leaveApplySpan: this.editForm.value.leaveApplySpan,
            contractSpan: this.editForm.value.contractSpan,
            manageCode: this.editForm.value.manageCode,
            memo: this.editForm.value.memo,
        };
        this.roomService.update(this.roomId, model).subscribe(
            res => {
                this.jsonPutBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.toastSuccess('編集完了しました', '部屋編集');
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


    deleteRoom() {
        this.roomService.destroy(this.roomId).subscribe(
            res => {
                this.jsonDeleteBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.toastWarning('削除完了しました', '部屋削除');
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
