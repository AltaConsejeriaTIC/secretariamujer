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
      {id: 0, labels: ['El dinero no es', 'razón de control'], class: 'option-0', iconName: "icon-economic-violence", RESTAddress:'preguntas-violencia-economica'},
      {id: 1, labels: ['Las caricias', 'no duelen'], class: 'option-1', iconName: "icon-physical-violence", RESTAddress:'preguntas-violencia-fisica'},
      {id: 2, labels: ['Las palabras', 'también hieren'], class: 'option-2', iconName: "icon-psychological-violence", RESTAddress:'preguntas-violencia-psicologica'},
      {id: 3, labels: ['Hacer el amor', 'es cosa de iguales'], class: 'option-3', iconName: "icon-sexual-violence", RESTAddress:'preguntas-violencia-sexual'}
    ];

    this.tipsCategories = [
      {id: 0, labels: ['El dinero no es', 'razón de control'], class: 'option-0', iconName: "icon-economic-violence", RESTAddres: "economic_violence_tips_rest" },
      {id: 1, labels: ['Las caricias', 'no duelen'], class: 'option-1', iconName: "icon-physical-violence", RESTAddres: "physical_violence_tips_rest"},
      {id: 2, labels: ['Las palabras', 'también hieren'], class: 'option-2', iconName: "icon-psychological-violence", RESTAddres: "psychological_violence_tips_rest"},
      {id: 3, labels: ['Hacer el amor', 'es cosa de iguales'], class: 'option-3', iconName: "icon-sexual-violence", RESTAddres: "sexual_violence_tips_rest"}
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
