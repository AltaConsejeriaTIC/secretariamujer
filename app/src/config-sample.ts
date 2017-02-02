import {Injectable} from "@angular/core";

@Injectable()
export class ApplicationConfig {
  private BASE_URL: string = '';//http://192.168.88.245:9000';

  constructor() {

  }

  getURL(path: string) {
    return this.BASE_URL + path;
  }
}
