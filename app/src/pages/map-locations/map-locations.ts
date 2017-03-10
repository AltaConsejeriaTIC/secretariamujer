import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MapPage} from "../map/map";
import {Localities} from "../../providers/localities";
import {Http} from "@angular/http";
import {Teusaquillo} from "../../providers/localitiesBoundaries/Teusaquillo";

@Component({
  selector: 'page-map-locations',
  templateUrl: 'map-locations.html'
})
export class MapLocationsPage {
  locationsLabels:string[];
  serverLocations:string[];

  constructor(public navCtrl: NavController, public locations:Localities,  public http: Http, public teusaquillo:Teusaquillo) {
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
        localityServer:this.serverLocations[id],
        localityLabel:this.locationsLabels[id],
        localityCenter:localityCenter,
        localityBoundaries:this.teusaquillo.getTeusaquillo()
    });
    });
  }

  getLocalitiesCenter(): any {
    return this.getFile('assets/maps/localities-center.json');
  }

  /*getLocalityBoundaries(locality): any {
    return this.getFile('assets/maps/localitiesBoundaries/' + locality + '.json');
  }*/

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
