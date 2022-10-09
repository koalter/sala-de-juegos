import { AbstractControl } from "@angular/forms";


export function ValidatorEdad(control : AbstractControl) {
    if (control.value < 18 || control.value > 99) {
        return { edadInvalida: true };
    }
    return null;
}