import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TestPage} from "../test-page/test-page";
import { TestCategory } from "../../entity/test-categories"
import {TipData} from "../../entity/tip-data";
import {CategoryTitles} from "../../providers/category-titles";
import {AlertCreator} from "../../providers/alert-creator";

@Component({
  selector: 'page-select-test-category',
  templateUrl: './select-test-category.html'
})
export class SelectTestCategoryPage {
  testCategories: TestCategory[];
  tipsCategories: TipData[];


  constructor(public navController: NavController, public categoryTitles:CategoryTitles, public alertCreator:AlertCreator) {
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

    this.categoryTitles.getTitles().map(res => res.json()).subscribe(response => {
      this.testCategories[0].labels[0] = response[0].field_title_test1;
      this.testCategories[0].labels[1] = response[0].field_title_test1_line_2;
      this.testCategories[1].labels[0] = response[0].field_title_test2_line_1;
      this.testCategories[1].labels[1] = response[0].field_title_test2_line_2;
      this.testCategories[2].labels[0] = response[0].field_title_test3_line_1;
      this.testCategories[2].labels[1] = response[0].field_title_test3_line_2;
      this.testCategories[3].labels[0] = response[0].field_title_test4_line_1;
      this.testCategories[3].labels[1] = response[0].field_title_test4_line_2;

      this.tipsCategories[0].labels[0] = response[0].field_title_test1;
      this.tipsCategories[0].labels[1] = response[0].field_title_test1_line_2;
      this.tipsCategories[1].labels[0] = response[0].field_title_test2_line_1;
      this.tipsCategories[1].labels[1] = response[0].field_title_test2_line_2;
      this.tipsCategories[2].labels[0] = response[0].field_title_test3_line_1;
      this.tipsCategories[2].labels[1] = response[0].field_title_test3_line_2;
      this.tipsCategories[3].labels[0] = response[0].field_title_test4_line_1;
      this.tipsCategories[3].labels[1] = response[0].field_title_test4_line_2;

    }, err => {
      this.alertCreator.showSimpleAlert('Error','En este momento no es posible cargar las categorías, intentálo más tarde');
    });

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
