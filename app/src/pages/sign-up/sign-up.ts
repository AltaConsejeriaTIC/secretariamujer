import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {UserDAO}  from '../../providers/user-dao';
import {User} from '../../entity/user';
import {AlertCreator} from "../../providers/alert-creator";



@Component({
  selector: 'page-sign-up',
  templateUrl: './sign-up.html'
})
export class SignUpPage {

  user:User;

  constructor(public navCtrl: NavController, public userDAO : UserDAO, public alertCreator : AlertCreator) {
  }

  ionViewDidLoad() {
  }

  signUp(){
    this.userDAO.create(this.user).map(res=>res.json()).subscribe(response=>{
      this.alertCreator.showSimpleAlert('Exito','El usuario ha sido creado');
    },err=>{
      this.alertCreator.showSimpleAlert('Error','Ha ocurrido un error vuelve a intentarlo');
    });
  }


}
