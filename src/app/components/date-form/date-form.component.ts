import { Component, OnInit, Input } from '@angular/core';
import { ConstantService } from "../../services/constant.service";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
    selector: 'date-form',
    templateUrl: './date-form.component.html',
})
export class DateFormComponent implements OnInit {

    @Input() value: string;
    dateForm: FormGroup;
    dt: Date;
    minDate:Date = void 0;
    events:Array<any>;
    tomorrow:Date;
    afterTomorrow:Date;
    showDatepicker: boolean = false;

    constructor(
        private fb: FormBuilder,
        private constantService: ConstantService,
    ) { }

    ngOnInit() {
        this.dt = new Date();
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
        this.value = this.constantService.transformDate(this.dt);
    }

    today(): void {
        this.dt = new Date();
        this.apply();
    }

    open():void {
        this.showDatepicker = true;
    }

    close() {
        this.showDatepicker = false;
    }

    clear():void {
        this.dt = this.value = void 0;
    }

    onSelectionDone(event) {
        this.dt = event;
        this.apply();
    }


}
