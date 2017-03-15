import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {ApplicationConfig} from "../config";
import {Observable} from "rxjs";


@Injectable()
export class PlacesService {
  readonly INFO_ROUTE_ADDRESS = 'info_routes_rest';
  readonly JUSTICE_ROUTE_ADDRESS = 'justice_routes_rest';
  readonly PROTECTION_ROUTE_ADDRESS = 'protection_measures_routes_rest';
  readonly HEALTH_ROUTE_ADDRESS = 'health_routes_rest';


  constructor(private http: Http) {
  }

  getAllNeighborhoodPlaces(neighborhood) {
    let infoPlaces = this.getRoutePlaces(this.INFO_ROUTE_ADDRESS, neighborhood);
    let justicePlaces = this.getRoutePlaces(this.JUSTICE_ROUTE_ADDRESS, neighborhood);
    let protectionPlaces = this.getRoutePlaces(this.PROTECTION_ROUTE_ADDRESS, neighborhood);
    let healthPlaces = this.getRoutePlaces(this.HEALTH_ROUTE_ADDRESS, neighborhood);

    let observable = Observable.forkJoin([infoPlaces, justicePlaces, protectionPlaces, healthPlaces]).map(routes => {
      let places = [];

      for (let i = 0; i < routes.length; i++) {
        places = places.concat(routes[i]);
      }

      return places;
    });

    return observable;
  }

  getRoutePlaces(RESTAddress, neighborhood) {
    let url = ApplicationConfig.getURL('/' + RESTAddress + '/' + neighborhood);

    return this.http.get(url).map(res => res.json());
  }
}
