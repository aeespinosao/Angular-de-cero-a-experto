import { ValidatorFn, AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

/** A hero's name can't match the hero's alter ego */
export const identityRevealedValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const firstName = control.get('nombreCompleto.firstName').value;
  const lastName = control.get('nombreCompleto.lastName').value;
  const mail = control.get('mail').value;
  console.warn('identityRevealedValidator: ' + firstName);
  console.warn('identityRevealedValidator: ' + lastName);
  console.warn('identityRevealedValidator: ' + mail);
  // console.warn('identityRevealedValidator: ' + control.get('nombreCompleto.firstName'));
  // console.warn('identityRevealedValidator: ' + control.get('nombreCompleto.lastName'));
  // console.warn('identityRevealedValidator: ' + control.get('mail'));
  return firstName == firstName.toUpperCase() && lastName == lastName.toUpperCase() && mail == mail.toUpperCase() ? { 'identityRevealed': true } : null;
};

/** A hero's name can't match the given regular expression */
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    console.warn('forbiddenNameValidator: ' + control.value);
    const forbidden = nameRe.test(control.value);
    return forbidden ? {'forbiddenName': {value: control.value}} : null;

  };
}
