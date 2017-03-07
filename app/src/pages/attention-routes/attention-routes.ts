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
      {id: 0, labels: ['Puntos de', 'Información'], class: 'option-0', iconName:'icon-info-places', RESTAddres:'info_routes_rest'},
      {id: 1, labels: ['Puntos', 'de Salud'] , class: 'option-1', iconName:'icon-health-places', RESTAddres:'health_routes_rest'},
      {id: 2, labels: ['Puntos para el', 'Acceso a la Justicia'], class: 'option-2', iconName:'icon-complaint-places', RESTAddres:'justice_routes_rest'},
      {id: 3, labels: ['Solicitar medidas', 'de Protección'], class: 'option-3', iconName:'icon-protection-measures', RESTAddres:'protection_measures_routes_rest'}
    ]
  }

  ionViewDidLoad() {
  }

  goToRoute(routeId: number) {
    this.navController.push(AttentionRoutesLocationPage,{attentionRoute:this.attentionRoutes[routeId]});
  }

  goBackPage(){
    this.navController.pop();
  }

  goToMenuPage() {
    this.navController.popToRoot();
  }
}
