import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-attention-routes-location',
  templateUrl: './attention-routes-location.html'
})
export class AttentionRoutesLocationPage {

  attentionRoute:AttentionRoute;
  backgroundColor:string[]=['background-option-0','background-option-1','background-option-2','background-option-3'];

  constructor(public navCtrl: NavController, public navparams:NavParams) {
    this.attentionRoute=this.navparams.get('attentionRoute');
    console.log("lo que le llega", this.attentionRoute);
  }

  ionViewDidLoad() {

  }

  goToMenuPage() {
    this.navCtrl.popToRoot();
  }

}
