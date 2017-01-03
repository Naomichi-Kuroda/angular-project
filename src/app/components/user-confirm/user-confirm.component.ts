import { Component, OnInit, ViewChild, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ConstantService } from "../../services/constant.service";
import { UserService } from "../../services/user.service";
import { ToastsManager, Toast } from "ng2-toastr";

@Component({
    selector: 'user-confirm',
    templateUrl: './user-confirm.component.html',
    exportAs: 'child'
})
export class UserConfirmComponent implements OnInit {

    @ViewChild('lgModal') lgModal;
    @Input() user: any;

    jsonGetBody: any;

    constructor(
        private constantService: ConstantService,
        private userService: UserService,
        public toastr: ToastsManager
    ) { }

    ngOnInit() {
    }

    show() {
        this.lgModal.show();
    }

    hide() {
        this.lgModal.hide();
    }

    sendConfirmationMail() {
        this.userService.sendConfirmationMail(this.user.userId).subscribe(
            res => {
                this.jsonGetBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.toastSuccess('送信完了しました', '確認メール送信');
                this.hide();
                this.ngOnInit();
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

}
