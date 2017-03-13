import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {Http} from "@angular/http";
import {AlertCreator} from "../../providers/alert-creator";
import {ApplicationConfig} from "../../config";
import {MapServices} from "../../providers/map-services";
import {PinFactory} from "../../providers/pin-factory";

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: './map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  selectedLocalityServer: string;
  selectedLocalityLabel: string;
  localityCenter: any;
  localityBoundaries: any;
  infoWindow: any;

  constructor(public navCtrl: NavController, public alertCreator: AlertCreator, public http: Http, public navParams: NavParams, public mapService: MapServices, public pinFactory: PinFactory) {
    this.selectedLocalityServer = this.navParams.get('localityServer');
    this.selectedLocalityLabel = this.navParams.get('localityLabel');
    this.localityCenter = this.navParams.get('localityCenter');
    this.localityBoundaries = this.navParams.get('localityBoundaries');
    this.infoWindow = new google.maps.InfoWindow();
  }

  ionViewDidLoad() {
    this.map = this.mapService.loadMap(this.infoWindow, this.mapElement, this.localityCenter, this.localityBoundaries);
    this.showPlacesInMap();
  }

  showPlacesInMap() {
    let RESTAddress = "info_routes_rest/" + this.selectedLocalityServer;
    let url = ApplicationConfig.getURL('/' + RESTAddress + '?_format=json');
    this.http.get(url).map(res => res.json()).subscribe(response => {
      response.forEach((place) => {
        console.log(place)
        if (place.latitude != null && place.latitude.length > 0 && place.longitude != null && place.longitude.length > 0) {
          this.pinFactory.showPlaceOnMap(place, this.infoWindow, this.map);
        }
      });
    }, err => {
      this.alertCreator.showSimpleAlert("Error", "Asegurate de tener conexión a internet, o intentalo más tarde");
    });
  }

  goBackPage() {
    this.navCtrl.pop()
  }

  goToMenuPage() {
    this.navCtrl.popToRoot();
  }

}
