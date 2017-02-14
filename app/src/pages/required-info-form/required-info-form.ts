import {Component} from '@angular/core';
import {NavController, Loading, LoadingController} from 'ionic-angular';
import {IUser, User} from '../../entity/user';
import {AlertCreator} from "../../providers/alert-creator";
import {UserDAO} from "../../providers/user-dao";
import {RegisterOptionalInfoPage} from "../register-optional-info/register-optional-info";
import {UserService} from "../../providers/user-service";


@Component({
  selector: 'page-required-info-form',
  templateUrl: './required-info-form.html'
})
export class RequiredInfoFormPage {

  user: IUser;
  loading: Loading;


  constructor(public navCtrl: NavController, public alertCreator: AlertCreator, public userDAO: UserDAO, private userService:UserService, public loadingController: LoadingController, ) {
    this.user = new User();
    this.loading = this.createLoading();

  }

  ionViewDidLoad() {

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
    let isUserNameEmpty = this.validateEmptyField(this.user.username);
    let isPassEmpty = this.validateEmptyField(this.user.password);
    let isPassCorrect: boolean = false;
    this.throwMessageIfEmptyField(isUserNameEmpty, isPassEmpty);

    if (!isPassEmpty) {
      isPassCorrect = this.isPassValueOnlyNumber();
    }

    if (isPassCorrect && !isUserNameEmpty) {
      this.saveRequiredInfo();
    }
  }

  validateEmptyField(input): boolean {
    return !input;
  }

  throwMessageIfEmptyField(isUserNameEmpty: boolean, isPassEmpty: boolean) {
    if (isUserNameEmpty && isPassEmpty) {
      this.alertCreator.showSimpleAlert('Error', 'Por favor llena los campos antes de continuar');
    } else if (isUserNameEmpty) {
      this.alertCreator.showSimpleAlert('Error', 'Por favor ingresa un nombre de usuario');
    } else if (isPassEmpty) {
      this.alertCreator.showSimpleAlert('Error', 'Por favor ingresa un PIN de 4 dígitos');
    }
  }

  isPassValueOnlyNumber() {
    if ((!this.user.password.match(/^[0-9]*$/)) || (this.user.password.length != 4)) {
      this.alertCreator.showSimpleAlert('Error', 'El PIN sólo puede contener números y debe ser de 4 dígitos');
      return false;
    } else {
      return true;
    }
  }

  saveRequiredInfo() {
    this.userService.user.username=this.user.username;
    this.userService.user.password=this.user.password;
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
