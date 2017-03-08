import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: './map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  sofiaPlaces: any[];

  constructor(public navCtrl: NavController) {
    this.sofiaPlaces = [
      {placeName: 'Secretaría 1', coordinate: [4.6341285,-74.0893915]},
      {placeName: 'Secretaría 2', coordinate: [4.6305157,-74.079887]},
      {placeName: 'Secretaría 3', coordinate: [4.6293917,-74.0900739]},
      {placeName: 'Secretaría 4', coordinate: [4.6330481,-74.0871267]},
    ];
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
    this.setInitialMapSettings();
    this.putPinsOnMap();
  }

  putPinsOnMap(){
    for (let i = 0; i < this.sofiaPlaces.length; i++) {
      this.setPinOnMap(this.sofiaPlaces[i]);
    }
  }

  setPinOnMap(place) {
    let coordinateSite = new google.maps.LatLng(place.coordinate[0], place.coordinate[1]);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: coordinateSite,
      /*icon: {
        'url': 'assets/img/menu-icons/Info_pictograma_Azul.png'
      }*/
    });

    let content = "<h4>" + place.placeName + "</h4>";

    this.addInfoWindow(marker, content);
  }

  setInitialMapSettings(){
    let initialPosition = new google.maps.LatLng(4.6373802,-74.086619);
    let mapOptions = {
      center: initialPosition,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
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
