import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {AbstractControl} from "@angular/forms";
import {AlertCreator} from "./alert-creator";


@Injectable()
export class FormValidator {

  constructor(public alertCreator:AlertCreator) {
  }

  isValidField(field: AbstractControl, message: string) {
    let isValid = field.valid;

    if (!isValid) {
      this.alertCreator.showSimpleAlert('Error', message);
    }

    return isValid;
  }

  isValidName(field: AbstractControl, message:string) {
    return this.isValidField(field, message);
  }

  isValidPhone(field: AbstractControl, message:string) {
    return this.isValidField(field, message);
  }

  isValidEmail(field: AbstractControl, message:string) {
    return this.isValidField(field, message);
  }

  isValidUserName(field: AbstractControl, message:string){
    return this.isValidField(field, message);

  }

}
