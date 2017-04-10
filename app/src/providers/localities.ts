import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Localities {
  locationsLabels:string[];
  locationsServer:string[];

  constructor() {
    this.locationsLabels=[
      'Usaquén',
      'Chapinero',
      'Santa Fe',
      'San Cristóbal',
      'Usme',
      'Tunjuelito',
      'Bosa',
      'Kennedy',
      'Fontibón',
      'Engativá',
      'Suba',
      'Barrios Unidos',
      'Teusaquillo',
      'Los Mártires',
      'Antonio Nariño',
      'Puente Aranda',
      'La Candelaria',
      'Rafael Uribe Uribe',
      'Ciudad Bolívar',
      'Sumapaz'
    ];

    this.locationsServer=[
      'Usaquén',
      'Chapinero',
      'Santa Fé',
      'San Cristóbal',
      'Usme',
      'Tunjuelito',
      'Bosa',
      'Ciudad Kennedy',
      'Fontibón',
      'Engativá',
      'Suba',
      'Barrios Unidos',
      'Teusaquillo',
      'Los Mártires',
      'Antonio Nariño',
      'Puente Aranda',
      'Candelaria',
      'Rafael Uribe',
      'Ciudad Bolívar',
      'Sumapáz'
    ];
  }

  getLocalitiesLabels(){
    return this.locationsLabels;
  }

  getLocalitiesServer(){
    return this.locationsServer;
  }

}
