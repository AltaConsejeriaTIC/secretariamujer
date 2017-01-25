import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {IContactProperties} from 'ionic-native';
import {ContactDAO} from "../../providers/contact-dao";
import {MenuPage} from "../menu/menu";


const MAX_CONTACTS = 5;


@Component({
  selector: 'page-contact',
  templateUrl: './contact.html'
})
export class ContactPage {
  contacts: IContactProperties[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private contactDAO: ContactDAO) {
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
    /*Contacts.pickContact().then((contact: Contact) => {
     this.contacts[index] = {'displayName': contact.displayName, 'phoneNumbers': contact.phoneNumbers};
     this.contactDAO.saveContacts(this.contacts);
     });*/
    this.contacts[index] = {displayName: 'Zumbambico' + index};
    this.contactDAO.saveContacts(this.contacts);
  }


  initContacts() {
    this.contacts = new Array<{displayName: '', 'phoneNumbers': Array<number>}>();

    for (let i = 0; i < MAX_CONTACTS; i++) {
      this.contacts[i] = {displayName: '', 'phoneNumbers': []};
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
