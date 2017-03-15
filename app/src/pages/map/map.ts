import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http} from "@angular/http";
import {AlertCreator} from "../../providers/alert-creator";
import {MapServices} from "../../providers/map-services";
import {PinFactory} from "../../providers/pin-factory";
import {PlacesService} from "../../providers/places-service";

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

  constructor(public navCtrl: NavController, public alertCreator: AlertCreator, public http: Http,
              public navParams: NavParams, public mapService: MapServices, public pinFactory: PinFactory,
              private placesService: PlacesService) {
    this.selectedLocalityServer = this.navParams.get('localityServer');
    this.selectedLocalityLabel = this.navParams.get('localityLabel');
    this.localityCenter = this.navParams.get('localityCenter');
    this.localityBoundaries = this.navParams.get('localityBoundaries');
    this.infoWindow = new google.maps.InfoWindow();
  }

  ionViewDidLoad() {
    this.map = this.mapService.loadMap(this.infoWindow, this.mapElement, this.localityCenter, this.localityBoundaries);
    this.pinFactory.setNavController(this.navCtrl);
    this.pinFactory.configCloseInfoWindow(this.infoWindow, this.map);
    this.showPlacesInMap();
  }

  private showPlacesInMap() {
    this.placesService.getAllNeighborhoodPlaces(this.selectedLocalityLabel).subscribe(places => this.showPlaces(places));
  }

  private showPlaces(places) {
    places.forEach(place => this.showPlace(place));
  }

  private showPlace(place) {
    if (place.latitude != null && place.latitude.length > 0 && place.longitude != null && place.longitude.length > 0) {
      this.pinFactory.setPinOnMap(place.title, place.latitude, place.longitude, this.infoWindow, this.map);
    }
  }

  goBackPage() {
    this.navCtrl.pop()
  }

  goToMenuPage() {
    this.navCtrl.popToRoot();
  }

}
