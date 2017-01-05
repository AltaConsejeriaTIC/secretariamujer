import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Menu page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-menu',
  templateUrl: './menu.html'
})
export class MenuPage {

  isShowingInfoHint:boolean=false;
  isShowingMapAndRoutesHint:boolean=false;
  isShowingTestAndTipsHint:boolean=false;
  isShowingConfigHint:boolean=false;

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello MenuPage Page');
  }

  toggleHint(hint:string){
    switch (hint){
      case 'infoHint':
        this.isShowingInfoHint=!(this.isShowingInfoHint);
        break;
      case 'MapAndRoutesHint':
        this.isShowingMapAndRoutesHint=!(this.isShowingMapAndRoutesHint);
        break;
      case 'TestAndTips':
        this.isShowingTestAndTipsHint=!(this.isShowingTestAndTipsHint);
        break;
      case 'ConfigHint':
        this.isShowingConfigHint=!(this.isShowingConfigHint);
        break;
    }
  }

}
