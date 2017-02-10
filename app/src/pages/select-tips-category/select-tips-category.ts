import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {TipsPage} from "../tips-page/tips-page";
import {TipData} from "../../entity/tip-data";

@Component({
  selector: 'page-select-tips-category',
  templateUrl: './select-tips-category.html'
})
export class SelectTipsCategoryPage {
  tipsCategories: TipData[];

  constructor(public navController: NavController) {
    this.tipsCategories = [
      {id: 0, labels: ['El dinero no es', 'razón de control'], class: 'option-0', iconName: "icon-economic-violence", RESTAddres: "economic_violence_tips_rest" },
      {id: 1, labels: ['Las caricias', 'no duelen'], class: 'option-1', iconName: "icon-physical-violence", RESTAddres: "physical_violence_tips_rest"},
      {id: 2, labels: ['Las palabras', 'también hieren'], class: 'option-2', iconName: "icon-psychological-violence", RESTAddres: "psychological_violence_tips_rest"},
      {id: 3, labels: ['Hacer el amor', 'es cosa de iguales'], class: 'option-3', iconName: "icon-sexual-violence", RESTAddres: "sexual_violence_tips_rest"}
    ];
  }

  ionViewDidLoad() {
  }

  private showTipsPage(categoryId: number) {
    this.navController.push(TipsPage,{selectedTipCategory:this.tipsCategories[categoryId]});
  }

  goBackPage(){
    this.navController.pop();
  }

  goToMenuPage() {
    this.navController.popToRoot();
  }

}
