import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SelectCategoryService} from "../../providers/select-category-service";
import {TestPage} from "../test-page/test-page";
import { TestCategory } from "../../entity/test-categories"

@Component({
  selector: 'page-select-test-category',
  templateUrl: './select-test-category.html'
})
export class SelectTestCategoryPage {
  testCategories: TestCategory[];

  constructor(public navController: NavController, public selectCategoryService: SelectCategoryService) {
    this.testCategories = [
      {id: 0, labels: ['Violencia', 'Económica'], class: 'option-0'},
      {id: 1, labels: ['Violencia', 'Física'], class: 'option-1'},
      {id: 2, labels: ['Violencia', 'Psicológica'], class: 'option-2'},
      {id: 3, labels: ['Violencia', 'Sexual'], class: 'option-3'}
    ];
  }

  ionViewDidLoad() {
  }

  beginTest(categoryId: number) {
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
