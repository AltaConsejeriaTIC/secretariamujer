import {Injectable} from '@angular/core';
import {IContactProperties} from "ionic-native";
import {IContact} from "../entity/contact";
import {ErrorFactory} from "./error-factory";
import {ContactFactory} from "./factory/contact-factory";

@Injectable()
export class ContactAdapter {
  constructor(private errorFactory: ErrorFactory, private contactFactory: ContactFactory) {
  }

  parseContact(contactProperties: IContactProperties): IContact {
    let name = this.parseName(contactProperties);
    let phoneNumber = this.parsePhoneNumber(contactProperties);

    return this.contactFactory.createContact(name, phoneNumber);
  }

  parseName(contactProperties) {
    return contactProperties.displayName != null ? contactProperties.displayName : this.parsePhoneNumber(contactProperties);
  }

  parsePhoneNumber(contactProperties): string {
    let phoneNumber: string;

    if (contactProperties.phoneNumber != null) {
      phoneNumber = contactProperties.phoneNumber[0].value;
    } else {
      throw this.errorFactory.createError('InvalidContactPhoneNumberError');
    }

    return phoneNumber;
  }
}
