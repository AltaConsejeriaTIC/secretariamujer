import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {ApplicationConfig} from "../config";


@Injectable()
export class WarningMessageDAO {

  constructor(public http: Http, private config: ApplicationConfig) {
  }

  get() {
    let emergencyMessage = this.config.getURL('/emergency_message_rest');
    return this.http.get(emergencyMessage).map(res => {
        return res.json()[0].emergencyMessage;
      }
    );
  }

}
