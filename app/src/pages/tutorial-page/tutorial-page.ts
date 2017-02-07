import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-tutorial-page',
  templateUrl: 'tutorial-page.html'
})
export class TutorialPage {

  sliderOptions: any;
  tutorialItems: any[];

  constructor(public navCtrl: NavController) {
    this.sliderOptions = {
      pager: true
    };

    this.tutorialItems = [
      {image: "tutorial_1.png", label: 'Descubre si eres víctima de violencia de género por medio de la sección de Test'},
      {image: "tutorial_2.png", label: 'Encuentra lugares donde podrás recibir atención por parte de personal profesional y capacitado casos de violencia de género'},
      {image: "tutorial_3.png", label: 'Conoce y reporta los lugares más seguros de Bogotá en la sección de Mapa'},
      {image: "tutorial_4.png", label: 'Encuentra tips especialmente pensados en ti para afrontar situaciones de violencia de género'},
      {image: "tutorial_5.png", label: 'Activa el modo seguro y entra a la App digitando tu PIN en la calculadora y dandole en el igual'},
    ];
  }

  ionViewDidLoad() {
  }

  goToMenuPage() {
    this.navCtrl.popToRoot();
  }
}
