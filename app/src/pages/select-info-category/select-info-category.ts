import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {InfoCategory} from "../../entity/info-categories";
import {SDMUInfoPage} from "../sdmu-info-page/sdmu-info-page";
import {SOFIAInfoPage} from "../sofia-info/sofia-info";
import {AboutAppPage} from "../about-app-page/about-app-page";
import {TutorialPage} from "../tutorial-page/tutorial-page";

import {Platform} from 'ionic-angular'

@Component({
  selector: 'page-select-info-category',
  templateUrl: './select-info-category.html'
})
export class SelectInfoCategoryPage {

  infoCategories:InfoCategory[];

  constructor(public navController: NavController, platform: Platform) {
    this.infoCategories = [
      {id: 0, labels: ['Sobre la Secretaria', 'de la Mujer'], class: 'option-0',iconName:'about-women-secretary', nextPage:'SDMUInfoPage'},
      {id: 1, labels: ['Sobre SOFIA'], class: 'option-1',iconName:'about-SOFIA', nextPage:'SOFIAInfoPage'},
      {id: 2, labels: ['Sobre la App'], class: 'option-2',iconName:'about-app', nextPage:'AboutAppPage'},
      {id: 3, labels: ['Tutorial'], class: 'option-3',iconName:'icon-tutorial', nextPage:'TutorialPage'}
    ];

    platform.ready().then((readySource) => {
      alert ('WP: ' + platform.width() + '; HP: ' + platform.height() + '; IW: ' + window.innerWidth + '; IH: ' + window.innerHeight);
    });
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

      case 'AboutAppPage':
        this.navController.push(AboutAppPage);
        break;

      case 'TutorialPage':
        this.navController.push(TutorialPage);
        break;
    }
  }

  goBackPage(){
    this.navController.pop();
  }

  goToMenuPage() {
    this.navController.popToRoot();
  }
}
