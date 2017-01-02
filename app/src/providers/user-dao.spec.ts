import {TestBed, inject, async} from "@angular/core/testing";
import {HttpModule, XHRBackend, Response, ResponseOptions} from "@angular/http";
import {MockBackend} from '@angular/http/testing';
import {UserDAO} from "./user-dao";
import {Observable} from "rxjs/Observable";


describe('UserDAO tests', () => {
  let mockbackend, userDAO;
  let user = {pass: '1234', username: 'testusername', name: 'testname', email:'testemail', phone:'testphone'};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        UserDAO,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  beforeEach(inject([UserDAO, XHRBackend], (_UserDAO, _mockbackend) => {
    userDAO = _UserDAO;
    mockbackend = _mockbackend;
  }));

  it('should return mocked response for createUser (async)', async(() => {
    let response = {
      "uid": [{
        "value": "444"
      }],
      "name": [
        {
          "value": user.name
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

    userDAO.user=user;
    userDAO.create().map(res=>res.json()).subscribe(response => {
      expect(response.name[0].value).toBe("testname");
    });
  }));

  it('should create function return an Observable type',()=>{
    let isObservable = userDAO.create() instanceof Observable;
    expect(isObservable).toBe(true);
  });

  it('saveRequiredInfo should set user name and pass values',()=>{
    userDAO.user=user;
    userDAO.saveRequiredInfo('name','123');
    expect(userDAO.user.username).toBe('name');
    expect(userDAO.user.pass).toBe('123');
  });

  it('saveOptionalInfo should set user name, email and phone values',()=>{
    userDAO.user=user;
    userDAO.saveOptionalInfo('testname','testemail', 'testphone1');
    expect(userDAO.user.name).toBe('testname');
    expect(userDAO.user.email).toBe('testemail');
    expect(userDAO.user.phone).toBe('testphone1');
  });

  it('encodeUsername should return the username plus a code number',()=>{
    userDAO.user=user;
    let usernameEncoded=userDAO.encodeUsername();
    expect(usernameEncoded).not.toBe(userDAO.user.username);
    expect(usernameEncoded.indexOf(userDAO.user.username)).toBeGreaterThan(-1);
  });

  it('encodeEmail should return the email plus a code number if user does not fill that field',()=>{
    userDAO.user=user;
    userDAO.user.email=null;
    let userEmailEncoded=userDAO.encodeEmail();
    expect(userEmailEncoded).not.toBe(userDAO.user.email);
    expect(userEmailEncoded.indexOf('@noregistra.com')).toBeGreaterThan(-1);
  });

});
