import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertCreator } from "../../providers/alert-creator";
import { WelcomeTestPage } from "../welcome-test/welcome-test";
import { CallNumber, SMS } from 'ionic-native';
import { SettingsPage } from "../settings-page/settings-page";
import { SelectInfoCategoryPage } from "../select-info-category/select-info-category";
import { WarningMessageDAO } from "../../providers/warning-message-dao";
import { UserDAO } from "../../providers/user-dao";
import { UserService } from "../../providers/user-service";
import { Geolocation } from 'ionic-native';
import {MapLocationsPage} from "../map-locations/map-locations";
import {InAppBrowser} from "ionic-native"


@Component({
  selector: 'page-menu',
  templateUrl: './menu.html',
  animations: [
    trigger('menuItemHint', [
      state('hintVisible', style({ width: "50vw" })),
      state('hiddenHint', style({ width: "0vw" })),
      transition('hintVisible => hiddenHint', animate('100ms ease-in')),
      transition('hiddenHint => hintVisible', animate('100ms ease-out'))
    ]),
    trigger('iconGroup', [
      state('hintVisible', style({ width: "40vw", padding: "0 0 0 0" })),
      state('hiddenHint', style({ width: "85vw", padding: "0 0 0 15vw" })),
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
  locationWarning:string='';

  constructor(public navController: NavController, public alertCreator: AlertCreator,
    private warningMessageDAO: WarningMessageDAO, private userDAO: UserDAO, private userService: UserService) {
    this.menuOptions = [
      {
        id: 0,
        isShowingHint: false,
        label: 'Información',
        icon: 'icon-info',
        hint: ['SOFIApp te da la mano', 'para reconocer y exigir', 'tu derecho a vivir', 'sin violencias']
      },
      {
        id: 1,
        isShowingHint: false,
        label: 'Mapas',
        icon: 'icon-map',
        hint:  ['Ubica sitios a los', 'que puedes acudir', 'para la protección', 'de tus derechos']
      },
      {
        id: 2,
        isShowingHint: false,
        label: 'Test / Tips y rutas',
        icon: 'icon-test',
        hint:  ['Aquí identificas tu', 'situación y encuentras', 'información útil', 'sobre tus derechos']
      },
      {
        id: 3,
        isShowingHint: false,
        label: 'Configuración',
        icon: 'icon-conf',
        hint: ['Ingresa tus datos,', 'registra tus contactos de', 'emergencia y empieza', 'a utilizar SOFIApp']
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
        this.navController.push(MapLocationsPage);
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
    Geolocation.getCurrentPosition().then((resp) => {
      let urlCurrentPosition = ' Estoy en http://maps.google.com/maps?q='+resp.coords.latitude+','+resp.coords.longitude;
      this.beginSendingMessage(urlCurrentPosition);
      this.locationWarning=' con tu ubicación actual.';
    }).catch((error) => {
      if(error.code==1){
        this.locationWarning=" sin tu ubicación actual. Si deseas enviarlo con tu posición actual ve a la configuración de tu celular y otórgale permisos a SofiApp de Ubicación.";
        this.beginSendingMessage('');
      }
    });
  }

  private beginSendingMessage(currentPosition){
    let success = true;

    this.warningMessageDAO.get().subscribe(message => {
      this.sendMessage(message + currentPosition);
    }, err => {
      this.sendMessage('Ayuda, estoy en peligro por favor ayúdame' + currentPosition);
    });
  }

  private sendMessage(message: string) {
    let contacts = this.userService.user.contacts;

    if (contacts.length > 0) {
      this.sendMessageToContact(contacts, message, 0, '');
    } else {
      this.alertCreator.showSimpleAlert("Error", "No es posible enviar el mensaje. Por favor agregue contactos en la configuración de la aplicación");
    }
  }

  private sendMessageToContact(contacts, message, index, log) {
    let contact = contacts[index];
    let promise;
    let options = {
      replaceLineBreaks: false,
      android: {
        intent: ''
      }
    };

    if (contact != null && contact.cellPhone != null) {
      promise = SMS.send(contact.cellPhone, message, options).then(() => {
        log += contact.cellPhone + index < contacts.length - 1 ? ', ' : '';
        this.alertCreator.showSimpleAlert("Mensajes Enviados", "El mensaje ha sido enviado a: "+ contact.cellPhone + this.locationWarning);
        this.sendMessageToContact(contacts, message, index + 1, log);
      }, (error) => {
        this.alertCreator.showSimpleAlert("Mensaje", "No fue posible enviar el mensaje");
      });
    }

    if (log != '') {
      this.alertCreator.showSimpleAlert("Mensajes Enviados", "Los mensajes fueron enviados a " + log);
    }
  }
}
