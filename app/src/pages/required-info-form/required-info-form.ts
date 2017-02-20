import {Component} from '@angular/core';
import {NavController, Loading, LoadingController} from 'ionic-angular';
import {IUser, User} from '../../entity/user';
import {AlertCreator} from "../../providers/alert-creator";
import {UserDAO} from "../../providers/user-dao";
import {RegisterOptionalInfoPage} from "../register-optional-info/register-optional-info";
import {UserService} from "../../providers/user-service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {FormValidator} from "../../providers/form-validator";


@Component({
  selector: 'page-required-info-form',
  templateUrl: './required-info-form.html'
})
export class RequiredInfoFormPage {

  user: IUser;
  loading: Loading;
  form: FormGroup;
  username:string;
  password:string;



  constructor(public navCtrl: NavController, public alertCreator: AlertCreator, public userDAO: UserDAO, private userService:UserService, public loadingController: LoadingController, private  formBuilder: FormBuilder, public formValidator: FormValidator,) {
    this.user = new User();
    this.loading = this.createLoading();
    this.createForm(formBuilder);
  }

  ionViewDidLoad() {

  }

  private createForm(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      username: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      password: ['', Validators.compose([Validators.pattern('[0-9]*'), Validators.maxLength(4), Validators.minLength(4), Validators.required])]
    });
  }


  createLoading(): Loading {
    return this.loadingController.create({
      content: "Espera un momento",
      dismissOnPageChange: true
    });
  }

  hideLoading() {
    this.loading.dismiss();
    this.loading = this.createLoading();
  }


  checkInputValues() {
    if (this.isUserDataValid()) {
      this.loading.present();
      this.saveRequiredInfo();
    }
  }

  isUserDataValid(){
    let isDataValid: boolean = this.formValidator.isValidUserName(this.form.controls['username'], 'Por favor ingresa un nombre de usuario, máximo 30 caracteres') && this.formValidator.IsValidPassword(this.form.controls['password'], 'Por favor ingresa un PIN de 4 dígitos');
    return isDataValid;
  }

  saveRequiredInfo() {
    this.userService.user.username=this.form.controls['username'].value;
    this.userService.user.password=this.form.controls['password'].value;
    this.registerUser();
  }

  registerUser(){
    this.userDAO.create()
      .subscribe(userId => {
        this.userService.user.id = userId;
        this.alertCreator.showCofirmationMessage('Cuenta', 'Tu cuenta ha sido creada', () => {
          this.hideLoading();
          this.navCtrl.push(RegisterOptionalInfoPage);
        })
      }, error => {
        this.hideLoading();
        if (error.name == 'UsernameAlreadyTaken') {
          this.alertCreator.showCofirmationMessage('Usuario', this.userService.user.username + ' ya ha sido registrado en el sistema');
        }
      });
  }

  goBack() {
    this.navCtrl.pop();
  }


}
