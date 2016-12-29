import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {User} from '../../entity/user';
import {AlertCreator} from "../../providers/alert-creator";
import {UserDAO} from "../../providers/user-dao";


@Component({
  selector: 'page-required-info-form',
  templateUrl: './required-info-form.html'
})
export class RequiredInfoFormPage {

  user:User;

  constructor(public navCtrl: NavController, public alertCreator:AlertCreator, public userDAO:UserDAO) {
    this.user = {name: null, pass: null, email:null};
  }

  ionViewDidLoad() {

  }

  checkInputValues(){
    let isUserNameEmpty=this.validateEmptyField(this.user.name);
    let isPassEmpty=this.validateEmptyField(this.user.pass);
    let isPassCorrect:boolean;
    this.throwMessageIfEmptyField(isUserNameEmpty, isPassEmpty);

    if(!isPassEmpty){
      isPassCorrect=this.isPassValueOnlyNumber();
    }

    if(isPassCorrect){
      this.saveRequiredInfo();
    }
  }

  validateEmptyField(input):boolean{
    return !input;
  }

  throwMessageIfEmptyField(isUserNameEmpty:boolean, isPassEmpty:boolean){
    if(isUserNameEmpty && isPassEmpty){
      this.alertCreator.showSimpleAlert('Error','Por favor llena los campos antes de continuar');
    }else if (isUserNameEmpty){
      this.alertCreator.showSimpleAlert('Error','Por favor ingresa un nombre de usuario');
    }else if(isPassEmpty || this.user.pass.length!=4){
      this.alertCreator.showSimpleAlert('Error','Por favor ingresa un PIN de 4 dígitos');
    }
  }

  isPassValueOnlyNumber(){
    if(!this.user.pass.match(/^[0-9]*$/)){
      this.alertCreator.showSimpleAlert('Error','El PIN sólo puede contener números');
      return false;
    }else{return true;}
  }

  saveRequiredInfo(){
    this.userDAO.saveRequiredInfo(this.user.name, this.user.pass);
  }


}
