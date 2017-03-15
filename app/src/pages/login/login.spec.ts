import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {
  App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule,
  LoadingController
}  from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfigMock} from '../../mocks';
import {LoginService} from "../../providers/login-service";
import {LoginPage} from "./login";
import {FormValidator} from "../../providers/form-validator";
import {AlertCreator} from "../../providers/alert-creator";
import {UserFactory} from "../../providers/user-factory";
import {UserDAO} from "../../providers/user-dao";
import {UserService} from "../../providers/user-service";
import {UserAdapter} from "../../providers/adapter/user-adapter";


describe('LoginPage tests', () => {

  let loginPage: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController, LoginService, FormValidator, Storage,
        LoadingController, UserFactory, LoginService, UserDAO, UserService, UserAdapter,
        {provide: Config, useClass: ConfigMock},
        {provide: AlertCreator, useClass: ConfigMock}
      ],
      imports: [
        FormsModule,
        IonicModule,
        ReactiveFormsModule
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    loginPage = fixture.componentInstance;
  });

  it('loginPage should be defined', () => {
    expect(loginPage).toBeDefined();
  });

  it('makeLogin should call loginService', () => {
    expect(loginPage.makeLogin).toBeDefined();
  });

});

