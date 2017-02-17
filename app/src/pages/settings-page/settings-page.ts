import {Component} from '@angular/core';
import {NavController, Loading, LoadingController} from 'ionic-angular';
import {UserDAO} from "../../providers/user-dao";
import {AlertCreator} from "../../providers/alert-creator";
import {FormGroup, FormBuilder, Validators, AbstractControl} from "@angular/forms";
import {FormValidator} from "../../providers/form-validator";
import {Storage} from '@ionic/storage';
import {UserService} from "../../providers/user-service";
import {HomePage} from "../home/home";
import {LoginService} from "../../providers/login-service";


const SETTINGS_SLIDE_ITEMS = 3;
const WRITE_CURRENT_PIN = 1;
const WRITE_NEW_PIN = 2;
const CONFIRM_NEW_PIN = 3;

@Component({
  selector: 'page-settings-page',
  templateUrl: './settings-page.html'
})
export class SettingsPage {

  arrowIconArray: string[] = [];
  isOptionVisible: boolean[] = [];
  usernameInfo: string;
  nameInfo: string;
  inputPin: string;
  instructionTextArray: string[];
  instructionText: string;
  changePinState: number;
  currentPin: string;
  newPin: string;
  form: FormGroup;
  userEmail: string;
  userCellPhone: string;
  loading: Loading;

  constructor(public navController: NavController, public userDAO: UserDAO, public alertCreator: AlertCreator,
              private  formBuilder: FormBuilder, public loadingController: LoadingController,
              public formValidator: FormValidator, public storage: Storage, private userService: UserService,
              private loginService: LoginService) {
    this.usernameInfo = this.userService.user.fullName;
    this.userEmail = this.userService.user.email;
    this.nameInfo = this.userService.user.username || "Anónima";
    this.currentPin = this.userService.user.password || "0000";
    this.userCellPhone = this.userService.user.cellPhone;
    this.instructionTextArray = ["Ingresa tu pin de 4 dígitos", "Ingresa tu nuevo PIN", "Confirma tu nuevo PIN"];
    this.instructionText = this.instructionTextArray[0];
    this.changePinState = WRITE_CURRENT_PIN;
    this.createForm(formBuilder);
    this.loading = this.createLoading();
  }

  ionViewDidLoad() {
    this.setInitialIconState();
  }

  private createForm(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      fullName: [this.usernameInfo, Validators.compose([Validators.pattern('[a-zA-Z ]*')])],
      email: [this.userEmail, Validators.compose([Validators.pattern('(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$)')])],
      cellPhone: [this.userCellPhone, Validators.compose([Validators.pattern('[0-9]*'), Validators.maxLength(10)])]
    });
  }

  createLoading(): Loading {
    return this.loadingController.create({
      content: "Espera un momento",
      dismissOnPageChange: true
    });
  }


  setInitialIconState() {
    for (let i = 0; i < SETTINGS_SLIDE_ITEMS; i++) {
      this.arrowIconArray.push("icon-border-down-arrow");
      this.isOptionVisible.push(false);
    }
  }

  toggleisShowingOptions(index) {
    for (let i = 0; i < SETTINGS_SLIDE_ITEMS; i++) {
      this.isOptionVisible[i] = (index == i) ? !this.isOptionVisible[index] : false;
      this.setOptionState(i, this.isOptionVisible[i]);
    }

    if (index == 2) {
      this.loadProfileData();
    }
  }

  loadProfileData() {
    this.form.controls['fullName'].setValue(this.userService.user.fullName);
    this.form.controls['cellPhone'].setValue(this.userService.user.cellPhone);
    this.form.controls['email'].setValue(this.userService.user.email);
  }

  setOptionState(optionNumber, optionState) {
    this.arrowIconArray[optionNumber] = (optionState) ? "icon-border-up-arrow" : "icon-border-down-arrow";
  }

  goBackPage() {
    this.navController.pop();
  }

  goToMenuPage() {
    this.navController.popToRoot();
  }

  changePin() {
    if (this.inputPin.length == 4) {
      switch (this.changePinState) {
        case WRITE_CURRENT_PIN:
          this.compareCurrentPin();
          break;
        case WRITE_NEW_PIN:
          this.catchNewPin();
          break;
        case CONFIRM_NEW_PIN:
          this.saveNewPin();
          break;
        default:
          break;
      }
      this.inputPin = "";
    }
  }

  compareCurrentPin() {
    if (this.inputPin == this.currentPin)
      this.setPinState(this.instructionTextArray[1], WRITE_NEW_PIN);
    else
      this.alertCreator.showSimpleAlert('Error', 'El PIN ingresado no coincide con el actual');
  }

  catchNewPin() {
    if (this.isPinANumber()) {
      this.newPin = this.inputPin;
      this.setPinState(this.instructionTextArray[2], CONFIRM_NEW_PIN);
    }
    else
      this.alertCreator.showSimpleAlert('Error', 'El PIN sólo puede contener números');
  }

  saveNewPin() {
    if (this.newPin == this.inputPin) {
      this.setPinState(this.instructionTextArray[0], WRITE_CURRENT_PIN);
      this.currentPin = this.newPin;
      this.userService.user.password = this.newPin;
      this.loading.present();
      this.makeUserUpdate('El PIN ha sido cambiado');
    }
    else
      this.alertCreator.showSimpleAlert('Error', 'El PIN ingresado no coincide con el que desea cambiar');
  }

  isPinANumber() {
    return (this.inputPin.match(/^[0-9]*$/));
  }

  setPinState(label, state) {
    this.instructionText = label;
    this.changePinState = state;
  }

  updateUserData() {
    if (this.isUserDataValid()) {
      this.userService.user.fullName = this.form.controls['fullName'].value;
      this.userService.user.cellPhone = this.form.controls['cellPhone'].value;
      this.userService.user.email = this.form.controls['email'].value;
      this.loading.present();
      this.makeUserUpdate('Se han actualizado tus datos');
    }
  }

  makeUserUpdate(message: string) {
    this.userDAO.update().subscribe(response => {
        this.hideLoading();
        this.alertCreator.showSimpleAlert('Info', message);
      },
      error => {
        this.hideLoading();
        this.alertCreator.showSimpleAlert('Info', 'No se han podido actualizar tus datos, por favor intentalo más tarde');
        console.log("El error es", error)
      }
    );
  }

  hideLoading() {
    this.loading.dismiss();
    this.loading = this.createLoading();
  }

  isUserDataValid(): boolean {
    let isDataValid: boolean = this.formValidator.isValidName(this.form.controls['fullName'], 'Verifica que el nombre sea correcto') && this.formValidator.isValidEmail(this.form.controls['email'], 'Verifica que el correo sea correcto') && this.formValidator.isValidPhone(this.form.controls['cellPhone'], 'Verifica que el teléfono sea correcto');
    return isDataValid;
  }

  logout() {
    this.alertCreator.showSelectMessage('Info', 'Al cerrar sesión el modo seguro se desactivará', () => {
      this.closeSession();
    }, () => {
    });
  }

  closeSession() {
    this.loading.present();
    this.storage.set('islogged', false);
    this.storage.set('isFirstTimeOpen', null);
    this.loginService.logout().subscribe(res=>{
      this.clearUserData();
      this.hideLoading();
      this.navController.setRoot(HomePage);
    }, err=>{
      console.log(err);
    });

  }

  clearUserData() {
    this.userService.clearUserData();
  }

}
