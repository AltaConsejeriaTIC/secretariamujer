import {ContactAdapter} from "./contact-adapter";
import {ErrorFactory} from "../factory/error-factory";
import {Contact} from "../../entity/contact";


describe('ContacAdapter tests', () => {
  let contactAdapter = new ContactAdapter();
  let selectedContact = {
    displayName: 'Carlos Agusto Santana',
    name: {
      formatted: "Carlos Agusto"
    },
    phoneNumbers: [{
      value: '3125645556'
    }, {
      value: '3121234567'
    }]
  };

  it('adaptName should adapt the fullName of the selected contact', () => {
    let contactName = contactAdapter.adaptName(selectedContact);

    expect(contactName).toBe(selectedContact.displayName);
  });

  it('parsePhoneNumbers should adapt the fullName of the selected contact', () => {
    let contactPhoneNumber = contactAdapter.adaptPhoneNumber(selectedContact);

    expect(contactPhoneNumber).toBe(selectedContact.phoneNumbers[0].value);
  });

  it('adaptContact should adapt the selected contact in the cellPhone to a instance of the class Contact', () => {
    let expectedContact = new Contact(selectedContact.displayName, selectedContact.phoneNumbers[0].value);
    let contact = contactAdapter.adaptContact(selectedContact);

    expect(contact instanceof Contact).toBe(true);
    expect(contact).toEqual(expectedContact);
  });

  it('adaptContact should return a contact with the formatted name if it does not have fullName', () => {
    let expectedContact = new Contact(selectedContact.name.formatted, selectedContact.phoneNumbers[0].value);
    selectedContact.displayName = null;
    let contact = contactAdapter.adaptContact(selectedContact);

    expect(contact).toEqual(expectedContact);
  });

  it('adaptContact should return a contact with the number in the fullName if it does not have neither fullName nor formatted name', () => {
    let expectedContact = new Contact(selectedContact.phoneNumbers[0].value, selectedContact.phoneNumbers[0].value);
    selectedContact.displayName = null;
    selectedContact.name.formatted = null;
    let contact = contactAdapter.adaptContact(selectedContact);

    expect(contact).toEqual(expectedContact);
  });

  it('adaptContact should throw error if the selected contact does not have any cellPhone number', () => {
    selectedContact.phoneNumbers = null;

    expect(() => {
      contactAdapter.adaptContact(selectedContact)
    }).toThrow(ErrorFactory.createError('InvalidContactPhoneNumberError'));
  });

});
