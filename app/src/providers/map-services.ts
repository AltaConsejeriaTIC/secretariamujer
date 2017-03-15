import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Http} from "@angular/http";

@Injectable()
export class MapServices {
  map: any;

  constructor(public http: Http) {

  }

  loadMap(infoWindow, mapElement, center, boundaries) {
    return this.setInitialMapSettings(center, infoWindow, mapElement, boundaries);

  }

  setInitialMapSettings(center, infoWindow, mapElement, boundaries) {
    let localityPosition = new google.maps.LatLng(center.lat, center.lng);
    let mapOptions = {
      center: localityPosition,
      zoom: center.zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(mapElement.nativeElement, mapOptions);

    this.getMapStyle().then((style_array) => {
      this.map.setOptions({styles: style_array});
    });
    this.drawLocality(boundaries);
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

  getFile(url: string) {
    return new Promise(
      resolve => {
        this.http.get(url).map(res => res.json()).subscribe(data => {
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
