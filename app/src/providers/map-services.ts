import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Geolocation } from 'ionic-native';
import {Http} from "@angular/http";


/*
  Generated class for the MapServices provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MapServices {

  currentLocalityBoundaries: any[];
  sofiaPlaces: any[];
  map: any;


  constructor( public http: Http) {
    this.sofiaPlaces = [
      {placeName: 'Secretaría 1', coordinate: [4.6341285,-74.0893915]},
      {placeName: 'Secretaría 2', coordinate: [4.6305157,-74.079887]},
      {placeName: 'Secretaría 3', coordinate: [4.6293917,-74.0900739]},
      {placeName: 'Secretaría 4', coordinate: [4.6330481,-74.0871267]},
    ];
  }

  loadMap(infoWindow, mapElement, center,boundaries) {
    return this.setInitialMapSettings(center, infoWindow, mapElement, boundaries);
  }

  setInitialMapSettings(center, infoWindow, mapElement, boundaries){
    console.log(center.lat + " " + center.lng + " " + center.zoom);
    let localityPosition = new google.maps.LatLng(center.lat, center.lng);
    let mapOptions = {
      center: localityPosition,
      zoom: center.zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(mapElement.nativeElement, mapOptions);

    google.maps.event.addListener(this.map, 'click', ()=> {
      infoWindow.close();
    });


    this.getMapStyle().then((style_array) => {
      this.map.setOptions({styles: style_array});
    });
    this.drawLocality(boundaries);
    this.putPinsOnMap(infoWindow);
    return this.map;
  }

  drawLocality(boundaries) {
    var flightPath = new google.maps.Polygon({
      paths: boundaries,
      strokeColor: '#FF0000',
      strokeOpacity: 0,
      strokeWeight: 3,
      fillColor: '#664ba8',
      fillOpacity: 0.15
    });
    flightPath.setMap(this.map);
  }

  putPinsOnMap(infoWindow) {
    for (let i = 0; i < this.sofiaPlaces.length; i++) {
      this.setPinOnMap(this.sofiaPlaces[i].placeName, this.sofiaPlaces[i].coordinate[0], this.sofiaPlaces[i].coordinate[1],infoWindow);
    }
  }

  setPinOnMap(placeName, placeLatitude, placeLongitude, infoWindow) {
    console.log("pinte pines");
    let coordinateSite = new google.maps.LatLng(placeLatitude, placeLongitude);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: coordinateSite,
      icon: {
        'url': 'assets/maps/pinImages/info_pin.png'
      }
    });

    let content = "<h4>" + placeName + "</h4>";
    this.addInfoWindow(marker, content, infoWindow);
  }

  addInfoWindow(marker, content, infoWindow){
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.setContent(content);
      infoWindow.open(this.map, marker);
    });
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

  getMapStyle(): any {
    return this.getFile('assets/maps/map-style.json');
  }

}
