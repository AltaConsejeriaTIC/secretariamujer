import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {User} from '../../entity/user';
import {AlertCreator} from "../../providers/alert-creator";


@Component({
  selector: 'page-required-info-form',
  templateUrl: './required-info-form.html'
})
export class RequiredInfoFormPage {

  user:User;

  constructor(public navCtrl: NavController, public alertCreator:AlertCreator) {
    this.user = {name: null, pass: null, email:null};
  }

  ionViewDidLoad() {

  }

  checkInputValues(){
    let isUserNameEmpty=this.validateEmptyField(this.user.name);
    let isPassEmpty=this.validateEmptyField(this.user.pass);
    this.throwMessageIfEmptyField(isUserNameEmpty, isPassEmpty);
  }

  validateEmptyField(input):boolean{
    return !input;
  }

  throwMessageIfEmptyField(isUserNameEmpty:boolean, isPassEmpty:boolean){
    if(isUserNameEmpty && isPassEmpty){
      this.alertCreator.showSimpleAlert('Error','Por favor llena los campos antes de continuar');
    }else if (isUserNameEmpty){
      this.alertCreator.showSimpleAlert('Error','Por favor ingresa un nombre de usuario');
    }else if(isPassEmpty){
      this.alertCreator.showSimpleAlert('Error','Por favor ingresa un PIN de 4 dígitos');
    }
  }

  checkPassValueIsOnlyNumber(){
    if(!this.user.pass.match(/^[0-9]*$/)){
      this.alertCreator.showSimpleAlert('Error','El PIN sólo puede contener números');
    }
  }


}
