import { Component } from '@angular/core';
import {NavController, NavParams, Loading, LoadingController} from 'ionic-angular';
import {TipsPage} from "../tips-page/tips-page";
import {TipData} from "../../entity/tip-data";
import {CategoryTitles} from "../../providers/category-titles";
import {AlertCreator} from "../../providers/alert-creator";
import {OfflineService} from "../../providers/offline-service";

@Component({
  selector: 'page-select-tips-category',
  templateUrl: './select-tips-category.html'
})
export class SelectTipsCategoryPage {
  tipsCategories: TipData[];
  loading: Loading;

  constructor(public navController: NavController, public categoryTitles:CategoryTitles, public alertCreator:AlertCreator, public loadingController: LoadingController, public offlineService:OfflineService) {
    this.tipsCategories = [
      {id: 0, labels: ['', ''], subtitle:'', class: 'option-0', iconName: "icon-economic-violence", RESTAddres: "economic_violence_tips_rest" },
      {id: 1, labels: ['', ''], subtitle:'', class: 'option-1', iconName: "icon-physical-violence", RESTAddres: "physical_violence_tips_rest"},
      {id: 2, labels: ['', ''], subtitle:'', class: 'option-2', iconName: "icon-psychological-violence", RESTAddres: "psychological_violence_tips_rest"},
      {id: 3, labels: ['', ''], subtitle:'', class: 'option-3', iconName: "icon-sexual-violence", RESTAddres: "sexual_violence_tips_rest"}
    ];

    this.loading = this.loadingController.create({
      content: "Espera un momento",
      dismissOnPageChange: true
    });

    this.loading.present();

    this.categoryTitles.getTitles().map(res => res.json()).subscribe(response => {
      this.setTipsCategories(response[0]);
      this.loading.dismiss();

    }, err => {
      this.alertCreator.showSimpleAlert('Info','En este momento no tienes conexión a internet, asegúrate de tener conexión para obtener los datos más recientes que Sofiapp tiene para tí.');
      this.setTipsCategories(JSON.parse(this.offlineService.getOfflineCategoriesTitles())[0]);
      this.loading.dismiss();

    });
  }

  ionViewDidLoad() {
  }

  private showTipsPage(categoryId: number) {
    this.navController.push(TipsPage,{selectedTipCategory:this.tipsCategories[categoryId]});
  }

  goBackPage(){
    this.navController.pop();
  }

  goToMenuPage() {
    this.navController.popToRoot();
  }

  setTipsCategories(response) {
    this.tipsCategories=this.categoryTitles.setTitles(this.tipsCategories, response);
  }


}
