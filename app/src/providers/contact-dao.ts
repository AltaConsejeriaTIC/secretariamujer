import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Contact} from 'ionic-native';
import {SecureStorage} from 'ionic-native';


@Injectable()
export class ContactDAO {
  constructor(public http: Http, private secureStorage: SecureStorage) {
    this.secureStorage.create('SofiApp').then(() => console.log('Storage is ready!'),
      error => console.log(error)
    );
  }

  saveContact(contact: Contact) {
    alert(contact.displayName);
  }
}
