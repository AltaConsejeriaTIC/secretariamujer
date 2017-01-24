import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SelectCategoryService} from "../../providers/select-category-service";
import {TestCategory } from "../../entity/test-categories"

@Component({
  selector: 'page-select-tips-category',
  templateUrl: 'select-tips-category.html'
})
export class SelectTipsCategoryPage {
  tipsCategories: TestCategory[];

  constructor(public navController: NavController, public selectCategoryService: SelectCategoryService) {
    this.tipsCategories = [
      {id: 0, labels: ['Violencia', 'Económica'], class: 'option-0'},
      {id: 1, labels: ['Violencia', 'Física'], class: 'option-1'},
      {id: 2, labels: ['Violencia', 'Psicológica'], class: 'option-2'},
      {id: 3, labels: ['Violencia', 'Sexual'], class: 'option-3'}
    ];
  }

  ionViewDidLoad() {
  }

  showTipsByCategory(categoryId: number) {
    this.selectCategoryService.setSelectedCategoryId(categoryId);
    /*this.showTestPage();*/
  }

  goToMenuPage() {
    this.navController.popToRoot();
  }

}
