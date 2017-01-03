import { Injectable } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Injectable()
export class ValidationService {

    constructor() { }

    getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config = {
            'required': '必須項目です',
            'minlength': validatorValue.requiredLength + "文字以上で入力してください",
            'invalidEmailAddress': 'メールアドレス形式が正しくありません',
            'invalidPassword': 'パスワード形式が正しくありません',
            'invalidSame': 'パスワードが異なります',
        };
        return config[validatorName];
    }

    emailValidator(control) {
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    passwordValidator(control) {
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }

    matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): {[key: string]: any} => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];
            if (password.value === confirmPassword.value) {
                return null;
            } else {
                return { 'invalidSame': true };
            }
        }
    }

}
