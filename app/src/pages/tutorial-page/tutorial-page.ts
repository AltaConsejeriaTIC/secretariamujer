import { Storage } from '@ionic/storage';
import { NavController, Slides } from 'ionic-angular';
import { Component, ViewChild } from "@angular/core";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-tutorial-page',
  templateUrl: 'tutorial-page.html'
})
export class TutorialPage {
  @ViewChild('mySlider') slider: Slides;

  sliderOptions: any;
  tutorialItems: any[];
  tutorialBackgrounds: string[] = [];
  isVisibleButton: boolean;
  buttonLabel: string;

  constructor(public navCtrl: NavController, public storage: Storage) {
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
    this.setButtonVisibilityAndLabel();
  }

  setTutorialBackgroundImages() {
    for (let i = 0; i < this.tutorialItems.length; i++) {
      this.tutorialBackgrounds.push(this.getURLImage(i+1));
    }
  }

  setButtonVisibilityAndLabel() {
    this.storage.get('isFirstTimeOpen').then((isFirstTimeOpen) => {
      this.isVisibleButton = this.isFirstTimeOpenOrEmpty(isFirstTimeOpen)? false: true;
      this.buttonLabel = this.isFirstTimeOpenOrEmpty(isFirstTimeOpen)? "Finalizar" : "Omitir";
    })
  }

  getURLImage(imageNumber):string {
    return 'url(assets/img/tutorial_images/tutorial_'+ imageNumber + '.png)';
  }

  goToMenuPage() {
    this.storage.get('isFirstTimeOpen').then((isFirstTimeOpen) => {
      if (this.isFirstTimeOpenOrEmpty(isFirstTimeOpen)) {
        this.storage.set('isFirstTimeOpen', false);
        this.navCtrl.setRoot(HomePage);
      }
      else {
        this.navCtrl.pop();
      }
    })
  }

  onSlideChanged() {
    this.storage.get('isFirstTimeOpen').then((isFirstTimeOpen) => {
      if (this.isFirstTimeOpenOrEmpty(isFirstTimeOpen)) {
        this.isVisibleButton = (this.isTheLastSlideVisible(this.slider.getActiveIndex() + 1, this.tutorialItems.length))? true : false;
      }
    })
  }

  isFirstTimeOpenOrEmpty(isFirstTimeOpen) {
    return isFirstTimeOpen || isFirstTimeOpen == null;
  }

  isTheLastSlideVisible(currentSlide, lastSlidePosition){
    return currentSlide == lastSlidePosition;
  }
}
