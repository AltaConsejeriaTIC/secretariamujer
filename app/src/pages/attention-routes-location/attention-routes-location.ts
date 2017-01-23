import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-attention-routes-location',
  templateUrl: './attention-routes-location.html'
})
export class AttentionRoutesLocationPage {

  attentionRoute:AttentionRoute;
  backgroundColor:string[]=['background-option-0','background-option-1','background-option-2','background-option-3'];
  subheaderBacgroundColor:string[]=['background-subheader-option-0','background-subheader-option-1','background-subheader-option-2','background-subheader-option-3'];
  subheaderTitle:string;
  constructor(public navCtrl: NavController, public navparams:NavParams) {
    this.attentionRoute=this.navparams.get('attentionRoute');
    console.log("lo que le llega", this.attentionRoute);
    this.setSubheaderTitle();


  }

  ionViewDidLoad() {

  }

  setSubheaderTitle(){
    if(this.attentionRoute.id==0){
      this.subheaderTitle='Medidas de Protección'
    }else{
      this.subheaderTitle=this.attentionRoute.labels[0];
    }
  }

  goToMenuPage() {
    this.navCtrl.popToRoot();
  }

}
