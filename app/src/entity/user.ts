export interface IUser {
  pass: string,
  username: string,
  name:string,
  email: string,
  phone:string
}


export class User implements IUser {
  pass: string;
  username: string;
  email: string;
  phone: string;
  name: string;


  constructor(name?: string, email?: string, phone?: string, username?: string, pass?: string) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.username = username;
    this.pass = pass;
  }
}
