import {Component} from '@angular/core';
import {NavController, Loading, LoadingController} from 'ionic-angular';
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
  loading: Loading;

  constructor(public navController: NavController, public categoryTitles: CategoryTitles, public alertCreator: AlertCreator, public loadingController: LoadingController) {
    this.testCategories = [
      {
        id: 0,
        labels: ['', ''],
        class: 'option-0',
        iconName: "icon-economic-violence",
        RESTAddress: 'preguntas-violencia-economica'
      },
      {
        id: 1,
        labels: ['', ''],
        class: 'option-1',
        iconName: "icon-physical-violence",
        RESTAddress: 'preguntas-violencia-fisica'
      },
      {
        id: 2,
        labels: ['', ''],
        class: 'option-2',
        iconName: "icon-psychological-violence",
        RESTAddress: 'preguntas-violencia-psicologica'
      },
      {
        id: 3,
        labels: ['', ''],
        class: 'option-3',
        iconName: "icon-sexual-violence",
        RESTAddress: 'preguntas-violencia-sexual'
      }
    ];

    this.tipsCategories = [
      {
        id: 0,
        labels: ['', ''],
        class: 'option-0',
        iconName: "icon-economic-violence",
        RESTAddres: "economic_violence_tips_rest"
      },
      {
        id: 1,
        labels: ['', ''],
        class: 'option-1',
        iconName: "icon-physical-violence",
        RESTAddres: "physical_violence_tips_rest"
      },
      {
        id: 2,
        labels: ['', ''],
        class: 'option-2',
        iconName: "icon-psychological-violence",
        RESTAddres: "psychological_violence_tips_rest"
      },
      {
        id: 3,
        labels: ['', ''],
        class: 'option-3',
        iconName: "icon-sexual-violence",
        RESTAddres: "sexual_violence_tips_rest"
      }
    ];

    this.loading = this.loadingController.create({
      content: "Espera un momento",
      dismissOnPageChange: true
    });

    this.loading.present();

    this.categoryTitles.getTitles().map(res => res.json()).subscribe(response => {
      this.setTestCategories(response[0]);
      this.setTipsCategories(response[0]);
      this.loading.dismiss();

    }, err => {
      this.alertCreator.showSimpleAlert('Error', 'En este momento no es posible cargar las categorías, intentálo más tarde');
      this.loading.dismiss();

    });
  }

  ionViewDidLoad() {
  }

  beginTest(categoryId: number) {
    this.navController.push(TestPage, {
      selectedTestCategory: this.testCategories[categoryId],
      selectedTipCategory: this.tipsCategories[categoryId]
    });
  }

  goBackPage() {
    this.navController.pop();
  }

  goToMenuPage() {
    this.navController.popToRoot();
  }

  setTestCategories(response) {
    this.testCategories=this.categoryTitles.setTitles(this.testCategories, response);
  }

  setTipsCategories(response) {
    this.tipsCategories=this.categoryTitles.setTitles(this.tipsCategories, response);
  }
}
