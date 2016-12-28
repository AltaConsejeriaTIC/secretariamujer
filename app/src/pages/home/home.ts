import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MapPage} from "../map/map";
import {Validators, FormBuilder} from '@angular/forms';
import {UserDAO} from  '../../providers/user-dao'
import {User} from '../../entity/user';
import {RequiredInfoFormPage} from "../required-info-form/required-info-form";
import {Home2Page} from "../home2/home2";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  user: User;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public adminApi: UserDAO) {
    this.user = {name: '', pass: null, email:''};
  }

  ionViewDidLoad() {
  }

  registerForm() {
    console.log(this.user);
    this.adminApi.create(this.user).map(res=>res.json()).subscribe(response=>{
      console.log(response);
    },err=>{console.log(err)});
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
