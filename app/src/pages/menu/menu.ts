import {Component, trigger,state, style, transition, animate } from '@angular/core';
import {NavController} from 'ionic-angular';
import {AlertCreator} from "../../providers/alert-creator";
import {WelcomeTestPage} from "../welcome-test/welcome-test";
import {CallNumber} from 'ionic-native';
import {SettingsPage} from "../settings-page/settings-page";

@Component({
  selector: 'page-menu',
  templateUrl: './menu.html',
  animations: [
    trigger('menuItemHint', [
      state('hintVisible', style({width:"50vw"})),
      state('hiddenHint', style({width:"0vw"} )),
      transition('hintVisible => hiddenHint', animate('100ms ease-in')),
      transition('hiddenHint => hintVisible', animate('100ms ease-out'))
    ]),
    trigger('iconGroup', [
      state('hintVisible', style({width:"40vw", padding: "0 0 0 0"})),
      state('hiddenHint', style({width: "85vw", padding: "0 0 0 18vw"} )),
      transition('hintVisible => hiddenHint', animate('100ms ease-out')),
      transition('hiddenHint => hintVisible', animate('100ms ease-in'))
    ]),
  ]
})
export class MenuPage {

  menuOptions: any[];
  items: any[] = [];
  arrowIcon:string[]= [];
  hintState:string[]= [];

  constructor(public navController: NavController, public alertCreator: AlertCreator) {
    this.menuOptions = [
      {
        isShowingHint: false,
        label: 'Información',
        icon: 'icon-info',
        hint:  ['¿Qué debo saber si', 'me encuentro en una', 'situación violenta?'],
        goPage: function () {
          alertCreator.showSimpleAlert("Info", "Ir a la página de info está en desarrollo");
        }
      },
      {
        isShowingHint: false,
        label: 'Mapas',
        icon: 'icon-map',
        hint:  ['¿A dónde puedo ir', 'si estoy en una', 'situación violenta?'],
        goPage: function () {
          alertCreator.showSimpleAlert("Info", "Ir a la página de Mapas y rutas esta en desarrollo");
        }
      },
      {
        isShowingHint: false,
        label: 'Test / Tips y rutas',
        icon: 'icon-test',
        hint:  ['¿Cómo puedo saber', 'si estoy en una', 'situación violenta?'],
        goPage: function () {
          navController.push(WelcomeTestPage);
        }
      },
      {
        isShowingHint: false,
        label: 'Configuración',
        icon: 'icon-conf',
        hint:  ['¿A quién puedo dar', 'aviso si me encuentro', 'en riesgo?'],
        goPage: function () {
          navController.push(SettingsPage);
        }
      }
    ];
  }

  ionViewDidLoad() {
    this.setInitialIconAndHintState();
  }

  setInitialIconAndHintState() {
    for (let i = 0; i < this.menuOptions.length; i++) {
      this.arrowIcon.push("icon-border-next-arrow");
      this.hintState.push("hiddenHint");
    }
  }

  toggleisShowingHintParameter(index) {
    for (let i = 0; i < this.menuOptions.length; i++) {
      if (index == i) {
        this.menuOptions[index].isShowingHint = !this.menuOptions[index].isShowingHint;
        this.setIconAndHintState(index, this.menuOptions[index].isShowingHint);
      } else {
        this.menuOptions[i].isShowingHint = false;
        this.setIconAndHintState(i, this.menuOptions[i].isShowingHint);
      }
    }
  }

  setIconAndHintState(itemNumber, isShowingHint){
    this.hintState[itemNumber] = (isShowingHint)? "hintVisible" : "hiddenHint";
    this.arrowIcon[itemNumber] = (isShowingHint)? "icon-fill-back-arrow" : "icon-border-next-arrow";
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
