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

  constructor(public navCtrl: NavController, public userDAO : UserDAO) {
  }

  ionViewDidLoad() {
  }

  signUp(){
    this.userDAO.create(this.user).map(res=>res.json()).subscribe(response=>{
      console.log(response);
    },err=>{});
  }


}
