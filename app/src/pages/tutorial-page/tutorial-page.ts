import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-tutorial-page',
  templateUrl: 'tutorial-page.html'
})
export class TutorialPage {

  sliderOptions: any;
  tutorialItems: any[];
  tutorialBackgrounds: string[] = [];

  constructor(public navCtrl: NavController) {
    this.sliderOptions = {
      pager: true
    };

    this.tutorialItems = [
      {label: 'Descubre si eres víctima de violencia de género por medio de la sección de Test'},
      {label: 'Encuentra lugares donde podrás recibir atención por parte de personal profesional y capacitado casos de violencia de género'},
      {label: 'Conoce y reporta los lugares más seguros de Bogotá en la sección de Mapa'},
      {label: 'Encuentra tips especialmente pensados en ti para afrontar situaciones de violencia de género'},
      {label: 'Activa el modo seguro y entra a la App digitando tu PIN en la calculadora y dandole en el igual'},
    ];
  }

  ionViewDidLoad() {
    this.setTutorialBackgroundImages();
  }

  setTutorialBackgroundImages() {
    for (let i = 0; i < this.tutorialItems.length; i++) {
      this.tutorialBackgrounds.push(this.getURLImage(i+1));
    }
  }

  getURLImage(imageNumber):string {
    return 'url(../assets/img/tutorial_images/tutorial_'+ imageNumber + '.png)';
  }

  goToMenuPage() {
    this.navCtrl.popToRoot();
  }
}
