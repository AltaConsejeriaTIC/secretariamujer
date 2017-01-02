import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {User} from "../../entity/user";
import {UserDAO} from "../../providers/user-dao";

@Component({
  selector: 'page-optional-info-form-page',
  templateUrl: './optional-info-form-page.html'
})
export class OptionalInfoFormPagePage {
  user:User;

  constructor(public navCtrl: NavController, public userDAO: UserDAO) {
    this.user = {pass: null, username: null, name: null, email:null, phone:null};
  }

  ionViewDidLoad() {

  }

  saveOptionalInfo(){
    this.userDAO.saveOptionalInfo(this.user.name,this.user.email,this.user.phone);
    this.createUser();
  }

  createUser(){
    this.userDAO.create();
  }
}
