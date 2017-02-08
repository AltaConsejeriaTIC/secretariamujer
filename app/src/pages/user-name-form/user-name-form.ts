import { Component } from '@angular/core';
import {NavController, Loading, NavParams, LoadingController} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {FormValidator} from "../../providers/form-validator";
import {User} from "../../entity/user";
import {MenuPage} from "../menu/menu";
import {LoginService} from "../../providers/login-service";
import {AlertCreator} from "../../providers/alert-creator";

@Component({
  selector: 'page-user-name-form',
  templateUrl: './user-name-form.html'
})
export class UserNameFormPage {

  loading:Loading;
  form:FormGroup;
  userPassword:string;

  constructor(public navCtrl: NavController, public navParams:NavParams, public  formBuilder: FormBuilder, public formValidator:FormValidator, private loginService: LoginService, public alertCreator:AlertCreator, public loadingController:LoadingController) {
    this.form = formBuilder.group({
      username: ['', Validators.required],
    });
    this.userPassword=this.navParams.get('pinNumber');
    this.loading=this.createLoading();

  }

  ionViewDidLoad() {
  }

  createLoading(){
    return this.loadingController.create({
      content:"Espera un momento",
      dismissOnPageChange: true
    });
  }

  login(){
    if(this.isUserNameValid()){
      this.loading.present();
      this.makeLogin();
    }
  }

  makeLogin(){
    let user = new User('', '', '', this.form.controls['username'].value, this.userPassword);
    this.loginService.login(user).subscribe(userId => {
      this.hideLoading();
      console.log(userId);
      this.navCtrl.setRoot(MenuPage);
    }, error => {
      this.hideLoading();
      this.alertCreator.showSimpleAlert('Error','Usuario y/o contraseña incorrectos');
    });
  }

  hideLoading(){
    this.loading.dismiss();
    this.loading=this.createLoading();
  }

  goBack(){
    this.navCtrl.pop();
  }

  isUserNameValid(){
    return this.formValidator.isValidUserName(this.form.controls['username'], 'Por favor introduce tu nombre en la aplicación')
  }

}
