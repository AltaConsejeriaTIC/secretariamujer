import {Injectable, NgZone} from '@angular/core';
import 'rxjs/add/operator/map';
import {SiteInfoPage} from "../pages/site-info/site-info";

@Injectable()
export class PinFactory {
  sofiaPlaces: any[];
  navCtrl: any;
  lastMarketClicked: any;
  pinCounter: number;

  constructor(public ngZone: NgZone) {
    this.pinCounter = -1;
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

  setPinOnMap(placeName, placeLatitude, placeLongitude, infoWindow, map) {
    let coordinateSite = new google.maps.LatLng(placeLatitude, placeLongitude);
    this.pinCounter = this.pinCounter + 1;
    let marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: coordinateSite
    });

    marker.set("category", "info");
    let categoryInfo = this.getCategoryInfo(marker.get("category"));
    marker.setIcon(categoryInfo.defaulPin);
    let content = this.getPinContent(categoryInfo, placeName);
    this.addInfoWindow(marker, content, infoWindow, map, categoryInfo);
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
      case 'info':
        return {
          categoryIcon: "icon-info-places",
          categoryName: "Puntos de Información",
          defaulPin: "info_pin.png",
          selectedPin: "info_pin_selected.png"
        };
      case 'justice':
        return {
          categoryIcon: "icon-complaint-places",
          categoryName: "Puntos para el Acceso a la Justicia",
          defaulPin: "justice_pin.png",
          selectedPin: "justice_pin_selected.png"
        };
      case 'protection_measures':
        return {
          categoryIcon: "icon-protection-measures",
          categoryName: "Medidas de Protección",
          defaulPin: "protection_pin.png",
          selectedPin: "protection_pin_selected.png"
        };
      case 'health':
        return {
          categoryIcon: "icon-health-places",
          categoryName: "Puntos de Salud",
          defaulPin: "health_pin.png",
          selectedPin: "health_pin_selected.png"
        };
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

    return '<button onclick="window.angularComponentRef.zone.run(() => {window.angularComponentRef.component.goToInfoWindow(\'' + this.pinCounter + '\');})" ion-button="" class="disable-hover button button-ios button-default button-default-ios"><span class="button-inner">' + plusIcon + moreInfoLabel + "</span><div class='button-effect'></div></button>";
  }

  goToInfoWindow(selectedPin) {
    console.log("hizo click", selectedPin);
    this.pinCounter = -1;
    this.navCtrl.push(SiteInfoPage, {placeInfo: this.sofiaPlaces[selectedPin]});
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
      if (this.lastMarketClicked)
        this.lastMarketClicked.setIcon(categoryInfo.defaulPin);
      marker.setIcon(categoryInfo.selectedPin);
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
      this.lastMarketClicked = marker;
    });
  }

}
