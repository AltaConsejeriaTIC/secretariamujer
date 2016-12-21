import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MapPage} from "../map/map";


/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello HomePage Page');
  }

  goToMapPage(){
    this.navCtrl.push(MapPage)
  }

}
