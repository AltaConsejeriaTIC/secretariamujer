import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {IContact} from "../entity/contact";


@Injectable()
export class ContactDAO {
  secureStorage: Storage;

  constructor(private storage: Storage) {
  }

  getContacts(): Promise<IContact[]> {
    return this.storage.get('UserContacts');
  }

  saveContacts(contacts: IContact[]) {
    this.storage.set('UserContacts', contacts);
  }
}
