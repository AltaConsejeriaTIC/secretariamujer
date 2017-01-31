import {ComponentFixture, TestBed, async, inject} from '@angular/core/testing';
import {App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule}  from 'ionic-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfigMock} from '../../mocks';
import {AlertCreator} from  '../../providers/alert-creator'
import {AlertController} from "ionic-angular";
import {UserDAO} from "../../providers/user-dao";
import {OptionalInfoFormPagePage} from "./optional-info-form-page";
import {Observable} from "rxjs";
import {User} from "../../entity/user";

describe('OptionalInfoFormPage tests', () => {

  let optionalInfoFormPage: OptionalInfoFormPagePage;
  let fixture: ComponentFixture<OptionalInfoFormPagePage>;
  let alertCreator: AlertCreator;
  let userDAO: UserDAO;
  let user: User;
  let mockUserDAO = {
    saveOptionalInfo: () => {

    },
    create: () => {
      return Observable.of(new Object());
    },
    setOptionalInfo: () => {

    }
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OptionalInfoFormPagePage],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController, AlertCreator, AlertController, OptionalInfoFormPagePage,
        {
          provide: Config,
          useClass: ConfigMock
        },
        {
          provide: UserDAO,
          useValue: mockUserDAO
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

  it('isValidEmail should return true if email has @ and .com', () => {
    expect(optionalInfoFormPage.isValidEmail(user)).toBe(true);
  });

  it('saveUser should call create from UserDAO', () => {
    optionalInfoFormPage.user = user;
    spyOn(userDAO, 'create').and.callThrough();
    optionalInfoFormPage.saveUser();
    expect(userDAO.create).toHaveBeenCalled();
  });

});
