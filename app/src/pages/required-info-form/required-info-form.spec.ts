import {ComponentFixture, TestBed, async, inject} from '@angular/core/testing';
import {RequiredInfoFormPage} from './required-info-form';
import {App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule}  from 'ionic-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfigMock} from '../../mocks';
import {AlertCreator} from  '../../providers/alert-creator'
import {AlertController} from "ionic-angular";
import {UserDAO} from "../../providers/user-dao";
import {ApplicationConfig} from "../../config";
import {LoginService} from "../../providers/login-service";
import {UserService} from "../../providers/user-service";
import {UserAdapter} from "../../providers/adapter/user-adapter";
import {UserFactory} from "../../providers/user-factory";


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
        App, Platform, Form, Keyboard, MenuController, NavController, AlertCreator, AlertController, RequiredInfoFormPage,LoginService,
        UserDAO, ApplicationConfig,UserService, UserAdapter, UserFactory,
        {provide: Config, useClass: ConfigMock}
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

  it('validateEmptyField should return true if field is empty', () => {
    requiredInfoFormPage.user.fullName = null;
    expect(requiredInfoFormPage.validateEmptyField(requiredInfoFormPage.user.fullName)).toBe(true);
  });

  it('throwMessageIfEmptyField should call showSimpleAlert from AlertCreator if any field is empty', () => {
    spyOn(alertCreator, 'showSimpleAlert');
    requiredInfoFormPage.throwMessageIfEmptyField(true, true);
    expect(alertCreator.showSimpleAlert).toHaveBeenCalled();
    requiredInfoFormPage.throwMessageIfEmptyField(true, false);
    expect(alertCreator.showSimpleAlert).toHaveBeenCalled();
    requiredInfoFormPage.throwMessageIfEmptyField(false, true);
    expect(alertCreator.showSimpleAlert).toHaveBeenCalled();
  });

  it('isPassValueOnlyNumber should call showSimpleAlert from AlertCreator if input contains characters different from numbers and return false', () => {
    spyOn(alertCreator, 'showSimpleAlert');
    requiredInfoFormPage.user.password = '123!';
    requiredInfoFormPage.isPassValueOnlyNumber();
    expect(requiredInfoFormPage.isPassValueOnlyNumber()).toBe(false);
    expect(alertCreator.showSimpleAlert).toHaveBeenCalled();
  });

  it('setRequiredInfo should save username and password in userService', () => {
    requiredInfoFormPage.user.username='test';
    requiredInfoFormPage.user.password='1234';
    requiredInfoFormPage.saveRequiredInfo();
    expect(userService.user.username).toEqual('test');
    expect(userService.user.password).toEqual('1234');
  });
});
