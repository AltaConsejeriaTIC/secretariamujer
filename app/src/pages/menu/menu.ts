import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Menu page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-menu',
  templateUrl: './menu.html'
})
export class MenuPage {

  menuOptions=[
    {
      isShowingHint:false,
      menuLabel:'Información',
      menuIcon:'../../assets/img/menu-icons/Info_Pictograma.png',
      menuHint:'¿Qué debo saber si me encuentro en una situación violenta?'
    },
    {
      isShowingHint:false,
      menuLabel:'Mapas y rutas',
      menuIcon:'../../assets/img/menu-icons/Mapa_Pictograma.png',
      menuHint:'¿A dónde puedo ir si estoy en una situación violenta?'
    },
    {
      isShowingHint:false,
      menuLabel:'Test y Tips',
      menuIcon:'../../assets/img/menu-icons/Test_Pictograma.png',
      menuHint:'¿Cómo puedo saber si estoy en una situación violenta?'
    },
    {
      isShowingHint:false,
      menuLabel:'Configuración',
      menuIcon:'../../assets/img/menu-icons/Configuracion_Pictograma.png',
      menuHint:'¿A quién puedo dar aviso si me encuentro en riesgo?'
    }
  ];


  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
  }

  toggleisShowingHintParameter(index){
    this.menuOptions[index].isShowingHint=!this.menuOptions[index].isShowingHint;
  }

}
