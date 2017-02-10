import {UserAdapter} from "./user-adapter";
import {IUser} from "../../entity/user";
import {UserFactory} from "../user-factory";


describe('UserService tests', () => {
  let userAdapter = new UserAdapter(new UserFactory());
  let user = {};

  it('adaptUser should recieve a user in the format of the server and return a user entity', () => {
    let response = {
      "uid": [
        {
          "value": "9"
        }
      ],
      "name": [
        {
          "value": "test"
        }
      ],
      "mail": [
        {
          "value": "test@test.test"
        }
      ],
      "field_cellphone": [
        {
          "value": "2546987325"
        }
      ],
      "field_contacts": [
        {
          "value": "[{\"name\":\"Julio Jose Manrique\", \"cellPhone\":\"5468975641\"},{\"name\":\"Antonio Jose Manrique\", \"cellPhone\":\"5468975641\"}]"
        }
      ],
      "field_full_name": [
        {
          "value": "Pedro Jose Manrrique"
        }
      ]
    };

    let user: IUser = userAdapter.adaptUserFromServer(response);

    expect(user.username).toEqual(response.name[0].value);
    expect(user.fullName).toEqual(response.field_full_name[0].value);
    expect(user.email).toEqual(response.mail[0].value);
    expect(user.cellPhone).toEqual(response.field_cellphone[0].value);
    expect(user.id).toEqual(response.uid[0].value);

    let contacts = JSON.parse(response.field_contacts[0].value);
    expect(user.contacts[0].name).toEqual(contacts[0].name);
    expect(user.contacts[0].cellPhone).toEqual(contacts[0].cellPhone);
    expect(user.contacts[1].name).toEqual(contacts[1].name);
    expect(user.contacts[1].cellPhone).toEqual(contacts[1].cellPhone);
  });

});
