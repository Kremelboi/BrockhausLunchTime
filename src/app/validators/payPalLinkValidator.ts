import {AbstractControl, ValidatorFn} from '@angular/forms';

export function payPalLinkValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const paypalMePattern = /^https:\/\/paypal\.me\/[a-zA-Z0-9-_]+$/;

    if (!paypalMePattern.test(value)) {
      return {invalidPaypalMe: true};
    }

    return null;
  };
}
