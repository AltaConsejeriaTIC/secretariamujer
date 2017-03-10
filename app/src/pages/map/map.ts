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
  currentLocalityBoundaries: any[];
  selectedLocalityServer:string;
  selectedLocalityLabel:string;
  infoWindow:any;

  constructor(public navCtrl: NavController, public alertCreator: AlertCreator, public http: Http, public navParams: NavParams) {
    this.sofiaPlaces = [
      {placeName: 'Secretaría 1', coordinate: [4.6341285,-74.0893915]},
      {placeName: 'Secretaría 2', coordinate: [4.6305157,-74.079887]},
      {placeName: 'Secretaría 3', coordinate: [4.6293917,-74.0900739]},
      {placeName: 'Secretaría 4', coordinate: [4.6330481,-74.0871267]},
    ];

    this.selectedLocalityServer=this.navParams.get('localityServer');
    this.selectedLocalityLabel=this.navParams.get('localityLabel');
    this.infoWindow = new google.maps.InfoWindow();
  }

  ionViewDidLoad(){
    this.loadMap(this.selectedLocalityLabel);
  }

  goBackPage() {
    this.navCtrl.pop()
  }

  goToMenuPage() {
    this.navCtrl.popToRoot();
  }

  loadMap(localityName) {
    this.getLocalityCenter().then((localitiesCenter) => {
      for (let i = 0; i < localitiesCenter.length; i++) {
        if (localitiesCenter[i].name == localityName) {
          this.setInitialMapSettings(localitiesCenter[i]);
        }
      }
    });
  }

  setInitialMapSettings(locality){
    console.log(locality.lat + " " + locality.lng + " " + locality.zoom);
    let localityPosition = new google.maps.LatLng(locality.lat, locality.lng);
    let mapOptions = {
      center: localityPosition,
      zoom: locality.zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    google.maps.event.addListener(this.map, 'click', ()=> {
      this.infoWindow.close();
    });


    this.getMapStyle().then((style_array) => {
      this.map.setOptions({styles: style_array});
    });
    this.drawLocality(locality.name);
    this.putPinsOnMap();
  }

  getLocalityCenter(): any {
    return this.doGet('assets/maps/localities-center.json');
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

  drawLocality(localityName) {
    this.getLocalityBoundaries(localityName).then((boundaries) => {
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
    google.maps.event.addListener(marker, 'click', () => {
      this.infoWindow.setContent(content);
      this.infoWindow.open(this.map, marker);
    });
  }
}
