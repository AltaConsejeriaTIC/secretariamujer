import {ComponentFixture, TestBed, async, inject} from '@angular/core/testing';
import {SignUpPage} from './sign-up';
import {App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule}  from 'ionic-angular';
import {UserDAO} from '../../providers/user-dao';
import {AlertCreator} from  '../../providers/alert-creator';
import {AlertController} from 'ionic-angular';

describe('SignUpPage tests', () => {
  let signUpPage: SignUpPage;
  let fixture: ComponentFixture<SignUpPage>;
  let userDAO: UserDAO;

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

  beforeEach(inject([UserDAO], _userDAO => {
    userDAO = _userDAO;
  }));

  it('should test that signUp function calls create function from UserDAO', () => {
    spyOn(userDAO, 'create');
    signUpPage.signUp();
    expect(userDAO.create).toHaveBeenCalled();
  });

});
