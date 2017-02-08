import { Component } from '@angular/core';
import {NavController, Loading, NavParams} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {FormValidator} from "../../providers/form-validator";

@Component({
  selector: 'page-user-name-form',
  templateUrl: './user-name-form.html'
})
export class UserNameFormPage {

  loading:Loading;
  form:FormGroup;
  userPassword:string;


  constructor(public navCtrl: NavController, public navParams:NavParams, public  formBuilder: FormBuilder, public formValidator:FormValidator) {
    this.form = formBuilder.group({
      username: ['', Validators.required],
    });
    this.userPassword=this.navParams.get('pinNumber');
  }

  ionViewDidLoad() {
  }

  login(){
    if(this.isUserNameValid()){
      console.log("COLOCAR ACA LOGICA DE LOGIN", this.userPassword);
      console.log("el pass", this.userPassword)
    }
  }

  goBack(){
    this.navCtrl.pop();
  }

  isUserNameValid(){
    return this.formValidator.isValidUserName(this.form.controls['username'], 'Por favor introduce tu nombre en la aplicación')
  }

}
