import {Component} from '@angular/core';
import {NavController, Loading, NavParams, LoadingController} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {FormValidator} from "../../providers/form-validator";
import {MenuPage} from "../menu/menu";
import {LoginService} from "../../providers/login-service";
import {AlertCreator} from "../../providers/alert-creator";
import {Storage} from '@ionic/storage';
import {UserFactory} from "../../providers/user-factory";
import {UserService} from "../../providers/user-service";
import {NetworkStatusService} from "../../providers/network-status-service";


@Component({
  selector: 'page-user-name-form',
  templateUrl: './user-name-form.html'
})
export class UserNameFormPage {

  loading: Loading;
  form: FormGroup;
  userPassword: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public  formBuilder: FormBuilder,
              public formValidator: FormValidator, private loginService: LoginService, public alertCreator: AlertCreator,
              public loadingController: LoadingController, public storage: Storage, private userFactory: UserFactory, private userService: UserService,) {

    this.form = formBuilder.group({
      username: ['', Validators.required],
    });
    this.userPassword = this.navParams.get('pinNumber');
    this.loading = this.createLoading();
  }

  ionViewDidLoad() {
  }

  createLoading() {
    return this.loadingController.create({
      content: "Espera un momento",
      dismissOnPageChange: true
    });
  }

  login() {
    if (this.isUserNameValid()) {
      this.loading.present();
      this.makeLogin();
    }
  }

  makeLogin() {
    let user = this.userFactory.createUser({
      username: this.form.controls['username'].value,
      password: this.userPassword
    });

    if (!NetworkStatusService.isDeviceConnected()) {
      this.alertCreator.showCofirmationMessage("Error", "Asegurate de tener conexión a internet, o intentalo más tarde");
      return;
    }

    this.loginService.login(user, (data) => {
      this.userService.user = data;
      this.userService.user.password = this.userPassword;
      this.goToMenuPage();
    }, () => {
      this.hideLoading();
    });
  }

  hideLoading() {
    this.loading.dismiss();
    this.loading = this.createLoading();
  }

  goBack() {
    this.navCtrl.pop();
  }

  isUserNameValid() {
    return this.formValidator.isValidUserName(this.form.controls['username'], 'Por favor introduce tu nombre en la aplicación')
  }

  goToMenuPage() {
    this.hideLoading();
    this.storage.set('islogged', true);
    this.navCtrl.setRoot(MenuPage);
  }

}
