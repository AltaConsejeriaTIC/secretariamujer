import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {IUser, User} from "../../entity/user";
import {UserDAO} from "../../providers/user-dao";
import {AlertCreator} from "../../providers/alert-creator";
import {ContactSelectionPage} from "../contact-selection/contact-selection";
import {FormBuilder, FormGroup, Validators, AbstractControl} from "@angular/forms";

@Component({
  selector: 'page-optional-info-form-page',
  templateUrl: './optional-info-form-page.html'
})
export class OptionalInfoFormPagePage {
  optionalInfoForm: FormGroup;

  constructor(public navCtrl: NavController, public userDAO: UserDAO, public alertCreator: AlertCreator,
              private  formBuilder: FormBuilder) {
    this.createForm(formBuilder);
  }

  private createForm(formBuilder: FormBuilder) {
    this.optionalInfoForm = formBuilder.group({
      name: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*')])],
      email: ['', Validators.compose([Validators.pattern('(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$)')])],
      phone: ['', Validators.compose([Validators.pattern('[0-9]*'), Validators.maxLength(10)])]
    });
  }

  ionViewDidLoad() {
  }

  isUserDataValid(): boolean {
    let isDataValid: boolean = this.isValidName() && this.isValidEmail() && this.isValidPhone();

    return isDataValid;
  }

  isValidPhone() {
    return this.isValidField(this.optionalInfoForm.controls['phone'], 'Verifica que el teléfono sea correcto');
  }

  isValidEmail() {
    return this.isValidField(this.optionalInfoForm.controls['email'], 'Verifica que el correo sea correcto');
  }

  isValidName() {
    return this.isValidField(this.optionalInfoForm.controls['name'], 'Verifica que el nombre sea correcto');
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
        console.log("ocurrio un error", err);
      });
    }
  }

  updateUserInDAO() {
    let user = new User(this.optionalInfoForm.controls['name'].value, this.optionalInfoForm.controls['email'].value,
      this.optionalInfoForm.controls['phone'].value);
    this.userDAO.setOptionalInfo(user);
  }

  goToContactPage() {
    this.navCtrl.setRoot(ContactSelectionPage);
  }

  canUserContinue(): boolean {
    return this.optionalInfoForm.controls['name'].valid && this.optionalInfoForm.controls['email'].valid && this.optionalInfoForm.controls['phone'].valid;
  }

}
