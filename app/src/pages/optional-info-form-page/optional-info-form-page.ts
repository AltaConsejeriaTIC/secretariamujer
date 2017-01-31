import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {User} from "../../entity/user";
import {UserDAO} from "../../providers/user-dao";
import {AlertCreator} from "../../providers/alert-creator";
import {ContactSelectionPage} from "../contact-selection/contact-selection";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'page-optional-info-form-page',
  templateUrl: './optional-info-form-page.html'
})
export class OptionalInfoFormPagePage {
  user: User;
  optionalInfoForm: FormGroup;

  constructor(public navCtrl: NavController, public userDAO: UserDAO, public alertCreator: AlertCreator, private  formBuilder: FormBuilder) {
    this.user = {pass: '', username: '', name: '', email: '', phone: ''};

    this.optionalInfoForm = formBuilder.group({
      name: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*')])],
      email: ['', Validators.compose([Validators.pattern('(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$)')])],
      phone: ['', Validators.compose([Validators.pattern('\d*'), Validators.maxLength(10)])]
    });
  }

  ionViewDidLoad() {

  }

  saveOptionalInfo() {
    this.saveUser();
  }

  isValidEmail(user: User): boolean {
    if (!this.optionalInfoForm.controls['email'].valid) {
      this.alertCreator.showSimpleAlert('Error', 'Verifica que el correo sea correcto');
    }

    return this.optionalInfoForm.controls['email'].valid;
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
