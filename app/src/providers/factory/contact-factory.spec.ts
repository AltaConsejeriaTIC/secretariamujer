import {ContactFactory} from "./contact-factory";
import {Contact} from "../../entity/contact";

describe('ContactFactory tests', () => {
  let contactFactory: ContactFactory = new ContactFactory();

  it('createContact should create a empty contact', () => {
    let contact = contactFactory.createContact();
    expect(contact).toBeDefined();
    expect(contact).toEqual(new Contact());
  });

  it('createContact should create a contact with data', () => {
    let contact = contactFactory.createContact('name','number');
    expect(contact).toEqual(new Contact('name', 'number'));
  });

});

