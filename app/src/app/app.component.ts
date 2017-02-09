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

  constructor(public platform: Platform, public storage: Storage ) {
    storage.get('isFirstTimeOpen').then((isFirstTimeOpen) => {
      this.openState = (isFirstTimeOpen == null)? true : false;
      storage.set('isFirstTimeOpen', this.openState);
      this.checkIfFirstTimeOpen(isFirstTimeOpen);
    });
  }

  checkIfFirstTimeOpen(isFirstTimeOpen:boolean){
    if(isFirstTimeOpen || isFirstTimeOpen == null){
      this.hideSplashScreen();
      this.rootPage=TutorialPage;
    }else{
      this.storage.get('islogged').then((isLogged) => {
        this.checkIfUserIsLogged(isLogged);
      })
    }
  }

  checkIfUserIsLogged(isLogged:boolean){
    if(isLogged || isLogged!=null){
      this.hideSplashScreen();
      this.rootPage=CalculatorPage;
    }else{
      this.storage.set('isFirstTimeOpen', true);
      this.hideSplashScreen();
      this.rootPage=TutorialPage;
    }
  }

  hideSplashScreen(){
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

}
