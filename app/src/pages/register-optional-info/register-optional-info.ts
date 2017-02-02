import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {User} from "../../entity/user";
import {UserDAO} from "../../providers/user-dao";
import {AlertCreator} from "../../providers/alert-creator";
import {ContactSelectionPage} from "../contact-selection/contact-selection";
import {FormBuilder, FormGroup, Validators, AbstractControl} from "@angular/forms";

@Component({
  selector: 'page-register-optional-info',
  templateUrl: 'register-optional-info.html'
})
export class RegisterOptionalInfoPage {
  form: FormGroup;

  constructor(public navCtrl: NavController, public userDAO: UserDAO, public alertCreator: AlertCreator,
              private  formBuilder: FormBuilder) {
    this.createForm(formBuilder);
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

  isUserDataValid(): boolean {
    let isDataValid: boolean = this.isValidName() && this.isValidEmail() && this.isValidPhone();

    return isDataValid;
  }

  isValidPhone() {
    return this.isValidField(this.form.controls['cellPhone'], 'Verifica que el teléfono sea correcto');
  }

  isValidEmail() {
    return this.isValidField(this.form.controls['email'], 'Verifica que el correo sea correcto');
  }

  isValidName() {
    return this.isValidField(this.form.controls['fullName'], 'Verifica que el nombre sea correcto');
  }

  isValidField(field: AbstractControl, message: string) {
    let isValid = field.valid;

    if (!isValid) {
      this.alertCreator.showSimpleAlert('Error', message);
    }

    return isValid;
  }

  saveUser() {
    if (this.isUserDataValid()) {
      this.updateUserInDAO();
      this.userDAO.create().map(res => res.json()).subscribe(response => {
        this.alertCreator.showCofirmationMessage('Cuenta', 'Tu cuenta ha sido creada', () => {
          this.goToContactPage()
        });
      }, err => {
        console.log("ocurrio un error", err.toString());
      });
    }
  }

  updateUserInDAO() {
    let user = new User(this.form.controls['fullName'].value, this.form.controls['email'].value,
      this.form.controls['cellPhone'].value);
    this.userDAO.setOptionalInfo(user);
  }

  goToContactPage() {
    this.navCtrl.setRoot(ContactSelectionPage);
  }

  canUserContinue(): boolean {
    return this.form.controls['fullName'].valid && this.form.controls['email'].valid && this.form.controls['cellPhone'].valid;
  }

}
