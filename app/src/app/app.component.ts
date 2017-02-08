import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {HomePage} from "../pages/home/home";
import {TutorialPage} from "../pages/tutorial-page/tutorial-page";
import {Storage} from '@ionic/storage';
import {CalculatorPage} from "../pages/calculator/calculator";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;
  openState;

  constructor(platform: Platform, storage: Storage ) {
    storage.get('isFirstTimeOpen').then((isFirstTimeOpen) => {
      this.openState = (isFirstTimeOpen == null)? true : false;
      storage.set('isFirstTimeOpen', this.openState);

      if(isFirstTimeOpen || isFirstTimeOpen == null){
        this.rootPage=TutorialPage;
      }else{
        storage.get('islogged').then((isLogged) => {
         if(isLogged || isLogged!=null){
           this.rootPage=CalculatorPage;
         }else{
           storage.set('isFirstTimeOpen', true);
           this.rootPage=TutorialPage;
         }
        })
      }


    });

    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
