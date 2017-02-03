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
      {id: 0, labels: ['Sobre la Secretaria', 'de la Mujer'], class: 'option-0',iconName:'about-women-secretary'},
      {id: 1, labels: ['Sobre SOFIA'], class: 'option-1',iconName:'about-SOFIA'},
      {id: 2, labels: ['Sobre la App'], class: 'option-2',iconName:'about-app'},
      {id: 3, labels: ['Tutorial'], class: 'option-3',iconName:'icon-tutorial'}
    ];
  }

  ionViewDidLoad() {

  }

  goToMenuPage() {
    this.navController.popToRoot();
  }

}
