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
    this.user = {name: '', pass: null, email:''};
  }

  ionViewDidLoad() {

  }

  checkInputValues(){
    this.checkPassValue();
  }

  checkPassValue(){
    if(this.user.pass){
      this.checkPassValueIsOnlyNumber();
    }else{
      this.alertCreator.showSimpleAlert('Error','Por favor ingresa un PIN')
    }
  }

  checkPassValueIsOnlyNumber(){
    if(!this.user.pass.match(/^[0-9]*$/)){
      this.alertCreator.showSimpleAlert('Error','El PIN sólo puede contener números');
    }
  }

}
