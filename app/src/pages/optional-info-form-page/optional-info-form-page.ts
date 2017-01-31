import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {User} from "../../entity/user";
import {UserDAO} from "../../providers/user-dao";
import {AlertCreator} from "../../providers/alert-creator";
import {ContactSelectionPage} from "../contact-selection/contact-selection";

@Component({
  selector: 'page-optional-info-form-page',
  templateUrl: './optional-info-form-page.html'
})
export class OptionalInfoFormPagePage {
  user: User;

  constructor(public navCtrl: NavController, public userDAO: UserDAO, public alertCreator: AlertCreator) {
    this.user = {pass: null, username: null, name: null, email: null, phone: null};
  }

  ionViewDidLoad() {

  }

  saveOptionalInfo() {
    this.saveUser();
  }

  isValidEmail(user: User): boolean {
    let hasAtSymbol = user.email.indexOf('@');
    let hasDomain = user.email.indexOf('.com');
    let isValidEmail = ((hasAtSymbol > -1) && (hasDomain > -1));

    if (!isValidEmail) {
      this.alertCreator.showSimpleAlert('Error', 'Verifica que el correo sea correcto');
    }

    return isValidEmail;
  }

  isUserDataValid(user: User): boolean {
    return this.isValidEmail(user);
  }

  saveUser() {
    if (this.isUserDataValid(this.user)) {
      this.userDAO.setOptionalInfo(this.user);
      this.userDAO.create().map(res => res.json()).subscribe(response => {
        this.alertCreator.showCofirmationMessage('Cuenta', 'Tu cuenta ha sido creada', () => {
          this.goToContactPage()
        });
      }, err => {
        console.log("ocurrio un error", err);
      });
    }
  }

  goToContactPage() {
    this.navCtrl.setRoot(ContactSelectionPage);
  }

}
