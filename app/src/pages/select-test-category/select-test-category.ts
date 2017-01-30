import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TestPage} from "../test-page/test-page";
import { TestCategory } from "../../entity/test-categories"

@Component({
  selector: 'page-select-test-category',
  templateUrl: './select-test-category.html'
})
export class SelectTestCategoryPage {
  testCategories: TestCategory[];

  constructor(public navController: NavController) {
    this.testCategories = [
      {id: 0, labels: ['Violencia', 'Económica'], class: 'option-0', RESTAddress:'preguntas-violencia-economica'},
      {id: 1, labels: ['Violencia', 'Física'], class: 'option-1', RESTAddress:'preguntas-violencia-fisica'},
      {id: 2, labels: ['Violencia', 'Psicológica'], class: 'option-2', RESTAddress:'preguntas-violencia-psicologica'},
      {id: 3, labels: ['Violencia', 'Sexual'], class: 'option-3', RESTAddress:'preguntas-violencia-sexual'}
    ];
  }

  ionViewDidLoad() {
  }

  beginTest(categoryId: number) {
    this.navController.push(TestPage,{selectedTestCategory:this.testCategories[categoryId]});
  }

  goToMenuPage() {
    this.navController.popToRoot();
  }
}
