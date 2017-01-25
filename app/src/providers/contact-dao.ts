import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Contact, IContactProperties} from 'ionic-native';
import {Storage} from '@ionic/storage';


@Injectable()
export class ContactDAO {
  secureStorage: Storage;

  constructor(private storage: Storage) {
  }

  getContacts(): Promise<IContactProperties[]> {
    return this.storage.get('UserContacts');
  }

  saveContacts(contact: IContactProperties[]) {
    this.storage.set('UserContacts', contact);
  }
}
