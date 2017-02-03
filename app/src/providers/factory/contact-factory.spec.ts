import {ContactFactory} from "./contact-factory";
import {Contact} from "../../entity/contact";

describe('ContactFactory tests', () => {
  it('createContact should create a empty contact', () => {
    let contact = ContactFactory.createContact();
    expect(contact).toBeDefined();
    expect(contact).toEqual(new Contact());
  });

  it('createContact should create a contact with data', () => {
    let contact = ContactFactory.createContact('name','number');
    expect(contact).toEqual(new Contact('name', 'number'));
  });

});

