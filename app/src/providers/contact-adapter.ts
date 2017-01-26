import {Injectable} from '@angular/core';
import {IContactProperties} from "ionic-native";
import {IContact} from "../entity/contact";

@Injectable()
export class ContactAdapter {
  constructor() {

  }

  createContact(contactProperties: IContactProperties): IContact {
    let contact: IContact;

    contact.name = contactProperties.displayName;

    for (let phoneNumber of contactProperties.phoneNumbers) {
      contact.phoneNumbers.push(phoneNumber.value);
    }

    return contact;
  }
}
