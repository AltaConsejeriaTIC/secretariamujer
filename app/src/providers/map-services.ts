import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from 'ionic-native';


/*
  Generated class for the MapServices provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MapServices {

  constructor(public http: Http) {
    console.log('Hello MapServices Provider');
  }

  getUserLocation(map:any){
    Geolocation.getCurrentPosition().then((position) => {
      let userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let userMarker= new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: userLatLng
      });

    }, (err) => {
      console.log('hubo un error en la posciione del ussuriao', err);
    });
  }

}
