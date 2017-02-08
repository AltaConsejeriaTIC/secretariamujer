import { Component } from '@angular/core';
import {NavController, Loading} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {FormValidator} from "../../providers/form-validator";

@Component({
  selector: 'page-user-name-form',
  templateUrl: './user-name-form.html'
})
export class UserNameFormPage {

  loading:Loading;
  form:FormGroup;


  constructor(public navCtrl: NavController, private  formBuilder: FormBuilder, public formValidator:FormValidator) {
    this.form = formBuilder.group({
      username: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
  }

  login(){
    if(this.isUserNameValid()){
      console.log("COLOCAR ACA LOGICA DE LOGIN");
    }
  }

  goBack(){
    this.navCtrl.pop();
  }

  isUserNameValid(){
    return this.formValidator.isValidUserName(this.form.controls['username'], 'Por favor introduce tu nombre en la aplicación')
  }

}
