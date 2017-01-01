import { Component, OnInit, Input } from '@angular/core';
import { ConstantService } from "../../services/constant.service";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
    selector: 'date-form',
    templateUrl: './date-form.component.html',
})
export class DateFormComponent implements OnInit {

    @Input() date: Date;
    value: string;
    dateForm: FormGroup;
    minDate:Date = void 0;
    events:Array<any>;
    tomorrow:Date;
    afterTomorrow:Date;
    showDatepicker: boolean = false;

    @Input() isEditMode: boolean;
    styleShow = {
        '-webkit-appearance': 'none',
        'border': 'none',
        'background': 'none',
        'box-shadow': 'none',
        'overflow': 'auto'
    };

    constructor(
        private fb: FormBuilder,
        private constantService: ConstantService,
    ) { }

    ngOnInit() {
        (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
        (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
        (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
        this.events = [
            {date: this.tomorrow, status: 'full'},
            {date: this.afterTomorrow, status: 'partially'}
        ];
        this.dateForm = this.fb.group({
            'date': [''],
        });
        this.apply();
    }

    apply(): void {
        this.value = this.constantService.transformDate(this.date);
    }

    today(): void {
        this.date = new Date();
        this.apply();
    }

    open():void {
        this.showDatepicker = true;
    }

    close() {
        this.showDatepicker = false;
    }

    clear():void {
        this.date = this.value = void 0;
    }

    onSelectionDone(event) {
        this.date = event;
        this.apply();
    }


}
