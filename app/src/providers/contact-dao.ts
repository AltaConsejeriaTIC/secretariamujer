import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Contact, SecureStorage} from 'ionic-native';
import {Storage} from '@ionic/storage';


@Injectable()
export class ContactDAO {
  secureStorage: SecureStorage;

  constructor(public http: Http) {
    this.secureStorage = new SecureStorage();
  }

  saveContact(contact: Contact) {
    this.secureStorage.create('SofiApp').then(() => alert('Storage is ready!'),
      error => alert(error)
    );
    alert(contact.displayName);
  }
}
