import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {IUser} from '../../entity/user';
import {AlertCreator} from "../../providers/alert-creator";
import {UserDAO} from "../../providers/user-dao";
import {RegisterOptionalInfoPage} from "../register-optional-info/register-optional-info";


@Component({
  selector: 'page-required-info-form',
  templateUrl: './required-info-form.html'
})
export class RequiredInfoFormPage {

  user:IUser;

  constructor(public navCtrl: NavController, public alertCreator:AlertCreator, public userDAO:UserDAO) {
    this.user = {pass: null, username: null, name: null, email:null, phone:null};
  }

  ionViewDidLoad() {

  }

  checkInputValues(){
    let isUserNameEmpty=this.validateEmptyField(this.user.username);
    let isPassEmpty=this.validateEmptyField(this.user.pass);
    let isPassCorrect:boolean=false;
    this.throwMessageIfEmptyField(isUserNameEmpty, isPassEmpty);

    if(!isPassEmpty){
      isPassCorrect=this.isPassValueOnlyNumber();
    }

    if(isPassCorrect && !isUserNameEmpty){
      this.saveRequiredInfo();
      this.navCtrl.push(RegisterOptionalInfoPage);
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
    }else if(isPassEmpty){
      this.alertCreator.showSimpleAlert('Error','Por favor ingresa un PIN de 4 dígitos');
    }
  }

  isPassValueOnlyNumber(){
    if((!this.user.pass.match(/^[0-9]*$/))|| (this.user.pass.length!=4)){
      this.alertCreator.showSimpleAlert('Error','El PIN sólo puede contener números y debe ser de 4 dígitos');
      return false;
    }else{return true;}
  }

  saveRequiredInfo(){
    this.userDAO.saveRequiredInfo(this.user.username, this.user.pass);
  }

  goBack(){
    this.navCtrl.pop();
  }


}
