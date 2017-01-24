import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Contacts, Contact, IContactProperties} from 'ionic-native';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})

export class ContactPage {
  contacts: IContactProperties[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.contacts = [{}, {}, {}];
  }

  ionViewDidLoad() {
  }

  openContactList(index: number) {
    Contacts.pickContact().then((contact: Contact) => {
      alert(contact.displayName);
      alert(contact.phoneNumbers[0].value);
      alert(contact.phoneNumbers[1].value);
      alert(index);
      this.contacts[index] = contact;
    });
  }
}
