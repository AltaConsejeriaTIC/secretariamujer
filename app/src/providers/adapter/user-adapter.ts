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
      id: userFromServer.uid[0].value,
      username: userFromServer.name[0].value,
      fullName: userFromServer.field_full_name[0].value,
      email: userFromServer.mail[0].value,
      cellPhone: userFromServer.field_cellphone[0].value,
      contacts: this.adaptContactsFromServer(userFromServer.field_contacts[0].value)
    });

    return user;
  }

  adaptContactsFromServer(contactsFromServer: string) {
    return JSON.parse(contactsFromServer);
  }
}
