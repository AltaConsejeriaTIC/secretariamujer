import {Injectable} from '@angular/core';
import {IContactProperties} from "ionic-native";
import {IContact} from "../../entity/contact";
import {ErrorFactory} from "../factory/error-factory";
import {ContactFactory} from "../factory/contact-factory";

@Injectable()
export class ContactAdapter {
  constructor() {
  }

  adaptContact(contactProperties: IContactProperties): IContact {
    let name = this.adaptName(contactProperties);
    let phoneNumber = this.adaptPhoneNumber(contactProperties);

    return ContactFactory.createContact(name, phoneNumber);
  }

  adaptName(contactProperties) {
    let name;
    
    if (contactProperties.displayName != null) {
      name = contactProperties.displayName;
    } else if (contactProperties.name.formatted != null) {
      name = contactProperties.name.formatted;
    } else {
      name = this.adaptPhoneNumber(contactProperties);
    }

    return name;
  }

  adaptPhoneNumber(contactProperties): string {
    let phoneNumber: string;

    if (contactProperties.phoneNumbers != null) {
      phoneNumber = contactProperties.phoneNumbers[0].value;
    } else {
      ErrorFactory.fireError('InvalidContactPhoneNumberError');
    }

    return phoneNumber;
  }

  adaptContactFromServer(contactFromServer: any): IContact {
    let contact = ContactFactory.createContact(contactFromServer.name, contactFromServer.cellPhone);

    return contact;
  }

}
