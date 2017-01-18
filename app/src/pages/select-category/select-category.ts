import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SelectCategoryService} from "../../providers/select-category-service";
import {TestPage} from "../test-page/test-page";
import {MenuPage} from "../menu/menu";

@Component({
  selector: 'page-select-category',
  templateUrl: './select-category.html'
})
export class SelectCategoryPage {
  constructor(public navController: NavController, public selectCategoryService: SelectCategoryService) {
  }

  ionViewDidLoad() {
  }

  selectCategory(categoryId: number) {
    this.selectCategoryService.setSelectedCategoryId(categoryId);
    this.navController.push(TestPage);
  }

  goToMenuPage() {
    this.navController.push(MenuPage);
  }
}
