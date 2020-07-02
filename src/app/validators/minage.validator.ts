import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export const MinimumAge: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return moment(control.value).isAfter(moment().subtract(13, 'years').format('YYYY-MM-DD')) ? { tooYoung: true } : null;
}
