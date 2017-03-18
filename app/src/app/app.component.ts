import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {HomePage} from "../pages/home/home";
import {TutorialPage} from "../pages/tutorial-page/tutorial-page";
import {Storage} from '@ionic/storage';
import {CalculatorPage} from "../pages/calculator/calculator";
import { File } from 'ionic-native';
declare var cordova:any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;
  openState;
  dataDirectory: string;


  constructor(public platform: Platform, public storage: Storage) {
    this.platform.ready().then(() => {
      this.hideStatusBarOnIOS(this.platform);
      this.getStoredData();
    });

    this.platform.resume.subscribe((event) => {
      this.hideStatusBarOnIOS(this.platform);
    });

  }

  private getStoredData() {
    this.dataDirectory=cordova.file.dataDirectory;
    this.storage.get('isFirstTimeOpen').then((isFirstTimeOpen) => {
      this.openState = isFirstTimeOpen == null || isFirstTimeOpen == true;
      this.storage.set('isFirstTimeOpen', this.openState);
      this.checkIfFirstTimeOpen(isFirstTimeOpen);
    });
  }

  private hideStatusBarOnIOS(platform: Platform) {
    if (platform.is('ios')) {
      StatusBar.hide();
    }
  }

  checkIfFirstTimeOpen(isFirstTimeOpen: boolean) {
    if (isFirstTimeOpen || isFirstTimeOpen == null) {
      this.createOfflineFiles();
    } else {
      this.storage.get('islogged').then((isLogged) => {
        this.checkIfUserIsLogged(isLogged);
      })
    }
  }

  createOfflineFiles(){
    Promise.all([
      File.createFile(this.dataDirectory, 'categoriesTitles.txt', true),
      File.createFile(this.dataDirectory, 'testOneQuestions.txt', true),
      File.createFile(this.dataDirectory, 'testTwoQuestions.txt', true),
      File.createFile(this.dataDirectory, 'testThreeQuestions.txt', true),
      File.createFile(this.dataDirectory, 'testFourQuestions.txt', true)
    ]).then(()=>{
      this.goToRootPage();
    }).catch(()=>{
      this.goToRootPage();
    })
  }

  goToRootPage(){
    this.hideSplashScreen();
    this.rootPage = TutorialPage;
  }

  checkIfUserIsLogged(isLogged: boolean) {
    if (isLogged || isLogged != null) {
      this.hideSplashScreen();
      this.rootPage = CalculatorPage;
    } else {
      this.storage.set('isFirstTimeOpen', true);
      this.hideSplashScreen();
      this.rootPage = TutorialPage;
    }
  }

  hideSplashScreen() {
    StatusBar.styleDefault();
    Splashscreen.hide();
  }

}
