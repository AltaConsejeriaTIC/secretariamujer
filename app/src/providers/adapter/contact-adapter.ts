import {Injectable} from '@angular/core';
import {IContactProperties} from "ionic-native";
import {IContact} from "../../entity/contact";
import {ErrorFactory} from "../factory/error-factory";
import {ContactFactory} from "../factory/contact-factory";

@Injectable()
export class ContactAdapter {
  constructor() {
  }

  parseContact(contactProperties: IContactProperties): IContact {
    let name = this.parseName(contactProperties);
    let phoneNumber = this.parsePhoneNumber(contactProperties);

    return ContactFactory.createContact(name, phoneNumber);
  }

  parseName(contactProperties) {
    return contactProperties.displayName != null ? contactProperties.displayName : this.parsePhoneNumber(contactProperties);
  }

  parsePhoneNumber(contactProperties): string {
    let phoneNumber: string;

    if (contactProperties.phoneNumbers != null) {
      phoneNumber = contactProperties.phoneNumbers[0].value;
    } else {
      ErrorFactory.fireError('InvalidContactPhoneNumberError');
    }

    return phoneNumber;
  }
}
