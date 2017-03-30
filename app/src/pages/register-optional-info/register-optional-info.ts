import {Component} from '@angular/core';
import {NavController, Loading, LoadingController} from 'ionic-angular';
import {User} from "../../entity/user";
import {UserDAO} from "../../providers/user-dao";
import {AlertCreator} from "../../providers/alert-creator";
import {ContactSelectionPage} from "../contact-selection/contact-selection";
import {FormBuilder, FormGroup, Validators, AbstractControl} from "@angular/forms";
import {FormValidator} from "../../providers/form-validator";
import {Storage} from '@ionic/storage';
import {UserService} from "../../providers/user-service";
import {NetworkStatusService} from "../../providers/network-status-service";


@Component({
  selector: 'page-register-optional-info',
  templateUrl: './register-optional-info.html'
})
export class RegisterOptionalInfoPage {
  form: FormGroup;
  loading: Loading;


  constructor(public navCtrl: NavController, public userDAO: UserDAO, public alertCreator: AlertCreator, public loadingController: LoadingController,
              private  formBuilder: FormBuilder, public formValidator: FormValidator, public storage: Storage, private userService: UserService) {
    this.createForm(formBuilder);
    this.loading = this.createLoading();
  }

  private createForm(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      fullName: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*')])],
      email: ['', Validators.compose([Validators.pattern('(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$)')])],
      cellPhone: ['', Validators.compose([Validators.pattern('[0-9]*'), Validators.maxLength(10)])]
    });
  }

  ionViewDidLoad() {
  }

  createLoading(): Loading {
    return this.loadingController.create({
      content: "Espera un momento",
      dismissOnPageChange: true
    });
  }

  isUserDataValid(): boolean {
    let isDataValid: boolean = this.formValidator.isValidName(this.form.controls['cellPhone'], 'Verifica que el teléfono sea correcto') && this.formValidator.isValidEmail(this.form.controls['email'], 'Verifica que el correo sea correcto') && this.formValidator.isValidPhone(this.form.controls['fullName'], 'Verifica que el nombre sea correcto');

    return isDataValid;
  }

  saveUser() {
    if (this.isUserDataValid()) {
      this.updateUserInDAO();
      this.loading.present();
      this.userDAO.update()
        .subscribe(response => {
          this.alertCreator.showCofirmationMessage('Info', 'Se han actualizado tus datos', () => {
            this.hideLoading();
            this.goToContactPage();
          })
        }, error => {
          this.hideLoading();
          let message = error.json().message;
          console.log("el mensaje", message);
          if (!NetworkStatusService.isDeviceConnected()){
            this.alertCreator.showSimpleAlert('Info', 'No se han podido actualizar tus datos debido a que no hay conexión a internet, por favor intentalo más tarde');
            this.goToContactPage();
          }else if (message.indexOf('mail') > -1) {
            this.alertCreator.showCofirmationMessage('Email', this.userService.user.email + ' ya ha sido registrado en el sistema');
          }
        });
    }
  }

  updateUserInDAO() {
    this.userService.user.fullName = this.form.controls['fullName'].value;
    this.userService.user.email = this.form.controls['email'].value;
    this.userService.user.cellPhone = this.form.controls['cellPhone'].value;
  }

  goToContactPage() {
    this.storage.set('islogged', true);
    this.navCtrl.setRoot(ContactSelectionPage);
  }

  canUserContinue(): boolean {
    let emailRegExp=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/;
    return this.form.controls['fullName'].valid && this.form.controls['email'].valid && this.form.controls['cellPhone'].valid && emailRegExp.test(this.form.controls['email'].value);
  }

  hideLoading() {
    this.loading.dismiss();
    this.loading = this.createLoading();
  }

}
