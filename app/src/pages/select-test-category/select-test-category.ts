import {Component} from '@angular/core';
import {NavController, Loading, LoadingController} from 'ionic-angular';
import {TestPage} from "../test-page/test-page";
import { TestCategory } from "../../entity/test-categories"
import {TipData} from "../../entity/tip-data";
import {CategoryTitles} from "../../providers/category-titles";
import {AlertCreator} from "../../providers/alert-creator";
import {OfflineService} from "../../providers/offline-service";

@Component({
  selector: 'page-select-test-category',
  templateUrl: './select-test-category.html'
})
export class SelectTestCategoryPage {
  testCategories: TestCategory[];
  tipsCategories: TipData[];
  loading: Loading;

  constructor(public navController: NavController, public categoryTitles: CategoryTitles, public alertCreator: AlertCreator, public loadingController: LoadingController, public offlineService:OfflineService) {
    this.testCategories = [
      {
        id: 0,
        labels: ['', ''],
        subtitle:'',
        class: 'option-0',
        iconName: "icon-economic-violence",
        RESTAddress: 'preguntas-violencia-economica'
      },
      {
        id: 1,
        labels: ['', ''],
        subtitle:'',
        class: 'option-1',
        iconName: "icon-physical-violence",
        RESTAddress: 'preguntas-violencia-fisica'
      },
      {
        id: 2,
        labels: ['', ''],
        subtitle:'',
        class: 'option-2',
        iconName: "icon-psychological-violence",
        RESTAddress: 'preguntas-violencia-psicologica'
      },
      {
        id: 3,
        labels: ['', ''],
        subtitle:'',
        class: 'option-3',
        iconName: "icon-sexual-violence",
        RESTAddress: 'preguntas-violencia-sexual'
      }
    ];

    this.tipsCategories = [
      {
        id: 0,
        labels: ['', ''],
        subtitle:'',
        class: 'option-0',
        iconName: "icon-economic-violence",
        RESTAddres: "economic_violence_tips_rest"
      },
      {
        id: 1,
        labels: ['', ''],
        subtitle:'',
        class: 'option-1',
        iconName: "icon-physical-violence",
        RESTAddres: "physical_violence_tips_rest"
      },
      {
        id: 2,
        labels: ['', ''],
        subtitle:'',
        class: 'option-2',
        iconName: "icon-psychological-violence",
        RESTAddres: "psychological_violence_tips_rest"
      },
      {
        id: 3,
        labels: ['', ''],
        subtitle:'',
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
      this.parseTestCategories(response[0]);

    }, err => {
      this.alertCreator.showSimpleAlert('Info','En este momento no tienes conexión a internet, asegúrate de tener conexión para obtener los datos más recientes que Sofiapp tiene para tí.');
      this.parseTestCategories(JSON.parse(this.offlineService.getOfflineCategoriesTitles())[0]);
    });
  }

  parseTestCategories(data){
    this.setTestCategories(data);
    this.setTipsCategories(data);
    this.loading.dismiss();
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
