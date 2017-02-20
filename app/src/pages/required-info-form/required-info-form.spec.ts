import {ComponentFixture, TestBed, async, inject} from '@angular/core/testing';
import {RequiredInfoFormPage} from './required-info-form';
import {
  App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule,
  LoadingController
}  from 'ionic-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfigMock, LoadingControllerMock, AlertCreatorMock, UserDAOMock} from '../../mocks';
import {AlertCreator} from  '../../providers/alert-creator'
import {AlertController} from "ionic-angular";
import {UserDAO} from "../../providers/user-dao";
import {ApplicationConfig} from "../../config";
import {LoginService} from "../../providers/login-service";
import {UserService} from "../../providers/user-service";
import {UserAdapter} from "../../providers/adapter/user-adapter";
import {UserFactory} from "../../providers/user-factory";
import {FormValidator} from "../../providers/form-validator";


describe('RequiredInfoFormPage tests', () => {

  let requiredInfoFormPage: RequiredInfoFormPage;
  let fixture: ComponentFixture<RequiredInfoFormPage>;
  let alertCreator: AlertCreator;
  let userDAO: UserDAO;
  let userService:UserService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequiredInfoFormPage],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController, AlertController, RequiredInfoFormPage,LoginService,
        ApplicationConfig,UserService, UserAdapter, UserFactory, FormValidator,
        {provide: Config, useClass: ConfigMock}, {provide: LoadingController, useClass: LoadingControllerMock},
        {
          provide: AlertCreator,
          useClass: AlertCreatorMock
        },
        {
          provide: UserDAO,
          useClass: UserDAOMock
        },
      ],
      imports: [
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiredInfoFormPage);
    requiredInfoFormPage = fixture.componentInstance;
  });

  beforeEach(inject([AlertCreator, UserDAO, UserService], (_alertCreator, _userDAO, _UserService) => {
    alertCreator = _alertCreator;
    userDAO = _userDAO;
    userService=_UserService;
  }));

  it('if UserData is valid should save user data', () => {
    requiredInfoFormPage.form.controls['username'].setValue('username');
    requiredInfoFormPage.form.controls['password'].setValue('1234');
    requiredInfoFormPage.checkInputValues();

    expect(userService.user.username).toEqual('username');
    expect(userService.user.password).toEqual('1234');
  });

});
