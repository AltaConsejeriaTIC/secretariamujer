import {ComponentFixture, TestBed, async, inject} from '@angular/core/testing';
import {App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule}  from 'ionic-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfigMock} from '../../mocks';
import {AlertCreator} from  '../../providers/alert-creator'
import {AlertController} from "ionic-angular";
import {UserDAO} from "../../providers/user-dao";
import {OptionalInfoFormPagePage} from "./optional-info-form-page";
import {Observable} from "rxjs";
import {IUser} from "../../entity/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

describe('OptionalInfoFormPage tests', () => {

  let optionalInfoFormPage: OptionalInfoFormPagePage;
  let fixture: ComponentFixture<OptionalInfoFormPagePage>;
  let alertCreator: AlertCreator;
  let userDAO: UserDAO;
  let user: IUser;
  let mockUserDAO = {
    saveOptionalInfo: () => {

    },
    create: () => {
      return Observable.of(new Object());
    },
    setOptionalInfo: () => {

    }
  };

  let mockAlertCreator={
    showSimpleAlert:()=>{

    }
  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OptionalInfoFormPagePage],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController, AlertController, OptionalInfoFormPagePage,
        {
          provide: Config,
          useClass: ConfigMock
        },
        {
          provide: UserDAO,
          useValue: mockUserDAO
        },
        {
          provide: AlertCreator,
          useValue: mockAlertCreator
        }
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

    user = {
      email: 'test@test.com',
      phone: '3132456545',
      pass: '1215',
      username: 'user123',
      name: 'Juan Valdez'
    };

  }));

  /*it('checkFields should call setOptionalInfo if email is correct', () => {
   spyOn(optionalInfoFormPage, 'setOptionalInfo');
   optionalInfoFormPage.user.email = 'test@test.com';
   expect(optionalInfoFormPage.setOptionalInfo).toHaveBeenCalled();
   });

   it('checkFields should call showSimpleAlert from AlertCreator if email is incorrect', () => {
   spyOn(alertCreator, 'showSimpleAlert');
   optionalInfoFormPage.user.email = 'test';
   expect(alertCreator.showSimpleAlert).toHaveBeenCalled();
   });*/

  it('isValidName should return true if the name is valid', () => {
    optionalInfoFormPage.optionalInfoForm.controls['name'].setValue('name');
    expect(optionalInfoFormPage.isValidName()).toBe(true);
  });

  it('isValidEmail should return true if the email is valid', () => {
    optionalInfoFormPage.optionalInfoForm.controls['email'].setValue('a@bc.com');
    expect(optionalInfoFormPage.isValidName(user)).toBe(true);
  });

  it('isValidPhone should return true if the phone is valid', () => {
    optionalInfoFormPage.optionalInfoForm.controls['phone'].setValue('a@bc.com');
    expect(optionalInfoFormPage.isValidName(user)).toBe(true);
  });

  it('isValidName should return false if the email is invalid', () => {
    optionalInfoFormPage.optionalInfoForm.controls['email'].setValue('a@b');
    expect(optionalInfoFormPage.isValidName(user)).toBe(false);
  });

  it('saveUser should call create from UserDAO', () => {
    optionalInfoFormPage.user = user;
    spyOn(userDAO, 'create').and.callThrough();
    optionalInfoFormPage.saveUser();
    expect(userDAO.create).toHaveBeenCalled();
  });

});
