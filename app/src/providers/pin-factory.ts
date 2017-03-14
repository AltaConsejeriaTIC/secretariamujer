import {Injectable, NgZone} from '@angular/core';
import 'rxjs/add/operator/map';
import {SiteInfoPage} from "../pages/site-info/site-info";

@Injectable()
export class PinFactory {
  sofiaPlaces: any[];
  navCtrl:any;

  pinCounter:number;

  constructor(public ngZone: NgZone) {
    this.sofiaPlaces = [
      {placeName: 'Secretaría 1', coordinate: [4.6341285,-74.0893915]},
      {placeName: 'Secretaría 2', coordinate: [4.6305157,-74.079887]},
      {placeName: 'Instituto Nacional de Medicina Legal y Ciencias Forenses - UBAM (Valoración de menores de edad y casos de violencia sexual)', coordinate: [4.6293917,-74.0900739]},
      {placeName: 'Secretaría 4', coordinate: [4.6330481,-74.0871267]},
    ];
    this.pinCounter=0;

    window["angularComponentRef"] = { component: this, zone: this.ngZone };

  }

  setNavController(navController){
    this.navCtrl=navController;
  }

  putPinsOnMap(infoWindow, map) {
    for (let i = 0; i < this.sofiaPlaces.length; i++) {
      this.setPinOnMap(this.sofiaPlaces[i].placeName, this.sofiaPlaces[i].coordinate[0], this.sofiaPlaces[i].coordinate[1],infoWindow,map);
    }
  }

  setPinOnMap(placeName, placeLatitude, placeLongitude, infoWindow, map) {
    let coordinateSite = new google.maps.LatLng(placeLatitude, placeLongitude);
    this.pinCounter=this.pinCounter+1;
    let marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: coordinateSite,
      icon: {
        'url': 'assets/maps/pinImages/info_pin.png'
      }
    });
    let content = this.getPinContent("health", placeName);
    this.addInfoWindow(marker, content, infoWindow, map);
  }

  getPinContent(category, placeName) {
    let categoryInfo = this.getCategoryInfoStructure(category);
    let moreInfoButton = this.getMoreInfoButton();
    return "<div class='pin-infowindow'>"+ categoryInfo + "<ion-label class='place-name'>" + placeName + "</ion-label>" + moreInfoButton + "</div>";
  }

  getMoreInfoButton() {
    let moreInfoLabel = "<ion-label>Ver más</ion-label>";
    let plusIcon ="<ion-icon md='md-add-circle' name='add-circle' role='img' class='icon icon-md ion-md-add-circle' aria-label='add circle' ng-reflect-name='add-circle' ng-reflect-md='md-add-circle'></ion-icon>";

    return '<button onclick="window.angularComponentRef.zone.run(() => {window.angularComponentRef.component.goToInfoWindow(\'' + this.pinCounter + '\');})" ion-button="" class="disable-hover button button-ios button-default button-default-ios"><span class="button-inner">' + plusIcon + moreInfoLabel + "</span><div class='button-effect'></div></button>";
  }

  goToInfoWindow(selectedPin){
    console.log("hizo click", selectedPin);
    this.navCtrl.push(SiteInfoPage, {placeInfo:this.sofiaPlaces[selectedPin]});
  }

  getCategoryInfoStructure(category) {
    let categoryInfoArray = this.getCategoryInfo(category);
    let categoryIcon = this.getCategoryIconStructure(categoryInfoArray[0]);
    let categoryName = this.getCategoryNameStructure(categoryInfoArray[1]);
    return "<div class='category-title'>" + categoryIcon + categoryName + "</div>";
  }

  getCategoryInfo(category) {
    let categoryIcon = "";
    let categoryName = "";
    switch (category) {
      case 'info': {
        categoryIcon = "icon-info-places";
        categoryName = "Puntos de Información";
        break;
      }
      case 'justice': {
        categoryIcon = "icon-complaint-places";
        categoryName = "Puntos para el Acceso a la Justicia";
        break;
      }
      case 'protection_measures': {
        categoryIcon = "icon-protection-measures";
        categoryName = "Medidas de Protección";
        break;
      }
      case 'health': {
        categoryIcon = "icon-health-places";
        categoryName = "Puntos de Salud";
        break;
      }
    }
    return [categoryIcon, categoryName];
  }

  getCategoryIconStructure(categoryIcon) {
    return "<ion-icon class='icon-col icon icon-md ion-md-" + categoryIcon + "' name='"+ categoryIcon + "'></ion-icon>";
  }

  getCategoryNameStructure(categoryName) {
    return "<ion-label>" + categoryName + "</ion-label>";
  }

  addInfoWindow(marker, content, infoWindow, map){
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
    });
  }

}
