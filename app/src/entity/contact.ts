export interface IContact {
  name: string,
  phoneNumbers: string[]
}

export class Contact implements IContact {
  name: string;
  phoneNumbers: string[];

  constructor() {
  }
}

export class ContactFactory {
  constructor(){

  }

  createContact(){
    return new Contact();
  }

}
