import { Component } from '@angular/core';
import {NavController, Loading, LoadingController} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {FormValidator} from "../../providers/form-validator";
import { Storage } from '@ionic/storage';
import {MenuPage} from "../menu/menu";


@Component({
  selector: 'page-login',
  templateUrl: './login.html'
})
export class LoginPage {

  form: FormGroup;
  loading:Loading;

  constructor(public navCtrl: NavController,  private  formBuilder: FormBuilder, public formValidator:FormValidator, public storage:Storage, public loadingController:LoadingController,) {
    this.createForm(formBuilder);
    this.loading=this.createLoading();

  }

  ionViewDidLoad() {

  }

  private createForm(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      userPassword: ['', Validators.compose([Validators.pattern('[0-9]*'), Validators.maxLength(4),Validators.required])],
      username: ['', Validators.required],
    });
  }

  createLoading():Loading{
    return this.loadingController.create({
      content:"Espera un momento",
      dismissOnPageChange: true
    });
  }

  hideLoading(){
    this.loading.dismiss();
    this.loading=this.createLoading();
  }

  checkInputValues(){
    if(this.isUserDataValid()){
      this.loading.present();
      this.goToMenuPage();
    }
  }

  isUserDataValid(): boolean {
    let isDataValid: boolean =this.formValidator.IsValidPassword(this.form.controls['userPassword'], 'Verifica que el PIN sea correcto') && this.formValidator.isValidUserName(this.form.controls['username'], 'Por favor ingresa tu nombre en la aplicación');
    return isDataValid;
  }

  goToMenuPage(){
    this.hideLoading();
    //this.storage.set('islogged', true);
    this.navCtrl.push(MenuPage);
  }

  goBack() {
    this.navCtrl.pop();
  }

}
