import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {IUser} from "../../entity/user";
import {UserFactory} from "../user-factory";

@Injectable()
export class UserAdapter {

  constructor(private userFactory: UserFactory) {
  }

  adaptUserFromServer(userFromServer: any): IUser {
    let user = this.userFactory.createUser({
      id: userFromServer.uid,
      username: userFromServer.name,
      fullName: userFromServer.field_full_name,
      email: userFromServer.mail,
      cellPhone: userFromServer.field_cellphone,
      contacts: this.getContacts(userFromServer.field_contacts)
    });

    return user;
  }

  getContacts(contacts:string){
    let div=contacts.split("<pre><code>");
    let div2 = div[1].split("<\/code><\/pre>");
    let contactsString=div2[0];
    return JSON.parse(contactsString);
  }

  adaptUserToServer(user: IUser): any {
    let userInServer = {
      name: [{value: user.username}],
      mail: [{value: user.email}],
      roles: [{target_id: 'authenticated'}],
      status: [{value: true}],
      pass: user.password,
      field_cellphone: user.cellPhone,
      field_full_name: user.fullName,
      field_contacts: JSON.stringify(user.contacts)
    };

    return userInServer;
  }

  private getPropertyValue(property: any) {
    let value;

    if (property.length > 0 && property[0] != null) {
      value = property[0].value;
    }

    return value;
  }

  adaptContactsFromServer(contactsFromServer: string) {
    let contacts = contactsFromServer != null ? JSON.parse(contactsFromServer) : null;

    return contacts;
  }
}
