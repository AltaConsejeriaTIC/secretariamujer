import {TestBed, inject} from "@angular/core/testing";
import {HttpModule, XHRBackend, ConnectionBackend} from "@angular/http";
import {MockBackend} from '@angular/http/testing';
import {UserDAO} from "./user-dao";
import {Observable} from "rxjs/Observable";
import {User} from "../entity/user";
import {Contact} from "../entity/contact";
import {ApplicationConfig} from "../config";
import {UserService} from "./user-service";
import {UserAdapter} from "./adapter/user-adapter";
import {UserFactory} from "./user-factory";


describe('UserDAO tests', () => {
  let mockbackend, userDAO;
  let user = new User('Julio Zorra', 'juliozorra@gmail.com', '3124569878', 'julio3456', '1234');


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        UserDAO, ConnectionBackend, ApplicationConfig, UserService, UserAdapter, UserFactory,
        {provide: XHRBackend, useClass: MockBackend}
      ]
    });
  });

  beforeEach(inject([UserDAO, XHRBackend], (_UserDAO, _mockbackend) => {
    userDAO = _UserDAO;
    mockbackend = _mockbackend;
  }));


  it('should create function return an Observable type', () => {
    let isObservable = userDAO.create() instanceof Observable;
    expect(isObservable).toBe(true);
  });

  it('createHttpBody should create the body of the request according to the user info', () => {
    user = new User('Julio Zorra', 'juliozorra@gmail.com', '3124569878', 'julio3456', '1234', [new Contact('brayan', '123')]);
    let expectedUser = JSON.parse(userDAO.createHttpBody(user));

    expect(expectedUser.name[0].value).toEqual(user.username);
    expect(expectedUser.field_full_name).toEqual(user.fullName);
    expect(expectedUser.mail[0].value).toEqual(user.email);
    expect(expectedUser.field_cellphone).toEqual(user.cellPhone);
    expect(expectedUser.roles[0].target_id).toEqual("authenticated");
    expect(expectedUser.field_contacts).toEqual(JSON.stringify(user.contacts));
  });


});
