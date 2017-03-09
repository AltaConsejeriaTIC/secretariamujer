import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MapPage} from "../map/map";
import {Localities} from "../../providers/localities";

@Component({
  selector: 'page-map-locations',
  templateUrl: 'map-locations.html'
})
export class MapLocationsPage {
  locationsLabels:string[];

  constructor(public navCtrl: NavController, public locations:Localities) {
    this.locationsLabels= this.locations.getLocalitiesLabels();
  }

  ionViewDidLoad() {

  }

  goToLocalityMap(id:any){
    this.navCtrl.push(MapPage);
  }

  goBackPage(){
    this.navCtrl.pop();
  }


  goToMenuPage() {
    this.navCtrl.popToRoot();
  }

}
