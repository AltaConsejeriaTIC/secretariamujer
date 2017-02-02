import {TestBed, inject, async} from "@angular/core/testing";
import {HttpModule, XHRBackend, Response, ResponseOptions, ConnectionBackend} from "@angular/http";
import {MockBackend} from '@angular/http/testing';
import {UserDAO} from "./user-dao";
import {Observable} from "rxjs/Observable";
import {User} from "../entity/user";
import {Contact} from "../entity/contact";
import {ApplicationConfig} from "../config";


describe('UserDAO tests', () => {
  let mockbackend, userDAO;
  let user = new User('Julio Zorra', 'juliozorra@gmail.com', '3124569878', 'julio3456', '1234');


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        UserDAO, ConnectionBackend, ApplicationConfig
        {provide: XHRBackend, useClass: MockBackend}
      ]
    });
  });

  beforeEach(inject([UserDAO, XHRBackend], (_UserDAO, _mockbackend) => {
    userDAO = _UserDAO;
    mockbackend = _mockbackend;
  }));

  it('should return mocked response for saveUser (async)', async(() => {
    let response = {
      "uid": [{
        "value": "444"
      }],
      "name": [
        {
          "value": user.fullName
        }
      ],
      "mail": [
        {
          "value": "test@testname.com"
        }
      ],
      "field_cellphone": [
        {
          "value": "313246545"
        }
      ]
    };
    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(new ResponseOptions({body: JSON.stringify(response)})));
    });

    userDAO.user = user;
    userDAO.create().map(res => res.json()).subscribe(response => {
      expect(response.name[0].value).toBe(user.fullName);
    });
  }));

  it('should create function return an Observable type', () => {
    let isObservable = userDAO.create() instanceof Observable;
    expect(isObservable).toBe(true);
  });

  it('saveRequiredInfo should set user fullName and password values', () => {
    userDAO.user = user;
    userDAO.saveRequiredInfo('name', '123');
    expect(userDAO.user.username).toBe('name');
    expect(userDAO.user.password).toBe('123');
  });

  it('setOptionalInfo should set user fullName, email and cellPhone values', () => {
    userDAO.setOptionalInfo(user);
    expect(userDAO.user.fullName).toBe(user.fullName);
    expect(userDAO.user.email).toBe(user.email);
    expect(userDAO.user.cellPhone).toBe(user.cellPhone);
  });


  it('getUsername should return user username', () => {
    userDAO.user.username = 'Pepe';
    expect(userDAO.getUsername()).toEqual('Pepe');
  });

  it('createHttpBody should create the body of the request according to the user info', () => {
    user = new User('Julio Zorra', 'juliozorra@gmail.com', '3124569878', 'julio3456', '1234', [new Contact('brayan', '123')]);
    let expectedUser = JSON.parse(userDAO.createHttpBody(user));

    expect(expectedUser.name[0].value).toEqual(user.username);
    expect(expectedUser.field_full_name).toEqual(user.fullName);
    expect(expectedUser.field_password).toEqual(user.password);
    expect(expectedUser.mail[0].value).toEqual(user.email);
    expect(expectedUser.field_cellphone).toEqual(user.cellPhone);
    expect(expectedUser.roles[0].target_id).toEqual("authenticated");
    expect(expectedUser.field_contacts).toEqual(JSON.stringify(user.contacts));
  });


});
