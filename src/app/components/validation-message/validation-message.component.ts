import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from "@angular/forms";
import { ValidationService } from "../../services/validation.service";

@Component({
    selector: 'validation-message',
    templateUrl: './validation-message.component.html',
})
export class ValidationMessageComponent implements OnInit {

    @Input() control: FormControl;

    constructor(
        private validationService: ValidationService
    ) { }

    ngOnInit() {
    }

    get errorMessage() {
        for (let propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                return this.validationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
            }
        }
        return null;
    }

}
