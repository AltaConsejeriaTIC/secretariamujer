import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {HomePage} from "../pages/home/home";
import {TutorialPage} from "../pages/tutorial-page/tutorial-page";
import {Storage} from '@ionic/storage';


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
      this.rootPage = (isFirstTimeOpen || isFirstTimeOpen == null)? TutorialPage : HomePage;
    })

    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
