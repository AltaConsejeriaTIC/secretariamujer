import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UserDAO} from "../../providers/user-dao";

const SETTINGS_SLIDE_ITEMS = 3;

@Component({
  selector: 'page-settings-page',
  templateUrl: 'settings-page.html'
})
export class SettingsPage {

  arrowIconArray:string[]= [];
  isOptionVisible:boolean[]=[];
  usernameInfo:string
  nameInfo:string;

  constructor(public navController: NavController, public userDAO: UserDAO) {
    this.usernameInfo = this.userDAO.getUsername() || "Yabushita Mai";
    this.nameInfo = this.userDAO.getName() || "Anónima";
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
}
