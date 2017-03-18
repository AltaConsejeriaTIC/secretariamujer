import {Component} from '@angular/core';
import {NavController, Loading, LoadingController} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {FormValidator} from "../../providers/form-validator";
import {Storage} from '@ionic/storage';
import {MenuPage} from "../menu/menu";
import {UserFactory} from "../../providers/user-factory";
import {LoginService} from "../../providers/login-service";
import {AlertCreator} from "../../providers/alert-creator";
import {UserDAO} from "../../providers/user-dao";
import {UserService} from "../../providers/user-service";
import {NetworkStatusService} from "../../providers/network-status-service";
import { File } from 'ionic-native';

declare var cordova:any;

@Component({
  selector: 'page-login',
  templateUrl: './login.html'
})
export class LoginPage {

  form: FormGroup;
  loading: Loading;
  dataDirectory: string;


  constructor(public navCtrl: NavController, private  formBuilder: FormBuilder, public formValidator: FormValidator,
              public storage: Storage, public loadingController: LoadingController, private userFactory: UserFactory,
              private loginService: LoginService, public alertCreator: AlertCreator, private userDAO: UserDAO,
              private userService: UserService) {
    this.dataDirectory=cordova.file.dataDirectory;
    this.createForm(formBuilder);
    this.loading = this.createLoading();

  }

  ionViewDidLoad() {

  }

  private createForm(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      userPassword: ['', Validators.compose([Validators.pattern('[0-9]*'), Validators.maxLength(4), Validators.required])],
      username: ['', Validators.required],
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
      this.makeLogin();
    }
  }

  makeLogin() {
    let user = this.userFactory.createUser({
      username: this.form.controls['username'].value,
      password: this.form.controls['userPassword'].value,
    });

    if (this.isDeviceConnected()) {
      this.loginService.login(user, (data) => {
        this.userService.user = data;
        this.userService.user.password = this.form.controls['userPassword'].value;
        this.setOfflineContent();
      }, () => {
        this.hideLoading();
      });
    }
  }

  isDeviceConnected() {
    if (!NetworkStatusService.isDeviceConnected()) {
      this.alertCreator.showCofirmationMessage("Error", "Asegurate de tener conexión a internet, o intentalo más tarde");
    }

    return NetworkStatusService.isDeviceConnected();
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
    let isDataValid: boolean = this.formValidator.IsValidPassword(this.form.controls['userPassword'], 'Verifica que el PIN sea correcto') && this.formValidator.isValidUserName(this.form.controls['username'], 'Por favor ingresa tu nombre en la aplicación');
    return isDataValid;
  }

  setOfflineContent(){
    this.writeFiles();
  }

  writeFiles(){
    let categoriesTitles='[{"field_title_test1":"Sobre tu relaci\u00f3n de","field_title_test1_line_2":"pareja o expareja\u2026","field_title_test2_line_1":"Sobre tu cuerpo y tu","field_title_test2_line_2":"sexualidad...","field_title_test3_line_1":"Sobre tu autonom\u00eda ","field_title_test3_line_2":"econ\u00f3mica","field_title_test4_line_1":"Otros espacios ","field_title_test4_line_2":"de tu vida cotidiana","field_test_tip_1_subtitle":"\u00bfC\u00f3mo la vives y la percibes? ","field_test_tip_2_subtitle":"\u00bfSon respetados y protegidos?","field_test_tip_3_subtitle":"\u00bfDecides con libertad?","field_test_tip_4_subtitle":"\u00bfTe sientes segura en tu cotidianidad?"}]';
    Promise.all([File.writeFile(this.dataDirectory,'categoriesTitles.txt',categoriesTitles,{replace:true})]).then(()=>{
      this.goToMenuPage();
    }).catch(()=>{
      this.goToMenuPage();
    })
  }

  goToMenuPage() {
    this.hideLoading();
    this.storage.set('islogged', true);
    this.storage.set('isFirstTimeOpen', false);
    this.navCtrl.setRoot(MenuPage);
  }

  goBack() {
    this.navCtrl.pop();
  }

}
