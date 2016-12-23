import {TestBed, inject, async} from "@angular/core/testing";
import {HttpModule, XHRBackend, Response, ResponseOptions} from "@angular/http";
import {MockBackend} from '@angular/http/testing';
import {UserDAO} from "./user-dao";


describe('MockBackend: LanguagesServiceHttp', () => {
  let mockbackend, userDAO;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        UserDAO,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    })
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
          "value": "test name"
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
    let user = {
      name: 'test name',
      pass: 12456,
      email: 'test@testname.com'
    };
    userDAO.create(user).map(res=>res.json()).subscribe(response => {
      console.log("la respuesta es", response);
      expect(response.name[0].value).toBe("test name");
    });
  }));
});
