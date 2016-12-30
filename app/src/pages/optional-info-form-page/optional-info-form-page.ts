import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {User} from "../../entity/user";

@Component({
  selector: 'page-optional-info-form-page',
  templateUrl: './optional-info-form-page.html'
})
export class OptionalInfoFormPagePage {
  user:User;

  constructor(public navCtrl: NavController) {
    this.user = {pass: null, username: null, name: null, email:null, phone:null};
  }

  ionViewDidLoad() {

  }
  
}
