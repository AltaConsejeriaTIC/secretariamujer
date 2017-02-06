import { Component } from '@angular/core';
import {NavController, Loading, LoadingController} from 'ionic-angular';
import {UserDAO} from "../../providers/user-dao";
import {AlertCreator} from "../../providers/alert-creator";
import {FormGroup, FormBuilder, Validators, AbstractControl} from "@angular/forms";

const SETTINGS_SLIDE_ITEMS = 3;
const WRITE_CURRENT_PIN = 1;
const WRITE_NEW_PIN = 2;
const CONFIRM_NEW_PIN = 3;

@Component({
  selector: 'page-settings-page',
  templateUrl: './settings-page.html'
})
export class SettingsPage {

  arrowIconArray:string[]= [];
  isOptionVisible:boolean[]=[];
  usernameInfo:string
  nameInfo:string;
  inputPin:string;
  instructionTextArray:string[];
  instructionText:string;
  changePinState:number;
  currentPin:string;
  newPin:string;
  form:FormGroup;
  userEmail:string;
  userCellPhone:string;
  loading:Loading;

  constructor(public navController: NavController, public userDAO: UserDAO, public alertCreator:AlertCreator, private  formBuilder: FormBuilder, public loadingController: LoadingController) {
    this.usernameInfo = this.userDAO.user.fullName;
    this.userEmail = this.userDAO.user.email;
    this.nameInfo = this.userDAO.user.username || "Anónima";
    this.currentPin = this.userDAO.user.password || "0000";
    this.userCellPhone=this.userDAO.user.cellPhone;
    this.instructionTextArray = ["Ingresa tu pin de 4 dígitos", "Ingresa tu nuevo PIN", "Confirma tu nuevo PIN"];
    this.instructionText = this.instructionTextArray[0];
    this.changePinState= WRITE_CURRENT_PIN;
    this.createForm(formBuilder);
    this.loading=this.loadingController.create({
      content:"Espera un momento",
      dismissOnPageChange: true
    });

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


  setInitialIconState() {
    for (let i = 0; i < SETTINGS_SLIDE_ITEMS; i++) {
      this.arrowIconArray.push("icon-border-down-arrow");
      this.isOptionVisible.push(false);
    }
  }

  toggleisShowingOptions(index) {
    for (let i = 0; i < SETTINGS_SLIDE_ITEMS; i++) {
      this.isOptionVisible[i] = (index == i)? !this.isOptionVisible[index] : false;
      this.setOptionState(i, this.isOptionVisible[i]);
    }
  }

  setOptionState(optionNumber, optionState) {
    this.arrowIconArray[optionNumber] = (optionState)? "icon-border-up-arrow" : "icon-border-down-arrow";
  }

  goToMenuPage() {
    this.navController.pop();
  }

  changePin(){
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
      this.setPinState (this.instructionTextArray[1], WRITE_NEW_PIN);
    else
      this.alertCreator.showSimpleAlert('Error', 'El PIN ingresado no coincide con el actual');
  }

  catchNewPin() {
    if (this.isPinANumber()) {
      this.newPin = this.inputPin;
      this.setPinState (this.instructionTextArray[2], CONFIRM_NEW_PIN);
    }
    else
      this.alertCreator.showSimpleAlert('Error','El PIN sólo puede contener números');
  }

  saveNewPin(){
    if (this.newPin == this.inputPin) {
      this.setPinState (this.instructionTextArray[0], WRITE_CURRENT_PIN);
      this.currentPin = this.newPin;
      this.alertCreator.showSimpleAlert('Éxito','El PIN ha sido cambiado');
    }
    else
      this.alertCreator.showSimpleAlert('Error','El PIN ingresado no coincide con el que desea cambiar');
  }

  isPinANumber(){
    return (this.inputPin.match(/^[0-9]*$/));
  }

  setPinState(label, state) {
    this.instructionText = label;
    this.changePinState = state;
  }

  updateUserData(){
    if(this.isUserDataValid()){
      this.userDAO.user.fullName=this.form.controls['fullName'].value;
      this.userDAO.user.cellPhone=this.form.controls['cellPhone'].value;
      this.userDAO.user.email=this.form.controls['email'].value;
      this.loading.present();
      this.makeUserUpdate('Se han actualizado tus datos');
    }
  }

  makeUserUpdate(message:string){
    this.userDAO.update().subscribe(response=>{
        this.alertCreator.showSimpleAlert('Info', message);
      },
      error=>{
        this.alertCreator.showSimpleAlert('Info', 'No se han podido actualizar tus datos, por favor intentalo más tarde');
        console.log("El error es", error)
      }
    );
    this.loading.dismiss();
  }

  isUserDataValid(): boolean {
    let isDataValid: boolean = this.isValidName() && this.isValidEmail() && this.isValidPhone();

    return isDataValid;
  }

  isValidField(field: AbstractControl, message: string) {
    let isValid = field.valid;

    if (!isValid) {
      this.alertCreator.showSimpleAlert('Error', message);
    }

    return isValid;
  }

  isValidName() {
    return this.isValidField(this.form.controls['fullName'], 'Verifica que el nombre sea correcto');
  }

  isValidPhone() {
    return this.isValidField(this.form.controls['cellPhone'], 'Verifica que el teléfono sea correcto');
  }

  isValidEmail() {
    return this.isValidField(this.form.controls['email'], 'Verifica que el correo sea correcto');
  }
}
