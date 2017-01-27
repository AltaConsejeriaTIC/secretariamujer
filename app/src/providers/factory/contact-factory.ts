import {Injectable} from '@angular/core';
import {IContact, Contact} from "../../entity/contact";

@Injectable()
export class ContactFactory {
  constructor() {
  }

  createContact(name?: string, phoneNumber?: string): IContact {
    return new Contact(name, phoneNumber);
  }
}
