import {UserAdapter} from "./user-adapter";
import {IUser} from "../../entity/user";
import {UserFactory} from "../user-factory";


describe('UserService tests', () => {
  let userAdapter = new UserAdapter(new UserFactory());

  it('adaptUser should recieve a user in the format of the server and return a user entity', () => {
    let response = {
      "uid": "9",
      "name": "test",
      "mail": "test@test.test",
      "field_cellphone": "2546987325",
      "field_contacts": [
        {
          "value": "[{\"name\":\"Julio Jose Manrique\", \"cellPhone\":\"5468975641\"},{\"name\":\"Antonio Jose Manrique\", \"cellPhone\":\"5468975641\"}]"
        }
      ],
      "field_full_name": "Pedro Jose Manrrique"
    };

    let user: IUser = userAdapter.adaptUserFromServer(response);

    expect(user.username).toEqual(response.name);
    expect(user.fullName).toEqual(response.field_full_name);
    expect(user.email).toEqual(response.mail);
    expect(user.cellPhone).toEqual(response.field_cellphone);
    expect(user.id).toEqual(response.uid);

    let contacts = JSON.parse(response.field_contacts[0].value);
   /* expect(user.contacts[0].name).toEqual(contacts[0].name);
    expect(user.contacts[0].cellPhone).toEqual(contacts[0].cellPhone);
    expect(user.contacts[1].name).toEqual(contacts[1].name);
    expect(user.contacts[1].cellPhone).toEqual(contacts[1].cellPhone);*/
  });

});
