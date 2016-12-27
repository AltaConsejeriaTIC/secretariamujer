import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { UserDAO } from  '../../providers/user-dao'
import { MapServices } from  '../../providers/map-services'


@Component({
  selector: 'page-home',
  templateUrl: './map.html'
})
export class MapPage {
  map:any;
  markers:any[] = [];
  mapElement : any;

  constructor(public navCtrl:NavController, public adminApi:UserDAO, public mapService:MapServices) {
  }

  ionViewDidLoad() {
    this.mapElement = document.getElementById('map');
    this.createMap();
    this.addMapOnClickListener();
    this.getUserPosition();

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.mapElement.classList.add('show-map');
      google.maps.event.trigger(this.mapElement, 'resize');
    });

  }

  createMap() {
    this.map = this.mapService.buildMap(this.mapElement);
  }

  addMapOnClickListener() {
    this.map.addListener('click', (event)=> {
      this.drawEventMarker(event);
    });
  }

  drawEventMarker(event:any){
    if (this.markers.length > 0) {
      this.mapService.clearMarker(this.markers);
    }
    this.mapService.drawEventMarker(this.map, event.latLng, this.markers);
  }

  getUserPosition(){
    this.mapService.getUserLocation().then((position) => {
      this.drawUserPosition(position);
    }, (err) => {
      console.log('hubo un error en la posciione del ussuriao', err);
    });

  }

  drawUserPosition(position:any) {
    let userPosition = this.mapService.convertToLatLng(position);
    this.mapService.drawUserPositionMarker(this.map, userPosition);
  }

}
