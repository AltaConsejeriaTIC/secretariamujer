import {Injectable} from '@angular/core';
import {IContact, Contact} from "../../entity/contact";

@Injectable()
export class ContactFactory {
  constructor() {
  }

  createContact(name?: string, phoneNumbers?: string[]): IContact {
    return new Contact(name, phoneNumbers);
  }
}
