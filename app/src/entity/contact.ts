export interface IContact {
  name: string,
  phoneNumber: string
}

export class Contact implements IContact {
  phoneNumber: string;
  name: string;

  constructor(name?: string, phoneNumber?: string) {
    this.name = name;
    this.phoneNumber = phoneNumber;
  }
}
