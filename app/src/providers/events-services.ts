import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EventsServices {

  constructor(public http: Http) {
  }

  registerEvent() {
    let body = JSON.stringify(
      {
        "_links": {
          "type": {"href": "http://localhost/admin/rest/type/node/eventos"}
        },
        "title": [{"value": "prueba evento1"}],
        "field_latitud": [{"value": "2.2"}],
        "field_longitud": [{"value": "3"}]
      });

    let headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Basic ' + 'YXBwOmFwcA=='});
    let options = new RequestOptions({headers: headers});

    return this.http.post('http://192.168.88.245:9000/entity/node', body, options);
  }

}
