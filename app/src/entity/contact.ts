export interface IContact {
  name: string,
  cellPhone: string
}

export class Contact implements IContact {
  cellPhone: string;
  name: string;

  constructor(name?: string, cellPhone?: string) {
    this.name = name;
    this.cellPhone = cellPhone;
  }
}
