import {Injectable} from '@angular/core';
import {IContactProperties} from "ionic-native";
import {IContact} from "../entity/contact";
import {ErrorFactory} from "./error-factory";

@Injectable()
export class ContactAdapter {
  constructor(private errorFactory: ErrorFactory) {
  }

  parseContact(contactProperties: IContactProperties): IContact {
    let contact = {name: '', phoneNumbers: []};

    contact.name = this.parseName(contactProperties);
    contact.phoneNumbers = this.parsePhoneNumbers(contactProperties);

    return contact;
  }

  parseName(contactProperties) {
    return contactProperties.displayName != null ? contactProperties.displayName : this.parsePhoneNumbers(contactProperties)[0];
  }

  parsePhoneNumbers(contactProperties): string[] {
    let phoneNumbers: string[] = [];

    if (contactProperties.phoneNumbers != null) {
      for (let phoneNumber of contactProperties.phoneNumbers) {
        phoneNumbers.push(phoneNumber.value);
      }
    } else {
      throw this.errorFactory.createError('InvalidContactPhoneNumberError');
    }

    return phoneNumbers;
  }
}
