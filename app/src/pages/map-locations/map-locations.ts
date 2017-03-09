import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MapPage} from "../map/map";

@Component({
  selector: 'page-map-locations',
  templateUrl: 'map-locations.html'
})
export class MapLocationsPage {
  locationsLabels:string[];

  constructor(public navCtrl: NavController) {
    this.locationsLabels=[
      'Usaquén',
      'Chapinero',
      'Santa Fe',
      'San Cristóbal',
      'Usme',
      'Tunjuelito',
      'Bosa',
      'Kennedy',
      'Fontibón',
      'Engativá',
      'Suba',
      'Barrios Unidos',
      'Teusaquillo',
      'Los Mártires',
      'Antonio Nariño',
      'Puente Aranda',
      'La Candelaria',
      'Rafael Uribe Uribe',
      'Ciudad Bolívar',
      'Sumapaz'
    ];
  }

  ionViewDidLoad() {

  }

  goToLocalityMap(id:any){
    this.navCtrl.push(MapPage);
  }

}
