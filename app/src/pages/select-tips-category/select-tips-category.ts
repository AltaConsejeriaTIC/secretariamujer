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
      {id: 0, labels: ['Violencia', 'Económica'], class: 'option-0', RESTAddres: "economic_violence_tips_rest" },
      {id: 1, labels: ['Violencia', 'Física'], class: 'option-1', RESTAddres: "physical_violence_tips_rest"},
      {id: 2, labels: ['Violencia', 'Psicológica'], class: 'option-2', RESTAddres: "psychological_violence_tips_rest"},
      {id: 3, labels: ['Violencia', 'Sexual'], class: 'option-3', RESTAddres: "sexual_violence_tips_rest"}
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
