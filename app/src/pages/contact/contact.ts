import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Contacts, Contact} from 'ionic-native';
import {ContactDAO} from "../../providers/contact-dao";
import {MenuPage} from "../menu/menu";
import {IContact} from "../../entity/contact";
import {ContactAdapter} from "../../providers/contact-adapter";


const MAX_CONTACTS = 5;


@Component({
  selector: 'page-contact',
  templateUrl: './contact.html'
})
export class ContactPage {
  contacts: IContact[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private contactAdapter: ContactAdapter, private contactDAO: ContactDAO) {
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
      this.contacts[index] = this.contactAdapter.createContact(contactProperties);
      this.contactDAO.saveContacts(this.contacts);
    });
    //this.contacts[index].name = 'zumbambico' + index;
    //this.contactDAO.saveContacts(this.contacts);
  }


  initContacts() {
    this.contacts = new Array<IContact>(MAX_CONTACTS);

    for (let i = 0; i < MAX_CONTACTS; i++) {
      this.contacts[i] = <IContact>{};
    }
  }

  parseContacts(contacts: any[]) {
    for (let i = 0; i < contacts.length; i++) {
      this.contacts[i] = contacts[i];
    }
  }

  goToMenuPage() {
    this.navCtrl.setRoot(MenuPage);
  }
}
