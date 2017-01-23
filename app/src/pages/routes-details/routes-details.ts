import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-routes-details',
  templateUrl: './routes-details.html'
})
export class RoutesDetailsPage {

  RESTAddres:string;

  constructor(public navCtrl: NavController, public navParams:NavParams) {
    this.RESTAddres=this.navParams.get('RESTAddres');
  }

  ionViewDidLoad() {

  }

  goToMenuPage() {
    this.navCtrl.popToRoot();
  }

}
