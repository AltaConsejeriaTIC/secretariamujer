import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

declare let navigator: any;
declare let Connection: any;

@Injectable()
export class NetworkStatusService {

  constructor() {
  }

  static isDeviceConnected() {
    return navigator.connection.type != Connection.NONE;
  }
}
