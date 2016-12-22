import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Geolocation } from 'ionic-native';


/*
  Generated class for the MapServices provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MapServices {

  constructor() {
  }

  buildMap(element:any){
    return new google.maps.Map(element, {
      center: {lat: 4.649594, lng: -74.1149021},
      zoom: 12
    });
  }

  getUserLocation():any{
    return Geolocation.getCurrentPosition();
  }

  convertToLatLng(position:any){
    return new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  }

  drawMarker(map:any, position:any, markers:any[]){
    let marker=new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: position,
      draggable:true
    });
    markers.push(marker);
  }

  clearMarker(markers:any[]){
    markers[1].setMap(null);
    markers.pop();
  }
}
