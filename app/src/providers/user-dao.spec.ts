import {TestBed, inject, async} from "@angular/core/testing";
import {HttpModule, XHRBackend, Response, ResponseOptions} from "@angular/http";
import {MockBackend} from '@angular/http/testing';
import {UserDAO} from "./user-dao";
import {Observable} from "rxjs/Observable";


describe('UserDAO tests', () => {
  let mockbackend, userDAO;
  let user = {
    name: 'test name',
    pass: 12456,
    email: 'test@testname.com'
  };

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

  it('should return mocked response (async)', async(() => {
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

    userDAO.create(user).map(res=>res.json()).subscribe(response => {
      expect(response.name[0].value).toBe("test name");
    });
  }));

  it('should create function return an Observable type',()=>{
    let isObservable = userDAO.create(user) instanceof Observable;
    expect(isObservable).toBe(true);
  });
});
