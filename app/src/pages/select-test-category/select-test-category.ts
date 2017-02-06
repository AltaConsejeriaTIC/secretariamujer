import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TestPage} from "../test-page/test-page";
import { TestCategory } from "../../entity/test-categories"
import {TipData} from "../../entity/tip-data";

@Component({
  selector: 'page-select-test-category',
  templateUrl: './select-test-category.html'
})
export class SelectTestCategoryPage {
  testCategories: TestCategory[];
  tipsCategories: TipData[];


  constructor(public navController: NavController) {
    this.testCategories = [
      {id: 0, labels: ['Violencia', 'Económica'], class: 'option-0', RESTAddress:'preguntas-violencia-economica'},
      {id: 1, labels: ['Violencia', 'Física'], class: 'option-1', RESTAddress:'preguntas-violencia-fisica'},
      {id: 2, labels: ['Violencia', 'Psicológica'], class: 'option-2', RESTAddress:'preguntas-violencia-psicologica'},
      {id: 3, labels: ['Violencia', 'Sexual'], class: 'option-3', RESTAddress:'preguntas-violencia-sexual'}
    ];

    this.tipsCategories = [
      {id: 0, labels: ['Violencia', 'Económica'], class: 'option-0', RESTAddres: "economic_violence_tips_rest" },
      {id: 1, labels: ['Violencia', 'Física'], class: 'option-1', RESTAddres: "physical_violence_tips_rest"},
      {id: 2, labels: ['Violencia', 'Psicológica'], class: 'option-2', RESTAddres: "psychological_violence_tips_rest"},
      {id: 3, labels: ['Violencia', 'Sexual'], class: 'option-3', RESTAddres: "sexual_violence_tips_rest"}
    ];
  }

  ionViewDidLoad() {
  }

  beginTest(categoryId: number) {
    this.navController.push(TestPage,{selectedTestCategory:this.testCategories[categoryId], selectedTipCategory: this.tipsCategories[categoryId]});
  }

  goBackPage(){
    this.navController.pop();
  }

  goToMenuPage() {
    this.navController.popToRoot();
  }
}
