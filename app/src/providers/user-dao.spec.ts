import {TestBed, inject} from "@angular/core/testing";
import {HttpModule, Http, BaseRequestOptions, Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {UserDAO} from "./user-dao";


describe('UserDAO tests', () => {

  let userDAO: UserDAO;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [UserDAO,
        {
          provide: Http, useFactory: (mockBackend, options) => {
          return new Http(mockBackend, options);
        },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions]
    });
  });

  beforeEach(inject([UserDAO], _adminApi => {
    userDAO = _adminApi;
  }));

  it('should exists', () => {
    expect(userDAO).toBeDefined();
  });

  it('should test that create method exists', () => {
    expect(userDAO.create).toBeDefined();
  });

  it('should test that post http method has been called to create an user', () => {
    inject([ MockBackend], ( mockBackend) => {
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify({
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
          })
        })));
      });


    });
    let user = {
      name: 'test name',
      pass: 12456,
      email: 'test@testname.com'
    };

    userDAO.create(user).subscribe(data => {
      console.log("pepe");
      expect(1).toBe(2);
    });
  });
});
