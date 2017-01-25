import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Contacts, Contact, IContactProperties, SecureStorage} from 'ionic-native';
import {ContactDAO} from "../../providers/contact-dao";

@Component({
  selector: 'page-contact',
  templateUrl: './contact.html'
})

export class ContactPage {
  contacts: IContactProperties[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private contactDAO: ContactDAO) {
    this.contacts = [{}, {}, {}];
  }

  ionViewDidLoad() {
  /*  let secureStorage: SecureStorage = new SecureStorage();
    secureStorage.create('SofiApp').then(() => alert('Storage is ready!'),
      error => console.log(error)
    );*/
  }

  openContactList(index: number) {
    Contacts.pickContact().then((contact: Contact) => {
      this.contacts[index] = contact;
      this.contactDAO.saveContact(contact);
    });
  }
}
