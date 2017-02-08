import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RequiredInfoFormPage} from "../required-info-form/required-info-form";
import {MenuPage} from "../menu/menu";
import {LoginService} from "../../providers/login-service";
import {User} from "../../entity/user";
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: './home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private loginService: LoginService, public storage:Storage) {
  }

  ionViewDidLoad() {
  }

  registerForm() {
  }

  goToSignInPage() {
    let user = new User('', '', '', 'app', 'app');
    this.loginService.login(user).subscribe(userId => {
      console.log(userId);
      this.storage.set('islogged', true);
      this.navCtrl.setRoot(MenuPage);
    }, error => {
      alert('Usuario y/o contraseña incorrectos');
    });
  }

  goToRequiredInfoForm() {
    this.navCtrl.push(RequiredInfoFormPage);
  }
}
