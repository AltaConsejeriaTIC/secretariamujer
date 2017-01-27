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

  checkFields() {
    if (this.isValidEmail()) {
      this.saveOptionalInfo();
    } else {
      this.alertCreator.showSimpleAlert('Error', 'Verifica que el correo sea correcto');
    }
  }

  saveOptionalInfo() {
    this.userDAO.saveOptionalInfo(this.user.name, this.user.email, this.user.phone);
    this.createUser();
  }

  isValidEmail() {
    let hasAtSymbol = this.user.email.indexOf('@');
    let hasDomain = this.user.email.indexOf('.com');
    return ((hasAtSymbol > -1) && (hasDomain > -1));
  }

  createUser() {
    this.userDAO.create().map(res => res.json()).subscribe(response => {
      this.alertCreator.showCofirmationMessage('Cuenta', 'Tu cuenta ha sido creada', () => {
        this.goToContactPage()
      });
    }, err => {
      console.log("ocurrio un error", err);
    });
  }

  goToContactPage() {
    this.navCtrl.setRoot(ContactSelectionPage);
  }

}
