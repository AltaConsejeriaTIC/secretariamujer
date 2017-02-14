import {MockBackend} from "@angular/http/testing";
import {LoginService} from "./login-service";
import {UserFactory} from "./user-factory";
import {ReflectiveInjector} from "@angular/core";
import {ConnectionBackend, BaseRequestOptions, RequestOptions, Http, Response, ResponseOptions} from "@angular/http";
import {tick, fakeAsync} from "@angular/core/testing";
import {UserDAOMock, AlertCreatorMock} from "../mocks";
import {UserDAO} from "./user-dao";
import {AlertCreator} from "./alert-creator";


describe('LoginService tests', () => {
  let user = new UserFactory().createUser({id: '654', username: 'app', password: 'app'});

  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      {provide: ConnectionBackend, useClass: MockBackend},
      {provide: RequestOptions, useClass: BaseRequestOptions},
      {provide: UserDAO, useClass: UserDAOMock},
      {provide: AlertCreator, useClass: AlertCreatorMock},
      Http, LoginService,
    ]);
    this.loginService = this.injector.get(LoginService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });


  xit('login should authenticate the user and give back the user id', fakeAsync(() => {
    let result: string;

    this.loginService.login(user).subscribe((userId: string) => result = userId);

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({current_user: {uid: user.id}}),
    })));

    tick();

    expect(result).toEqual(user.id);
  }));

});


