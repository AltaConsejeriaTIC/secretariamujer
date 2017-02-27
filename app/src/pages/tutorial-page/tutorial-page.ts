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
  isDisabledButton: boolean;
  buttonLabel: string;
  isFirstTimeOpen:boolean;

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

    this.isDisabledButton=false;
  }

  ionViewDidLoad() {
    this.setTutorialBackgroundImages();
    this.setButtonVisibilityAndLabel();
  }

  setTutorialBackgroundImages() {
    for (let i = 0; i < this.tutorialItems.length; i++) {
      this.tutorialBackgrounds.push(this.getURLImage(i+1));
    }
    this.quitMapTutorialImage();
  }

  quitMapTutorialImage() {
    this.tutorialItems.splice(2, 1);
    this.tutorialBackgrounds.splice(2, 1);
  }

  setButtonVisibilityAndLabel() {
    this.storage.get('isFirstTimeOpen').then((isFirstTimeOpen) => {
      this.isFirstTimeOpen=isFirstTimeOpen;
      if(isFirstTimeOpen){
        this.setFirstTimeOpenStyles();
      }else{
        this.setSkipLabel();
      }
    })
  }

  setFirstTimeOpenStyles(){
    this.isDisabledButton=true;
    this.buttonLabel = "Finalizar";
  }

  setSkipLabel(){
    this.buttonLabel = "Omitir";
  }

  getURLImage(imageNumber):string {
    return 'url(assets/img/tutorial_images/tutorial_'+ imageNumber + '.png)';
  }

  goToMenuPage() {
    if(this.isFirstTimeOpenOrEmpty(this.isFirstTimeOpen)){
      this.storage.set('isFirstTimeOpen', false);
      this.navCtrl.setRoot(HomePage);
    }else{
      this.navCtrl.pop();
    }
  }

  onSlideChanged() {
    let isLastSlide:boolean=this.isTheLastSlideVisible(this.slider.getActiveIndex() + 1, this.tutorialItems.length);
    if(this.isFirstTimeOpen){
      this.setLastSlideStyles(isLastSlide);
    }
  }

  setLastSlideStyles(isLastSlide:boolean){
    this.isDisabledButton=!isLastSlide;
  }

  isFirstTimeOpenOrEmpty(isFirstTimeOpen) {
    return isFirstTimeOpen || isFirstTimeOpen == null;
  }

  isTheLastSlideVisible(currentSlide, lastSlidePosition){
    return currentSlide == lastSlidePosition;
  }
}

