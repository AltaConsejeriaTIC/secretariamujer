import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Contacts, Contact, IContactProperties} from 'ionic-native';
import {ContactDAO} from "../../providers/contact-dao";
import {MenuPage} from "../menu/menu";
import {IContact} from "../../entity/contact";
import {ContactAdapter} from "../../providers/contact-adapter";
import {AlertCreator} from "../../providers/alert-creator";


const MAX_CONTACTS = 5;


@Component({
  selector: 'page-contact',
  templateUrl: './contact.html'
})
export class ContactPage {
  contacts: IContact[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private contactAdapter: ContactAdapter,
              private contactDAO: ContactDAO, private alertCreator: AlertCreator) {
    this.initContacts();
  }

  ionViewDidLoad() {
    this.contactDAO.getContacts().then(contacts => {
      if (contacts != null) {
        this.parseContacts(contacts);
      }
    })
  }

  openContactList(index: number) {
    Contacts.pickContact().then((contactProperties: Contact) => {
      this.contacts[index] = this.contactAdapter.parseContact(contactProperties);
      this.contactDAO.saveContacts(this.contacts);
    }).catch(error => {
      this.handleError(error);
    });
  }


  initContacts() {
    this.contacts = new Array<IContact>(MAX_CONTACTS);
    this.contacts.fill({name: '', phoneNumbers: []});
  }

  parseContacts(contacts: any[]) {
    for (let i = 0; i < contacts.length; i++) {
      this.contacts[i] = contacts[i];
    }
  }

  goToMenuPage() {
    this.navCtrl.setRoot(MenuPage);
  }

  handleError(error) {
    switch ((<Error>error).name) {
      case 'InvalidContactPhoneNumberError':
        this.alertCreator.showCofirmationMessage('Contacto No Permitido', 'El contacto seleccionado no tiene ningun numero de telefono. Por favor seleccione otro');
        break;
    }
  }

}

export class InvalidContactError extends Error {
  constructor(message?: string) {
    super(message);
  }
}
