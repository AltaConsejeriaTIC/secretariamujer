import {Contact} from "./contact";
export interface IUser {
  id: string,
  password: string,
  username: string,
  fullName: string,
  email: string,
  cellPhone: string,
  contacts: Contact[]
}


export class User implements IUser {
  id: string;
  password: string;
  username: string;
  email: string;
  cellPhone: string;
  fullName: string;
  contacts: Contact[];


  constructor(name?: string, email?: string, phone?: string, username?: string, pass?: string, contacts?: Contact[]) {
    this.fullName = name;
    this.email = email;
    this.cellPhone = phone;
    this.username = username;
    this.password = pass;
    this.contacts = contacts || [];
  }

}
