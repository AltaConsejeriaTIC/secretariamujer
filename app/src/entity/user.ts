import {Contact} from "./contact";
export interface IUser {
  pass: string,
  username: string,
  name: string,
  email: string,
  phone: string,
  contacts: Contact[]
}


export class User implements IUser {
  contacts: Contact[];
  pass: string;
  username: string;
  email: string;
  phone: string;
  name: string;


  constructor(name?: string, email?: string, phone?: string, username?: string, pass?: string, contacts?: Contact[]) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.username = username;
    this.pass = pass;
    this.contacts = contacts;
  }
}
