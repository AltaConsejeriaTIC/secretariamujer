import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {InfoCategory} from "../../entity/info-categories";
import {SDMUInfoPage} from "../sdmu-info-page/sdmu-info-page";
import {SOFIAInfoPage} from "../sofia-info/sofia-info";

@Component({
  selector: 'page-select-info-category',
  templateUrl: './select-info-category.html'
})
export class SelectInfoCategoryPage {

  infoCategories:InfoCategory[];

  constructor(public navController: NavController) {
    this.infoCategories = [
      {id: 0, labels: ['Sobre la Secretaria', 'de la Mujer'], class: 'option-0',iconName:'about-women-secretary', nextPage:'SDMUInfoPage'},
      {id: 1, labels: ['Sobre SOFIA'], class: 'option-1',iconName:'about-SOFIA', nextPage:'SOFIAInfoPage'},
      {id: 2, labels: ['Sobre la App'], class: 'option-2',iconName:'about-app', nextPage:''},
      {id: 3, labels: ['Tutorial'], class: 'option-3',iconName:'icon-tutorial', nextPage:''}
    ];
  }

  ionViewDidLoad() {

  }

  goToSelectedcategory(nextPage:string){
    switch (nextPage){
      case 'SDMUInfoPage':
        this.navController.push(SDMUInfoPage);
        break;

      case 'SOFIAInfoPage':
        this.navController.push(SOFIAInfoPage);
        break;
    }
  }

  goToMenuPage() {
    this.navController.popToRoot();
  }

}
