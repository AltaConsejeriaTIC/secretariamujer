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
      {label: 'SOFIApp te ayuda a prevenir las violencias y tiene información muy importante para ti. Responde los Test para identificar si estás en riesgo o estás siendo víctima de violencias.'},
      {label: 'En Test, tips y rutas puedes encontrar también datos de lugares en donde recibirás orientación y atención. También puedes marcar a la Línea Púrpura Distrital "Mujeres que escuchan mujeres".'},
      {label: 'Ingresa en contactos a personas de tu confianza, para enviarles un mensaje de texto presionando el botón de "Enviar Mensaje". No olvides informarles y repasa con ellos qué hacer en caso de peligro.'},
      {label: 'En caso de una emergencia, también puedes presionar el botón de llamar al 123, para marcar rápidamente a la línea y avisar a las autoridades de tu emergencia.'},
      {label: 'En la sección de configuración puedes completar tus datos, cambiar tu nombre en la aplicación o tu PIN y modificar los contactos de emergencia.'},
      {label: 'Ingresa y recuerda un PIN de 4 números y un nombre dentro de la aplicación. Cuando abras de nuevo SOFIApp, encontrarás una calculadora en la que debes ingresar tu PIN y el botón igual.'},
      {label: 'En la sección mapas puedes visualizar la ubicación de los diferentes puntos de atención.'},
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

