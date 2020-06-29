import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const MatchPasswords: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  return formGroup.get('password').value === formGroup.get('passwordVerify').value ? null : { notMatching: true };
};
