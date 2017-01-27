export interface IContact {
  name: string,
  phoneNumbers: string[]
}

export class Contact implements IContact {
  phoneNumbers: string[];
  name: string;

  constructor(name?: string, phoneNumbers?: string[]) {
    this.name = name;
    this.phoneNumbers = phoneNumbers;
  }
}
