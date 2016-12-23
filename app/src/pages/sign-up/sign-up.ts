import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {UserDAO}  from '../../providers/user-dao';
import {User} from '../../entity/user';

@Component({
  selector: 'page-sign-up',
  templateUrl: './sign-up.html'
})
export class SignUpPage {

  user:User;

  constructor(public navCtrl: NavController, public adminApi : UserDAO) {
  }

  ionViewDidLoad() {
  }

  signUp(){
    this.adminApi.create(this.user);
  }


}
