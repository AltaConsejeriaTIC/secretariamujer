import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AttentionRoutesLocationPage} from "../attention-routes-location/attention-routes-location";
import {AttentionRoute} from "../../entity/attention-route";

@Component({
  selector: 'page-attention-routes',
  templateUrl: './attention-routes.html'
})
export class AttentionRoutesPage {

  attentionRoutes: AttentionRoute[];

  constructor(public navController: NavController) {
    this.attentionRoutes = [
      {id: 0, labels: ['Medidas', 'de Protección'], class: 'option-0', RESTAddres:'protection_measures_routes_rest'},
      {id: 1, labels: ['Salud'], class: 'option-1', RESTAddres:'health_routes_rest'},
      {id: 2, labels: ['Justicia'], class: 'option-2', RESTAddres:'justice_routes_rest'},
      {id: 3, labels: ['Información'], class: 'option-3', RESTAddres:'info_routes_rest'}
    ]
  }

  ionViewDidLoad() {
  }

  goToRoute(routeId: number) {
    this.navController.push(AttentionRoutesLocationPage,{attentionRoute:this.attentionRoutes[routeId]});
  }

  goToMenuPage() {
    this.navController.popToRoot();
  }
}
