import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SelectCategoryService} from "../../providers/select-category-service";
import {TestPage} from "../test-page/test-page";


enum VIOLENCE_CATEGORIES {
  ECONOMICAL = 0,
  PHYSICAL = 1,
  PSYCOLOGICAL = 2,
  SEXUAL = 3
}

@Component({
  selector: 'page-select-category',
  templateUrl: './select-category.html'
})
export class SelectCategoryPage {
  TEST_CATEGORIES = VIOLENCE_CATEGORIES;

  constructor(public navController: NavController, public selectCategoryService: SelectCategoryService) {
  }

  ionViewDidLoad() {
  }

  beginTest(categoryId: VIOLENCE_CATEGORIES) {
    this.selectCategoryService.setSelectedCategoryId(categoryId);
    this.showTestPage();
  }

  private showTestPage() {
    this.navController.push(TestPage);
  }

  goToMenuPage() {
    this.navController.popToRoot();
  }
}
