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
      id: this.getPropertyValue(userFromServer.uid),
      username: this.getPropertyValue(userFromServer.name),
      fullName: this.getPropertyValue(userFromServer.field_full_name),
      email: this.getPropertyValue(userFromServer.mail),
      cellPhone: this.getPropertyValue(userFromServer.field_cellphone),
      contacts: this.adaptContactsFromServer(this.getPropertyValue(userFromServer.field_contacts))
    });

    return user;
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
