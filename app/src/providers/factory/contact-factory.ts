import {IContact, Contact} from "../../entity/contact";

export class ContactFactory {
  static createContact(name?: string, cellPhone?: string): IContact {
    return new Contact(name, cellPhone);
  }
}
