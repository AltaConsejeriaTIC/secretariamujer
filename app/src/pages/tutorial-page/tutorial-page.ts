import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-tutorial-page',
  templateUrl: 'tutorial-page.html'
})
export class TutorialPage {

  sliderOptions: any;

  constructor(public navCtrl: NavController) {
    this.sliderOptions = {
      pager: true
    };
  }

  ionViewDidLoad() {
    console.log('Hello TutorialPagePage Page');
  }

  goBackPage() {
    this.navCtrl.pop();
  }

}
