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
    return this.isValidInput(isValid, message);
  }

  isValidInput(isValid:boolean, message: string){
    if (!isValid) {
      this.alertCreator.showSimpleAlert('', message);
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
    let emailRegExp=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/;
    let isValid:boolean= (field.value=='' || emailRegExp.test(field.value)) ? true : false;
    return this.isValidInput(isValid, message);
  }

  isValidUserName(field: AbstractControl, message:string){
    return this.isValidField(field, message);
  }

  IsValidPassword(field: AbstractControl, message:string){
    return this.isValidField(field, message);
  }

}
