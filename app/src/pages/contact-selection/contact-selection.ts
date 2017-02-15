import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Contacts, Contact, IContactProperties} from 'ionic-native';
import {MenuPage} from "../menu/menu";
import {IContact} from "../../entity/contact";
import {ContactAdapter} from "../../providers/adapter/contact-adapter";
import {AlertCreator} from "../../providers/alert-creator";
import {ContactFactory} from "../../providers/factory/contact-factory";
import {UserDAO} from "../../providers/user-dao";
import {UserService} from "../../providers/user-service";


const MAX_CONTACTS = 3;


@Component({
  selector: 'page-contact-selection',
  templateUrl: './contact-selection.html'
})
export class ContactSelectionPage {
  contacts: IContact[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private contactAdapter: ContactAdapter,
              private userDAO: UserDAO, private alertCreator: AlertCreator, private userService: UserService) {
    this.initContacts();
  }

  ionViewDidLoad() {
  }

  private initContacts() {
    this.contacts = new Array<IContact>(MAX_CONTACTS);
    this.loadSavedContacts();
  }

  private loadSavedContacts() {
    for (let i = 0; i < MAX_CONTACTS; i++) {
      let contact = this.userService.user.contacts != null ? this.userService.user.contacts[i] : null;

      this.contacts[i] = contact != null ? contact : ContactFactory.createContact();
    }
  }

  selectContactFromDevice(index: number) {
    Contacts.pickContact().then((contactProperties: Contact) => {
      this.addContact(index, contactProperties);
    }).catch(error => {
      this.handleError(error);
    });
  }

  private addContact(index: number, contactProperties: IContactProperties) {
    this.contacts[index] = this.contactAdapter.adaptContact(contactProperties);
    this.userService.user.contacts[index] = this.contacts[index];
    this.userDAO.update().subscribe(response => {
      this.alertCreator.showCofirmationMessage('Contacto Guardado', 'Contacto guardado exitosamente');
    }, error => {
      this.alertCreator.showCofirmationMessage('Error', 'No es posible guardar el contacto en este momento');
    })
  }

  private handleError(error) {
    switch ((<Error>error).name) {
      case 'InvalidContactPhoneNumberError':
        this.alertCreator.showCofirmationMessage('Contacto No Permitido', 'El contacto seleccionado no tiene ningun numero de telefono. Por favor seleccione otro');
        break;
    }
  }

  goToMenuPage() {
    this.navCtrl.setRoot(MenuPage);
  }
}
