import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MapPage} from "../map/map";
import {Localities} from "../../providers/localities";
import {Http} from "@angular/http";
import {LocalitiesBoundaries} from "../../providers/localities-boundaries";

@Component({
  selector: 'page-map-locations',
  templateUrl: 'map-locations.html'
})
export class MapLocationsPage {
  locationsLabels:string[];
  serverLocations:string[];

  constructor(public navCtrl: NavController, public locations:Localities,  public http: Http, public localityBoundaries:LocalitiesBoundaries) {
    this.locationsLabels= this.locations.getLocalitiesLabels();
    this.serverLocations=this.locations.getLocalitiesServer();
  }

  ionViewDidLoad() {

  }

  goToLocalityMap(id:number){
    this.getSelectedLocalityData(id);
  }

  getSelectedLocalityData(id){
    let localityCenter;
    this.getLocalitiesCenter().then((localitiesCenter) => {
      for (let i = 0; i < localitiesCenter.length; i++) {
        if (localitiesCenter[i].name == this.locationsLabels[id]) {
          localityCenter=localitiesCenter[i];
        }
      }

      this.navCtrl.push(MapPage,{
        titlePage: "Mapas",
        localityServer:this.serverLocations[id],
        localityLabel:this.locationsLabels[id],
        localityCenter:localityCenter,
        localityBoundaries:this.localityBoundaries.getlocalityBoundaries(this.serverLocations[id]),
        place: []
      });
    });
  }

  getLocalitiesCenter(): any {
    return this.getFile('assets/maps/localities-center.json');
  }

  getFile(url : string) {
    return new Promise(
      resolve => { this.http.get(url).map(res => res.json()).subscribe(data =>
        {
          resolve(data);
        },
        err => {
          console.log("Unable to resolve GET promise to url: " + url + "\n ERROR: " + err);
        }
      );
      });
  }

  goBackPage(){
    this.navCtrl.pop();
  }


  goToMenuPage() {
    this.navCtrl.popToRoot();
  }

}
