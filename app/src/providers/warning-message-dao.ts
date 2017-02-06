import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {ApplicationConfig} from "../config";


/*
 Generated class for the WarningMessageDAO provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class WarningMessageDAO {

  constructor(public http: Http, private config: ApplicationConfig) {
    console.log('Hello WarningMessageDAO Provider');
  }

  query() {
    let emergencyMessage = this.config.getURL('/emergency_message_rest');
    return this.http.get(emergencyMessage).map(res => {
        return res.json()[0].emergencyMessage;
      }
    );
  }

}
