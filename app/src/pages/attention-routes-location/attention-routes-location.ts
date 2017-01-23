import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AttentionRoute} from "../../entity/attention-route";

@Component({
  selector: 'page-attention-routes-location',
  templateUrl: './attention-routes-location.html'
})
export class AttentionRoutesLocationPage {

  attentionRoute:AttentionRoute;
  backgroundColor:string[]=['background-option-0','background-option-1','background-option-2','background-option-3'];
  subheaderBacgroundColor:string[]=['background-subheader-option-0','background-subheader-option-1','background-subheader-option-2','background-subheader-option-3'];
  locations:string[];
  constructor(public navCtrl: NavController, public navparams:NavParams) {
    this.attentionRoute=this.navparams.get('attentionRoute');
    this.locations=[
      'Usaquén',
      'Chapinero',
      'Santa Fé',
      'San Cristóbal',
      'Usme',
      'Tunjuelito',
      'Bosa',
      'Ciudad Kennedy',
      'Fontibón',
      'Engativá',
      'Suba',
      'Barrios Unidos',
      'Teusaquillo',
      'Los Mártires',
      'Antonio Nariño',
      'Puente Aranda',
      'Candelaria',
      'Rafael Uribe',
      'Ciudad Bolívar',
      'Sumapáz'
    ];
  }

  ionViewDidLoad() {

  }

  goToMenuPage() {
    this.navCtrl.popToRoot();
  }

}
