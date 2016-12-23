import {ComponentFixture, TestBed, async, inject} from '@angular/core/testing';
import {SignUpPage} from './sign-up';
import {App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule}  from 'ionic-angular';
import {UserDAO} from '../../providers/user-dao';
import {AlertCreator} from  '../../providers/alert-creator';
import {AlertController} from 'ionic-angular';

describe('SignUpPage tests', () => {
  let signUpPage: SignUpPage;
  let fixture: ComponentFixture<SignUpPage>;
  let adminApi: UserDAO;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpPage],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController, UserDAO,
        AlertCreator, AlertController, Config
      ],
      imports: [
        IonicModule
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpPage);
    signUpPage = fixture.componentInstance;
  });

  beforeEach(inject([UserDAO], _adminApi => {
    adminApi = _adminApi;
  }));


  it('should exists', () => {
    expect(signUpPage).toBeDefined();
  });

  it('should test that signUp function exists', () => {
    expect(signUpPage.signUp).toBeDefined();
  });

  it('should test that signUp function calls the api for register user', () => {
    spyOn(adminApi, 'create');
    signUpPage.signUp();
    expect(adminApi.create).toHaveBeenCalled();
  });

});
