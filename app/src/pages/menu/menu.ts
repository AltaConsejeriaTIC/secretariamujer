import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AlertCreator} from "../../providers/alert-creator";
import {TestPage} from "../test-page/test-page";

@Component({
  selector: 'page-menu',
  templateUrl: './menu.html'
})
export class MenuPage {

  menuOptions;

  constructor(public navCtrl: NavController, public alertCreator:AlertCreator) {
    this.menuOptions=[
      {
        isShowingHint:false,
        menuLabel:'Información',
        menuIcon:'assets/img/menu-icons/Info_Pictograma.png',
        menuHint:'¿Qué debo saber si me encuentro en una situación violenta?',
        goPage:function(){
         alertCreator.showSimpleAlert("Info","Ir a la página de info está en desarrollo");
        }
      },
      {
        isShowingHint:false,
        menuLabel:'Mapas',
        menuIcon:'assets/img/menu-icons/Mapa_Pictograma.png',
        menuHint:'¿A dónde puedo ir si estoy en una situación violenta?',
        goPage:function(){
          alertCreator.showSimpleAlert("Info","Ir a la página de Mapas y rutas esta en desarrollo");
        }
      },
      {
        isShowingHint:false,
        menuLabel:'Test / Tips y rutas',
        menuIcon:'assets/img/menu-icons/Test_Pictograma.png',
        menuHint:'¿Cómo puedo saber si estoy en una situación violenta?',
        goPage:function(){
          navCtrl.push(TestPage);
        }
      },
      {
        isShowingHint:false,
        menuLabel:'Configuración',
        menuIcon:'assets/img/menu-icons/Configuracion_Pictograma.png',
        menuHint:'¿A quién puedo dar aviso si me encuentro en riesgo?',
        goPage:function(){
          alertCreator.showSimpleAlert("Info","Ir a la página de Configuracion esta en desarrollo");
        }
      }
    ];
  }

  ionViewDidLoad() {
  }

  toggleisShowingHintParameter(index){
    for(let i=0; i<this.menuOptions.length; i++){
      if(index==i){
        this.menuOptions[index].isShowingHint=!this.menuOptions[index].isShowingHint;
      }else{
        this.menuOptions[i].isShowingHint=false;
      }
    }
  }

  makePhoneCall(){
    this.alertCreator.showSimpleAlert("Info","Hacer llamada esta en desarrollo");
  }

  sendMessage(){
    this.alertCreator.showSimpleAlert("Info","Enviar mensaje esta en desarrollo");
  }

}
