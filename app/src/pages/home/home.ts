import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MapPage} from "../map/map";
import {Validators, FormBuilder} from '@angular/forms';
import {AdminAPI} from  '../../providers/admin-api'
import {User} from '../../entity/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  user: User;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public adminApi: AdminAPI) {
    this.user = {name: '', pass: null, email:''};
  }

  ionViewDidLoad() {
  }

  registerForm() {
    console.log(this.user);
    this.adminApi.registerUser(this.user)
  }

  goToMapPage() {
    this.navCtrl.push(MapPage)
  }

}
