import {ComponentFixture, TestBed, async, inject} from '@angular/core/testing';
import {App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule}  from 'ionic-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfigMock} from '../../mocks';
import {AlertCreator} from  '../../providers/alert-creator'
import {AlertController} from "ionic-angular";
import {UserDAO} from "../../providers/user-dao";
import {OptionalInfoFormPagePage} from "./optional-info-form-page";

describe('OptionalInfoFormPage tests', () => {

  let optionalInfoFormPage: OptionalInfoFormPagePage;
  let fixture: ComponentFixture<OptionalInfoFormPagePage>;
  let alertCreator: AlertCreator;
  let userDAO: UserDAO;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OptionalInfoFormPagePage],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController, AlertCreator, AlertController, OptionalInfoFormPagePage, UserDAO,
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
    fixture = TestBed.createComponent(OptionalInfoFormPagePage);
    optionalInfoFormPage = fixture.componentInstance;
  });

  beforeEach(inject([AlertCreator, UserDAO], (_alertCreator, _userDAO) => {
    alertCreator = _alertCreator;
    userDAO = _userDAO;
  }));

  it('checkFields should call saveOptionalInfo if email is correct', () => {
    spyOn(optionalInfoFormPage, 'saveOptionalInfo');
    optionalInfoFormPage.user.email = 'test@test.com';
    optionalInfoFormPage.checkFields();
    expect(optionalInfoFormPage.saveOptionalInfo).toHaveBeenCalled();
  });

  it('checkFields should call showSimpleAlert from AlertCreator if email is incorrect', () => {
    spyOn(alertCreator, 'showSimpleAlert');
    optionalInfoFormPage.user.email = 'test';
    optionalInfoFormPage.checkFields();
    expect(alertCreator.showSimpleAlert).toHaveBeenCalled();
  });

  it('saveOptionalInfo should call saveOptionalInfo from UserDAO and create from UserDAO', () => {
    spyOn(userDAO, 'saveOptionalInfo');
    spyOn(userDAO, 'create').and.callThrough();
    optionalInfoFormPage.saveOptionalInfo();
    expect(userDAO.saveOptionalInfo).toHaveBeenCalled();
    expect(userDAO.create).toHaveBeenCalled();
  });

  it('isValidEmail should return true if email has @ and .com', () => {
    optionalInfoFormPage.user.email = 'test@test.com';
    expect(optionalInfoFormPage.isValidEmail()).toBe(true);
  });

  it('createUser should call create from UserDAO', () => {
    spyOn(userDAO, 'create').and.callThrough();
    optionalInfoFormPage.createUser();
    expect(userDAO.create).toHaveBeenCalled();
  });

});
