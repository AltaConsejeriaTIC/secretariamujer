import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {InfoCategory} from "../../entity/info-categories";

@Component({
  selector: 'page-select-info-category',
  templateUrl: './select-info-category.html'
})
export class SelectInfoCategoryPage {

  infoCategories:InfoCategory[];

  constructor(public navController: NavController) {
    this.infoCategories = [
      {id: 0, labels: ['Sobre la Secretaria', 'de la Mujer'], class: 'option-0', RESTAddress:''},
      {id: 1, labels: ['Sobre SOFIA'], class: 'option-1', RESTAddress:''},
      {id: 2, labels: ['Sobre la App'], class: 'option-2', RESTAddress:''},
      {id: 3, labels: ['Tutorial'], class: 'option-3', RESTAddress:''}
    ];
  }

  ionViewDidLoad() {

  }

  goToMenuPage() {
    this.navController.popToRoot();
  }

}
