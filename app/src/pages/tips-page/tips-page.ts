import {Component} from '@angular/core';
import {NavController, NavParams, Loading, LoadingController} from 'ionic-angular';
import {Http} from "@angular/http";
import {TipsInfo} from "../../entity/tips-info";
import {TipData} from "../../entity/tip-data";
import {ApplicationConfig} from "../../config";
import {AlertCreator} from "../../providers/alert-creator";
import {OfflineService} from "../../providers/offline-service";

@Component({
  selector: 'page-tips-page',
  templateUrl: './tips-page.html'
})
export class TipsPage {
  tipsClass: string = "";
  tipsClasses: string [] = ['economic-violence-style', 'physical-violence-style', 'psychological-violence-style', 'sexual-violence-style'];
  tipsArrayByCategory: TipsInfo[];
  categoryTitle: string = "";
  isTipVisible: boolean[] = [];
  arrowIconArray: string[] = [];
  selectedTipCategory: TipData;
  loading: Loading;


  constructor(public navController: NavController, public navParams: NavParams, public http: Http, public alertCreator: AlertCreator, public loadingController: LoadingController, public offlineService:OfflineService) {
    this.selectedTipCategory = this.navParams.get('selectedTipCategory');
    this.tipsClass = this.tipsClasses[this.selectedTipCategory.id];
    this.categoryTitle = this.getCategoryTitle();
    this.loading = this.loadingController.create({
      content: "Espera un momento",
      dismissOnPageChange: true
    });

    this.loading.present();
    this.getTips();
  }

  getCategoryTitle() {
    let categoryTitle = "";
    for (let i = 0; i < this.selectedTipCategory.labels.length; i++) {
      categoryTitle += this.selectedTipCategory.labels[i] + " ";
    }
    return categoryTitle;
  }

  ionViewDidLoad() {

  }

  getTips() {
    let RESTAddress = this.selectedTipCategory.RESTAddres;
    let url = ApplicationConfig.getURL('/' + RESTAddress + '?_format=json');

    this.http.get(url).map(res => res.json()).subscribe(response => {
      this.setTips(response);
      console.log("la respuesta", this.tipsArrayByCategory);
    }, err => {
      console.log("el error", err);
      this.alertCreator.showSimpleAlert('Info','Recuerda conectarte a internet para obtener los tips más recientes');
      this.loadOfflineTips(this.selectedTipCategory.RESTAddres);
    });
  }

  setTips(data){
    this.tipsArrayByCategory = data;
    this.setInitialTipState();
    this.loading.dismiss();
  }

  loadOfflineTips(RESTAddress){
    let offlineTipsQuestionsFile:string =this.getOfflineTipsFile(RESTAddress);

    this.offlineService.readAsText(offlineTipsQuestionsFile).then((data)=>{
      this.setTips(JSON.parse(data.toString()));
    });
  }

  getOfflineTipsFile(RESTAddress){
    switch(RESTAddress){
      case 'economic_violence_tips_rest':
        return 'tipsOne.txt';
      case 'physical_violence_tips_rest':
        return 'tipsTwo.txt';
      case 'psychological_violence_tips_rest':
        return 'tipsThree.txt';
      case 'sexual_violence_tips_rest':
        return 'tipsFour.txt';
    }
  }

  setInitialTipState() {
    for (let i = 0; i < this.tipsArrayByCategory.length; i++) {
      this.isTipVisible.push(false);
      this.arrowIconArray.push("icon-border-down-arrow");
    }
  }

  toggleisShowingTipParameter(index) {
    for (let i = 0; i < this.tipsArrayByCategory.length; i++) {
      this.isTipVisible[i] = (index == i) ? !this.isTipVisible[index] : false;
      this.setTipState(i, this.isTipVisible[i]);
    }
  }

  setTipState(tipNumber, tipState) {
    this.arrowIconArray[tipNumber] = (tipState) ? "icon-fill-up-arrow" : "icon-border-down-arrow";
  }

  goBackPage() {
    this.navController.pop();
  }

  goToMenuPage() {
    this.navController.popToRoot();
  }

}
