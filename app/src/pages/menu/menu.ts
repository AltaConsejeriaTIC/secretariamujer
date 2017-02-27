import {Component, trigger, state, style, transition, animate} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AlertCreator} from "../../providers/alert-creator";
import {WelcomeTestPage} from "../welcome-test/welcome-test";
import {CallNumber, SMS} from 'ionic-native';
import {SettingsPage} from "../settings-page/settings-page";
import {SelectInfoCategoryPage} from "../select-info-category/select-info-category";
import {WarningMessageDAO} from "../../providers/warning-message-dao";
import {UserDAO} from "../../providers/user-dao";
import {UserService} from "../../providers/user-service";
import {MapPage} from "../map/map";

@Component({
  selector: 'page-menu',
  templateUrl: './menu.html',
  animations: [
    trigger('menuItemHint', [
      state('hintVisible', style({width: "50vw"})),
      state('hiddenHint', style({width: "0vw"})),
      transition('hintVisible => hiddenHint', animate('100ms ease-in')),
      transition('hiddenHint => hintVisible', animate('100ms ease-out'))
    ]),
    trigger('iconGroup', [
      state('hintVisible', style({width: "40vw", padding: "0 0 0 0"})),
      state('hiddenHint', style({width: "85vw", padding: "0 0 0 15vw"})),
      transition('hintVisible => hiddenHint', animate('100ms ease-out')),
      transition('hiddenHint => hintVisible', animate('100ms ease-in'))
    ]),
  ]
})
export class MenuPage {

  menuOptions: any[];
  items: any[] = [];
  arrowIcon: string[] = [];
  hintState: string[] = [];

  constructor(public navController: NavController, public alertCreator: AlertCreator,
              private warningMessageDAO: WarningMessageDAO, private userDAO: UserDAO, private userService:UserService) {
    this.menuOptions = [
      {
        id: 0,
        isShowingHint: false,
        label: 'Información',
        icon: 'icon-info',
        hint: ['Entérate sobre', 'la SDMU, SOFÍA', 'y SOFÍAPP']
      },
      {
        id: 1,
        isShowingHint: false,
        label: 'Mapas',
        icon: 'icon-map',
        hint: ['Reporta si te', 'sientes segura o insegura', 'en una zona de tu ciudad']
      },
      {
        id: 2,
        isShowingHint: false,
        label: 'Test / Tips y rutas',
        icon: 'icon-test',
        hint: ['Descubre', 'si estás en una', 'situación violenta']
      },
      {
        id: 3,
        isShowingHint: false,
        label: 'Configuración',
        icon: 'icon-conf',
        hint: ['Ingresa tus', 'datos para que SOFIA', 'te pueda ayudar']
      }
    ];
  }

  ionViewDidLoad() {
    this.setInitialIconAndHintState();
  }

  setInitialIconAndHintState() {
    for (let i = 0; i < this.menuOptions.length; i++) {
      this.arrowIcon.push("icon-border-question-mark");
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

  setIconAndHintState(itemNumber, isShowingHint) {
    this.hintState[itemNumber] = (isShowingHint) ? "hintVisible" : "hiddenHint";
    this.arrowIcon[itemNumber] = (isShowingHint) ? "icon-fill-question-mark" : "icon-border-question-mark";
  }

  goToPage(index: number) {
    switch (index) {
      case 0:
        this.navController.push(SelectInfoCategoryPage);
        break;
      case 1:
        this.navController.push(MapPage);
        break;
      case 2:
        this.navController.push(WelcomeTestPage);
        break;
      case 3:
        this.navController.push(SettingsPage);
        break;
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

  sendWarningMessages() {
    this.warningMessageDAO.get().subscribe(message => {
      console.log(this.userService.user.contacts);
      if(this.userService.user.contacts.length == 0){
        this.alertCreator.showSimpleAlert("Mensaje", "No tiene contactos agregados");
      }
      for (let contact of this.userService.user.contacts) {
        this.sendMessageToContact(contact, message);
      }
    }, err => {
      this.alertCreator.showSimpleAlert("Error", "No es posible enviar los mensajes en este momento");
    });
  }

  private sendMessageToContact(contact, message) {
    let options = {
      replaceLineBreaks: false,
      android: {
        intent: ''
      }
    };

    if (contact != null && contact.cellPhone != null) {

      SMS.send(contact.cellPhone, message, options)
        .then(()=>{
            this.alertCreator.showSimpleAlert("Mensaje", "El mensaje fue enviado a "+contact.cellPhone);
        },
        ()=>{
          this.alertCreator.showSimpleAlert("Mensaje", "No tiene saldo suficiente para enviar el mensaje");
        })
      ;

    }else{

      this.alertCreator.showSimpleAlert("Mensaje","No existen numeros para sus contactos");

    }
  }
}
