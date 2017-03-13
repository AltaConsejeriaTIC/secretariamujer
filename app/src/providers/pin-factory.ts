import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class PinFactory {
  sofiaPlaces: any[];

  constructor() {
    this.sofiaPlaces = [
      {placeName: 'Secretaría 1', coordinate: [4.6341285,-74.0893915]},
      {placeName: 'Secretaría 2', coordinate: [4.6305157,-74.079887]},
      {placeName: 'Secretaría 3', coordinate: [4.6293917,-74.0900739]},
      {placeName: 'Secretaría 4', coordinate: [4.6330481,-74.0871267]},
    ];
  }


  putPinsOnMap(infoWindow, map) {
    for (let i = 0; i < this.sofiaPlaces.length; i++) {
      this.setPinOnMap(this.sofiaPlaces[i].placeName, this.sofiaPlaces[i].coordinate[0], this.sofiaPlaces[i].coordinate[1],infoWindow,map);
    }
  }

  setPinOnMap(placeName, placeLatitude, placeLongitude, infoWindow, map) {
    let coordinateSite = new google.maps.LatLng(placeLatitude, placeLongitude);

    let marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: coordinateSite,
      icon: {
        'url': 'assets/maps/pinImages/info_pin.png'
      }
    });

    let content = "<h4>" + placeName + "</h4>";
    this.addInfoWindow(marker, content, infoWindow, map);
  }

  addInfoWindow(marker, content, infoWindow, map){
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
    });
  }

}
