import { Component } from '@angular/core';
import {NavController, Loading, LoadingController} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {FormValidator} from "../../providers/form-validator";
import { Storage } from '@ionic/storage';
import {MenuPage} from "../menu/menu";
import {UserFactory} from "../../providers/user-factory";
import {LoginService} from "../../providers/login-service";
import {AlertCreator} from "../../providers/alert-creator";
import {UserDAO} from "../../providers/user-dao";
import {UserService} from "../../providers/user-service";


@Component({
  selector: 'page-login',
  templateUrl: './login.html'
})
export class LoginPage {

  form: FormGroup;
  loading:Loading;

  constructor(public navCtrl: NavController,  private  formBuilder: FormBuilder, public formValidator:FormValidator, public storage:Storage, public loadingController:LoadingController,private userFactory: UserFactory,private loginService: LoginService,public alertCreator: AlertCreator,private userDAO: UserDAO, private userService: UserService) {
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
      this.makeLogin();
    }
  }

  makeLogin() {
    let user = this.userFactory.createUser({
      username: this.form.controls['username'].value,
      password: this.form.controls['userPassword'].value,
    });

    this.loginService.login(user,(data)=>{
      this.userService.user = data;
      this.userService.user.password=this.form.controls['userPassword'].value;
      this.goToMenuPage();
    },()=>{
      this.hideLoading();
    });
  }

  setUserInfoInTheApp(userId: string) {
    this.userDAO.get(userId).subscribe(user => {

    }, error => {
      console.log(error);
      this.hideLoading();
      this.alertCreator.showCofirmationMessage('Error', 'No fue posible obtener la informacion del usuario, intenta mas tarde');
    });

  }

  isUserDataValid(): boolean {
    let isDataValid: boolean =this.formValidator.IsValidPassword(this.form.controls['userPassword'], 'Verifica que el PIN sea correcto') && this.formValidator.isValidUserName(this.form.controls['username'], 'Por favor ingresa tu nombre en la aplicación');
    return isDataValid;
  }

  goToMenuPage(){
    this.hideLoading();
    this.storage.set('islogged', true);
    this.storage.set('isFirstTimeOpen', false);
    this.navCtrl.setRoot(MenuPage);
  }

  goBack() {
    this.navCtrl.pop();
  }

}
