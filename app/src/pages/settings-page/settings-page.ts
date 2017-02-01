import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UserDAO} from "../../providers/user-dao";
import {AlertCreator} from "../../providers/alert-creator";

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

  constructor(public navController: NavController, public userDAO: UserDAO, public alertCreator:AlertCreator) {
    this.usernameInfo = this.userDAO.getUsername() || "Yabushita Mai";
    this.nameInfo = this.userDAO.getName() || "Anónima";
    this.currentPin = this.userDAO.getPass() || "0000";
    this.instructionTextArray = ["Ingresa tu pin de 4 dígitos", "Ingresa tu nuevo PIN", "Confirma tu nuevo PIN"];
    this.instructionText = this.instructionTextArray[0];
    this.changePinState= WRITE_CURRENT_PIN;
  }

  ionViewDidLoad() {
    this.setInitialIconState();
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
}
