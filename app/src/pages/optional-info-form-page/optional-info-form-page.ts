import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {User} from "../../entity/user";
import {UserDAO} from "../../providers/user-dao";
import {AlertCreator} from "../../providers/alert-creator";

@Component({
  selector: 'page-optional-info-form-page',
  templateUrl: './optional-info-form-page.html'
})
export class OptionalInfoFormPagePage {
  user:User;

  constructor(public navCtrl: NavController, public userDAO: UserDAO, public alertCreator:AlertCreator) {
    this.user = {pass: null, username: null, name: null, email:null, phone:null};
  }

  ionViewDidLoad() {

  }

  saveOptionalInfo(){
    this.userDAO.saveOptionalInfo(this.user.name,this.user.email,this.user.phone);
    this.createUser();
  }

  createUser(){
    this.userDAO.create().map(res=>res.json()).subscribe(response=>{
      this.alertCreator.showSimpleAlert('Exito','El usuario ha sido creado');
    },err=>{
      //console.log("ocurrio un error", err);
      //this.alertCreator.showSimpleAlert('Error','Ha ocurrido un error vuelve a intentarlo');
    });;
  }
}
