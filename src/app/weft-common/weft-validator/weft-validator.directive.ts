import { Directive } from '@angular/core';
import { NG_VALIDATORS, ValidationErrors, Validator, AbstractControl } from '@angular/forms';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[weftValidator]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: WeftValidator, multi: true }
    ]
})
export class WeftValidator implements Validator {

    static required(control: AbstractControl): ValidationErrors | null {
        const isInvalid = (control && control.value && control.value.toString() || '').trim().length === 0;
        return isInvalid ? { required: true } : null;
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return WeftValidator.required(control);
    }
}
