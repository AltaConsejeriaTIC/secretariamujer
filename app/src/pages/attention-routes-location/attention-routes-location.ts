import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-attention-routes-location',
  templateUrl: './attention-routes-location.html'
})
export class AttentionRoutesLocationPage {

  attentionRoute:AttentionRoute;

  constructor(public navCtrl: NavController, public navparams:NavParams) {

  }

  ionViewDidLoad() {
    this.attentionRoute=this.navparams.get('attentionRoute');
    console.log("lo que le llega", this.attentionRoute);
  }

  goToMenuPage() {
    this.navCtrl.popToRoot();
  }

}
