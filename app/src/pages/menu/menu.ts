import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AlertCreator} from "../../providers/alert-creator";
import {WelcomeTestPage} from "../welcome-test/welcome-test";
import {CallNumber} from 'ionic-native';

@Component({
  selector: 'page-menu',
  templateUrl: './menu.html'
})
export class MenuPage {

  menuOptions: any[];

  constructor(public navController: NavController, public alertCreator: AlertCreator) {
    this.menuOptions = [
      {
        isShowingHint: false,
        label: 'Información',
        icon: 'home',
        hint: '¿Qué debo saber si me encuentro en una situación violenta?',
        goPage: function () {
          alertCreator.showSimpleAlert("Info", "Ir a la página de info está en desarrollo");
        }
      },
      {
        isShowingHint: false,
        label: 'Mapas',
        icon: 'compass',
        hint: '¿A dónde puedo ir si estoy en una situación violenta?',
        goPage: function () {
          alertCreator.showSimpleAlert("Info", "Ir a la página de Mapas y rutas esta en desarrollo");
        }
      },
      {
        isShowingHint: false,
        label: 'Test / Tips y rutas',
        icon: 'checkmark-circle',
        hint: '¿Cómo puedo saber si estoy en una situación violenta?',
        goPage: function () {
          navController.push(WelcomeTestPage);
        }
      },
      {
        isShowingHint: false,
        label: 'Configuración',
        icon: 'cog',
        hint: '¿A quién puedo dar aviso si me encuentro en riesgo?',
        goPage: function () {
          alertCreator.showSimpleAlert("Info", "Ir a la página de Configuracion esta en desarrollo");
        }
      }
    ];
  }

  ionViewDidLoad() {
  }

  toggleisShowingHintParameter(index) {
    for (let i = 0; i < this.menuOptions.length; i++) {
      if (index == i) {
        this.menuOptions[index].isShowingHint = !this.menuOptions[index].isShowingHint;
      } else {
        this.menuOptions[i].isShowingHint = false;
      }
    }
  }

  makePhoneCall() {
    CallNumber.callNumber('123', true)
      .then(() => {
      })
      .catch(() => {
        this.alertCreator.showSimpleAlert("Error", "No es posible hacer la llamada en este momento");
      });
  }

  sendMessage() {
    this.alertCreator.showSimpleAlert("Info", "Enviar mensaje esta en desarrollo");
  }

}
