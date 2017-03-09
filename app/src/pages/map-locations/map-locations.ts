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
  serverLocations:string[];

  constructor(public navCtrl: NavController, public locations:Localities) {
    this.locationsLabels= this.locations.getLocalitiesLabels();
    this.serverLocations=this.locations.getLocalitiesServer();
  }

  ionViewDidLoad() {

  }

  goToLocalityMap(id:number){
    this.navCtrl.push(MapPage,{locality:this.serverLocations[id]});
  }

  goBackPage(){
    this.navCtrl.pop();
  }


  goToMenuPage() {
    this.navCtrl.popToRoot();
  }

}
