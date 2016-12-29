import { Component } from '@angular/core';

import { NavController, Platform} from 'ionic-angular';
import { UserDAO } from  '../../providers/user-dao'
import { MapServices } from  '../../providers/map-services'
import {EventsServices} from "../../providers/events-services";
import {AlertCreator} from "../../providers/alert-creator";
import { Diagnostic } from 'ionic-native';



@Component({
  selector: 'page-home',
  templateUrl: './map.html'
})
export class MapPage {
  map:any;
  markers:any[] = [];
  mapElement : any;

  constructor(public navCtrl:NavController, public adminApi:UserDAO, public mapService:MapServices, public eventsServices: EventsServices, public alertCreator: AlertCreator) {
  }

  ionViewDidLoad() {
    this.mapElement = document.getElementById('map');
    this.createMap();
    this.addMapOnClickListener();
    this.isGPSEnabled();

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
    if (this.isEventPinOnMap()) {
      this.mapService.clearMarker(this.markers);
    }
    this.mapService.drawEventMarker(this.map, event.latLng, this.markers);
  }

  isGPSEnabled(){
    Diagnostic.isLocationEnabled().then((res)=>{
      this.checkUserPosition(res);
    }).catch((err)=>{
      this.alertCreator.showSimpleAlert("error",err);
    });
  }

  checkUserPosition(isEnabled:boolean){
    if(isEnabled){
      this.getUserPosition();
    }else{
      this.alertCreator.showSimpleAlert('Error','Por favor activa el GPS');
    }
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

  isEventPinOnMap(){
    return this.markers.length > 0;
  }

  registerEvent(){
    this.eventsServices.registerEvent().map(res=>res.json()).subscribe(response=>{
      this.alertCreator.showSimpleAlert('Exito','Se ha registrado el evento');
    },err=>{
      //this.alertCreator.showSimpleAlert('Error','Ha habido un error por favor intentalo más tarde');
    });
  }


}
