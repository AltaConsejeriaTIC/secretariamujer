import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-attention-routes',
  templateUrl: './attention-routes.html'
})
export class AttentionRoutesPage {

  attentionRoutes: AttentionRoute[];

  constructor(public navController: NavController) {
    this.attentionRoutes = [
      {id: 0, labels: ['Medidas', 'de Protección'], class: 'option-0'},
      {id: 1, labels: ['Salud'], class: 'option-1'},
      {id: 2, labels: ['Justicia'], class: 'option-2'},
      {id: 3, labels: ['Información'], class: 'option-3'}
    ]
  }

  ionViewDidLoad() {
  }

  goToRoute(routeId: number) {

  }

  goToMenuPage() {
    this.navController.popToRoot();
  }
}
