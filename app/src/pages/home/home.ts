import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MapPage} from "../map/map";
import {Validators, FormBuilder} from '@angular/forms';
import {UserDAO} from  '../../providers/user-dao'
import {User} from '../../entity/user';
import {RequiredInfoFormPage} from "../required-info-form/required-info-form";
import {Home2Page} from "../home2/home2";
import {AlertCreator} from "../../providers/alert-creator";


@Component({
  selector: 'page-home',
  templateUrl: './home.html'
})


export class HomePage {

  user: User;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public adminApi: UserDAO, public alertCreator:AlertCreator) {
    this.user = {pass: null, username: null, name: null, email:null, phone:null};
  }

  ionViewDidLoad() {
  }

  registerForm() {
/*    this.adminApi.create(this.user).map(res=>res.json()).subscribe(response=>{
      this.alertCreator.showSimpleAlert('Exito','El usuario se ha registrado correctamente');
    },err=>{
      this.alertCreator.showSimpleAlert('Error','Ha habido un error por favor inténtalo nuevamente');
    });*/
  }

  goToMapPage() {
    this.navCtrl.push(MapPage)
  }

  goToRequredInfoForm(){
    this.navCtrl.push(RequiredInfoFormPage)
  }

  goToHome2Form(){
    this.navCtrl.push(Home2Page)
  }
}
