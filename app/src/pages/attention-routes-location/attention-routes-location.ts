import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AttentionRoute} from "../../entity/attention-route";
import {RoutesDetailsPage} from "../routes-details/routes-details";
import {Localities} from "../../providers/localities";

@Component({
  selector: 'page-attention-routes-location',
  templateUrl: './attention-routes-location.html'
})
export class AttentionRoutesLocationPage {

  attentionRoute:AttentionRoute;
  backgroundColor:string[]=['background-option-0','background-option-1','background-option-2','background-option-3'];
  subheaderBackgroundColor:string[]=['background-subheader-option-0','background-subheader-option-1','background-subheader-option-2','background-subheader-option-3'];
  locations:string[];
  locationsLabels:string[];

  constructor(public navCtrl: NavController, public navParams:NavParams, public localities:Localities) {
    this.attentionRoute=this.navParams.get('attentionRoute');
    this.locations=this.localities.getLocalitiesServer();
    this.locationsLabels=this.localities.getLocalitiesLabels();
  }

  ionViewDidLoad() {

  }

  goToRouteDetail(index:number){
    this.navCtrl.push(RoutesDetailsPage,{location:this.locations[index], attentionRoute:this.attentionRoute});
  }

  goBackPage(){
    this.navCtrl.pop();
  }

  goToMenuPage() {
    this.navCtrl.popToRoot();
  }

}
