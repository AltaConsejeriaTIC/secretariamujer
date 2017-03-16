import {Injectable, NgZone} from '@angular/core';
import 'rxjs/add/operator/map';
import {SiteInfoPage} from "../pages/site-info/site-info";

@Injectable()
export class PinFactory {
  navCtrl: any;
  lastMarketClicked: any;
  INFO_CATEGORY = 'info';
  JUSTICE_CATEGORY = 'justice';
  PROTECTION_MEASURES_CATEGORY = 'protection_measures';
  HEALTH_CATEGORY = 'health';

  constructor(public ngZone: NgZone) {
    window["angularComponentRef"] = {component: this, zone: this.ngZone};
  }

  setNavController(navController) {
    this.navCtrl = navController;
  }

  configCloseInfoWindow(infoWindow, map) {
    google.maps.event.addListener(map, 'click', () => {
      infoWindow.close();
      this.setDefaultPinToLastSelected();
    });
  }

  setDefaultPinToLastSelected() {
    if (this.lastMarketClicked) {
      let infoLastPinSelected = this.getCategoryInfo(this.lastMarketClicked.get("category"));
      this.lastMarketClicked.setIcon(infoLastPinSelected.defaulPin);
    }
  }

  setPinOnMap(place, infoWindow, map) {
    let marker = this.createMarker(map, place);
    let categoryInfo = this.getCategoryInfo(marker.get("category"));
    marker.setIcon(categoryInfo.defaulPin);
    let content = this.getPinContent(categoryInfo, place.title);
    this.addInfoWindow(marker, content, infoWindow, map, categoryInfo);
  }

  createMarker(map, place) {
    let coordinateSite = new google.maps.LatLng(place.latitude, place.longitude);
    let marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: coordinateSite
    });
    marker.set("category", place.category);
    marker.set("placeInfo", place);
    return marker;
  }

  getCategoryInfo(category) {
    let categoryInfo = this.getInfoByCategory(category);
    let pathImages = "assets/maps/pinImages/";
    categoryInfo.defaulPin = pathImages + categoryInfo.defaulPin;
    categoryInfo.selectedPin = pathImages + categoryInfo.selectedPin;
    return categoryInfo;
  }

  getInfoByCategory(category) {
    switch (category) {
      case this.INFO_CATEGORY:
        return { categoryIcon: "icon-info-places", categoryName: "Puntos de Información", defaulPin: "info_pin.png", selectedPin: "info_pin_selected.png" };
      case this.JUSTICE_CATEGORY:
        return { categoryIcon: "icon-complaint-places", categoryName: "Puntos para el Acceso a la Justicia", defaulPin: "justice_pin.png", selectedPin: "justice_pin_selected.png" };
      case this.PROTECTION_MEASURES_CATEGORY:
        return { categoryIcon: "icon-protection-measures", categoryName: "Medidas de Protección", defaulPin: "protection_pin.png", selectedPin: "protection_pin_selected.png" };
      case this.HEALTH_CATEGORY:
        return { categoryIcon: "icon-health-places", categoryName: "Puntos de Salud", defaulPin: "health_pin.png", selectedPin: "health_pin_selected.png" };
    }
  }

  getPinContent(categoryInfo, placeName) {
    let categoryInfoStructure = this.getCategoryInfoStructure(categoryInfo);
    let moreInfoButton = this.getMoreInfoButton();
    return "<div class='pin-infowindow'>" + categoryInfoStructure + "<ion-label class='place-name'>" + placeName + "</ion-label>" + moreInfoButton + "</div>";
  }

  getMoreInfoButton() {
    let moreInfoLabel = "<ion-label>Ver más</ion-label>";
    let plusIcon = "<ion-icon md='md-add-circle' name='add-circle' role='img' class='icon icon-md ion-md-add-circle' aria-label='add circle' ng-reflect-name='add-circle' ng-reflect-md='md-add-circle'></ion-icon>";

    return '<button onclick="window.angularComponentRef.zone.run(() => {window.angularComponentRef.component.goToInfoWindow();})" ion-button="" class="disable-hover button button-ios button-default button-default-ios"><span class="button-inner">' + plusIcon + moreInfoLabel + "</span><div class='button-effect'></div></button>";
  }

  goToInfoWindow() {
    this.navCtrl.push(SiteInfoPage, {placeInfo: this.lastMarketClicked.get("placeInfo")});
  }

  getCategoryInfoStructure(category) {
    let categoryIcon = this.getCategoryIconStructure(category.categoryIcon);
    let categoryName = this.getCategoryNameStructure(category.categoryName);
    return "<div class='category-title'>" + categoryIcon + categoryName + "</div>";
  }

  getCategoryIconStructure(categoryIcon) {
    return "<ion-icon class='icon-col icon icon-md ion-md-" + categoryIcon + "' name='" + categoryIcon + "'></ion-icon>";
  }

  getCategoryNameStructure(categoryName) {
    return "<ion-label>" + categoryName + "</ion-label>";
  }

  addInfoWindow(marker, content, infoWindow, map, categoryInfo) {
    google.maps.event.addListener(marker, 'click', () => {
      this.setDefaultPinToLastSelected();
      marker.setIcon(categoryInfo.selectedPin);
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
      this.lastMarketClicked = marker;
    });
  }

}
