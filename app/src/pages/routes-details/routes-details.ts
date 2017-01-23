import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AttentionRoute} from "../../entity/attention-route";

@Component({
  selector: 'page-routes-details',
  templateUrl: './routes-details.html'
})
export class RoutesDetailsPage {

  location:string;
  attentionRoute:AttentionRoute;
  subheaderBackgroundColor:string[]=['background-subheader-option-0','background-subheader-option-1','background-subheader-option-2','background-subheader-option-3'];


  constructor(public navCtrl: NavController, public navParams:NavParams) {
    this.location=this.navParams.get('location');
    this.attentionRoute=this.navParams.get('attentionRoute');
  }

  ionViewDidLoad() {

  }

  goBackPage(){
    this.navCtrl.pop();
  }

  goToMenuPage() {
    this.navCtrl.popToRoot();
  }

}
