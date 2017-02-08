import {LoginService} from "./login-service";
import {Http, ConnectionBackend, XHRBackend} from "@angular/http";
import {MockConnection} from "@angular/http/testing";


describe('LoginService tests', () => {
  let httpMock = new MockConnection();
  let loginService = new LoginService(httpMock);
  let user = {};

  it('login', () => {
  });

});
