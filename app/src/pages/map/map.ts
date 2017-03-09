import { Component, ViewChild, ElementRef } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import {Http} from "@angular/http";
import {AlertCreator} from "../../providers/alert-creator";

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: './map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  sofiaPlaces: any[];
  defaultPosition: any[];
  currentPosition: any;
  currentLocalityBoundaries: any[];
  selectedLocality:string;

  constructor(public navCtrl: NavController, public alertCreator: AlertCreator, public http: Http, public navParams: NavParams) {
    this.defaultPosition = [{latitude: 4.6382109, longitude: -74.083969}];
    this.sofiaPlaces = [
      {placeName: 'Secretaría 1', coordinate: [4.6341285,-74.0893915]},
      {placeName: 'Secretaría 2', coordinate: [4.6305157,-74.079887]},
      {placeName: 'Secretaría 3', coordinate: [4.6293917,-74.0900739]},
      {placeName: 'Secretaría 4', coordinate: [4.6330481,-74.0871267]},
    ];
    this.selectedLocality=this.navParams.get('locality');
  }

  ionViewDidLoad(){
    this.loadMap();
  }

  goBackPage() {
    this.navCtrl.pop()
  }

  goToMenuPage() {
    this.navCtrl.popToRoot();
  }

  loadMap() {
    Geolocation.getCurrentPosition().then((position) => {
      this.setInitialMapSettings(position.coords.latitude, position.coords.longitude);
      this.setPinOnMap("Usted está aquí", position.coords.latitude, position.coords.longitude);
    }, (err) => {
      this.setInitialMapSettings(this.defaultPosition[0].latitude, this.defaultPosition[0].longitude);
      this.alertCreator.showSimpleAlert('Error', 'No pudo ser detectada su ubicación actual');
    });
  }

  setInitialMapSettings(currentLatitude, currentLongitude){
    this.currentPosition = new google.maps.LatLng(currentLatitude, currentLongitude);
    let mapOptions = {
      center: this.currentPosition,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.getMapStyle().then((style_array) => {
      this.map.setOptions({styles: style_array});
    });
    this.drawLocality();
    this.putPinsOnMap();
  }

  getMapStyle(): any {
    return this.doGet('assets/maps/map-style.json');
  }

  getLocalityBoundaries(locality): any {
    return this.doGet('assets/maps/localitiesBoundaries/' + locality + '.json');
  }

  doGet(url : string) {
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

  drawLocality() {
    this.getLocalityBoundaries("Teusaquillo").then((boundaries) => {
      this.currentLocalityBoundaries = boundaries;
      var flightPath = new google.maps.Polygon({
        paths: this.currentLocalityBoundaries,
        strokeColor: '#FF0000',
        strokeOpacity: 0,
        strokeWeight: 3,
        fillColor: '#FF0000',
        fillOpacity: 0.1
      });
      flightPath.setMap(this.map);
    });
  }

  putPinsOnMap() {
    for (let i = 0; i < this.sofiaPlaces.length; i++) {
      this.setPinOnMap(this.sofiaPlaces[i].placeName, this.sofiaPlaces[i].coordinate[0], this.sofiaPlaces[i].coordinate[1]);
    }
  }

  setPinOnMap(placeName, placeLatitude, placeLongitude) {
    let coordinateSite = new google.maps.LatLng(placeLatitude, placeLongitude);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: coordinateSite,
      /*icon: {
        'url': 'assets/img/menu-icons/Info_pictograma_Azul.png'
      }*/
    });

    let content = "<h4>" + placeName + "</h4>";
    this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
}
