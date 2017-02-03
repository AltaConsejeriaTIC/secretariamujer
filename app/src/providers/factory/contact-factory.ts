import {Injectable} from '@angular/core';
import {IContact, Contact} from "../../entity/contact";

export class ContactFactory {
  static createContact(name?: string, phoneNumber?: string): IContact {
    return new Contact(name, phoneNumber);
  }
}
