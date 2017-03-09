import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

declare let navigator: any;
declare let Connection: any;

@Injectable()
export class NetworkStatusService {

  constructor() {
  }

  static isDeviceConnected() {
    let connected = false;

    if (navigator.connection) {
      connected = navigator.connection.type != Connection.NONE;
    }
    else {
      connected = navigator.onLine;
    }

    return connected;
  }
}
