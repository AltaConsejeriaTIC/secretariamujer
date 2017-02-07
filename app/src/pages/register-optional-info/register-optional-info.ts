import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {User} from "../../entity/user";
import {UserDAO} from "../../providers/user-dao";
import {AlertCreator} from "../../providers/alert-creator";
import {ContactSelectionPage} from "../contact-selection/contact-selection";
import {FormBuilder, FormGroup, Validators, AbstractControl} from "@angular/forms";
import {FormValidator} from "../../providers/form-validator";

@Component({
  selector: 'page-register-optional-info',
  templateUrl: 'register-optional-info.html'
})
export class RegisterOptionalInfoPage {
  form: FormGroup;

  constructor(public navCtrl: NavController, public userDAO: UserDAO, public alertCreator: AlertCreator,
              private  formBuilder: FormBuilder, public formValidator:FormValidator) {
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
    let isDataValid: boolean = this.formValidator.isValidName(this.form.controls['cellPhone'], 'Verifica que el teléfono sea correcto') && this.formValidator.isValidEmail(this.form.controls['email'], 'Verifica que el correo sea correcto') && this.formValidator.isValidPhone(this.form.controls['fullName'], 'Verifica que el nombre sea correcto');

    return isDataValid;
  }

  saveUser() {
    if (this.isUserDataValid()) {
      this.updateUserInDAO();
      this.userDAO.create()
        .subscribe(response => {
          this.alertCreator.showCofirmationMessage('Cuenta', 'Tu cuenta ha sido creada', () => {
            this.goToContactPage()
          })
        }, error => {
          if (error.name == 'EmailAlreadyTaken') {
            this.alertCreator.showCofirmationMessage('Email', this.userDAO.user.email + 'ya ha sido registrado en el sistema');
          }

          if (error.name == 'UsernameAlreadyTaken') {
            this.alertCreator.showCofirmationMessage('Usuario', this.userDAO.user.username + ' ya ha sido registrado en el sistema');
          }
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
