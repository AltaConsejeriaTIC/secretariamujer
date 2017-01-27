import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Contacts, Contact} from 'ionic-native';
import {ContactDAO} from "../../providers/contact-dao";
import {MenuPage} from "../menu/menu";
import {IContact} from "../../entity/contact";
import {ContactAdapter} from "../../providers/contact-adapter";
import {AlertCreator} from "../../providers/alert-creator";
import {ContactFactory} from "../../providers/factory/contact-factory";


const MAX_CONTACTS = 5;


@Component({
  selector: 'page-contact-selection',
  templateUrl: 'contact-selection.html'
})
export class ContactSelectionPage {
  contacts: IContact[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private contactAdapter: ContactAdapter,
              private contactDAO: ContactDAO, private alertCreator: AlertCreator, private contactFactory: ContactFactory) {
    this.initContacts();
  }

  private initContacts() {
    this.contacts = new Array<IContact>(MAX_CONTACTS);
    this.contacts.fill(this.contactFactory.createContact());
  }

  ionViewDidLoad() {
    this.loadSavedContacts();
  }

  private loadSavedContacts() {
    this.contactDAO.getContacts().then(contacts => {
      if (contacts != null) {
        this.contacts = contacts;
      }
    });
  }

  openContactList(index: number) {
    Contacts.pickContact().then((contactProperties: Contact) => {
      this.contacts[index] = this.contactAdapter.parseContact(contactProperties);
      this.contactDAO.saveContacts(this.contacts);
    }).catch(error => {
      this.handleError(error);
    });
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
