import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http} from "@angular/http";
import {AlertCreator} from "../../providers/alert-creator";
import {MapServices} from "../../providers/map-services";
import {PinFactory} from "../../providers/pin-factory";
import {PlacesService} from "../../providers/places-service";
import {NetworkStatusService} from "../../providers/network-status-service";

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
  place: any;
  localityTitle: string;
  titlePage: string;

  constructor(public navCtrl: NavController, public alertCreator: AlertCreator, public http: Http,
              public navParams: NavParams, public mapService: MapServices, public pinFactory: PinFactory,
              private placesService: PlacesService) {
    this.titlePage = this.navParams.get('titlePage');
    this.selectedLocalityServer = this.navParams.get('localityServer');
    this.selectedLocalityLabel = this.navParams.get('localityLabel');
    this.localityCenter = this.navParams.get('localityCenter');
    this.localityBoundaries = this.navParams.get('localityBoundaries');
    this.infoWindow = new google.maps.InfoWindow();
    this.place = this.navParams.get('place');
  }

  ionViewDidLoad() {
    if (!NetworkStatusService.isDeviceConnected())
      this.alertCreator.showSimpleAlert('Error', 'No es posible ver los sitios porque no tienes conexión a Internet');
    this.localityTitle = this.selectedLocalityLabel || this.place.location;
    let mapObject = this.mapService.loadMap(this.infoWindow, this.mapElement, this.localityCenter, this.localityBoundaries);
    this.map = mapObject.map;
    this.pinFactory.setNavController(this.navCtrl);
    this.pinFactory.configCloseInfoWindow(this.infoWindow, mapObject);
    this.showPlacesInMap();
  }

  private showPlacesInMap() {
    if (this.selectedLocalityLabel)
      this.placesService.getAllNeighborhoodPlaces(this.selectedLocalityLabel).subscribe(places => this.showPlaces(places));
    else
      this.showPlace(this.place);
  }

  private showPlaces(places) {
    places.forEach(place => this.showPlace(place));
  }

  private showPlace(place) {
    if (place.latitude != null && place.latitude.length > 0 && place.longitude != null && place.longitude.length > 0) {
      this.pinFactory.setPinOnMap(place, this.infoWindow, this.map, this.titlePage);
    }
  }

  goBackPage() {
    this.navCtrl.pop()
  }

  goToMenuPage() {
    this.navCtrl.popToRoot();
  }

}
