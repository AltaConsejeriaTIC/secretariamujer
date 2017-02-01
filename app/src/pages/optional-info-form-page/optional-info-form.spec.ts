import {ComponentFixture, TestBed, async, inject} from '@angular/core/testing';
import {App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule}  from 'ionic-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfigMock, UserDAOMock, AlertCreatorMock} from '../../mocks';
import {AlertCreator} from  '../../providers/alert-creator'
import {AlertController} from "ionic-angular";
import {UserDAO} from "../../providers/user-dao";
import {OptionalInfoFormPagePage} from "./optional-info-form-page";
import {IUser, User} from "../../entity/user";

describe('OptionalInfoFormPage tests', () => {

  let optionalInfoFormPage: OptionalInfoFormPagePage;
  let fixture: ComponentFixture<OptionalInfoFormPagePage>;
  let mockRightUser: IUser = new User('Jose Julio Flores', 'juliov@gmail.com', '3214569865', 'juliozorra', '1245');
  let mockWrongUser: IUser = new User('Jose Julio Flores 13', 'juliov@gmailcom', '321aa4569865', '#$#%', '124a');
  let mockUserDao: UserDAO;

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
          useClass: UserDAOMock
        },
        {
          provide: AlertCreator,
          useClass: AlertCreatorMock
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
    mockUserDao = fixture.debugElement.injector.get(UserDAO);
  });


  it('isValidName should return true if the name is valid', () => {
    optionalInfoFormPage.form.controls['name'].setValue(mockRightUser.name);
    expect(optionalInfoFormPage.isValidName()).toBe(true);
  });


  it('isValidName should return false if the name is invalid', () => {
    optionalInfoFormPage.form.controls['name'].setValue(mockWrongUser.name);
    expect(optionalInfoFormPage.isValidName()).toBe(false);
  });

  it('isValidEmail should return true if the email is valid', () => {
    optionalInfoFormPage.form.controls['email'].setValue(mockRightUser.email);
    expect(optionalInfoFormPage.isValidEmail()).toBe(true);
  });

  it('isValidEmail should return true if the email is invalid', () => {
    optionalInfoFormPage.form.controls['email'].setValue('a@bc.');
    expect(optionalInfoFormPage.isValidEmail()).toBe(false);

    optionalInfoFormPage.form.controls['email'].setValue('abc');
    expect(optionalInfoFormPage.isValidEmail()).toBe(false);
  });

  it('isValidPhone should return true if the phone is valid', () => {
    optionalInfoFormPage.form.controls['phone'].setValue(mockRightUser.phone);
    expect(optionalInfoFormPage.isValidPhone()).toBe(true);
  });

  it('isValidPhone should return false if the phone is invalid', () => {
    optionalInfoFormPage.form.controls['phone'].setValue(mockWrongUser.phone);
    expect(optionalInfoFormPage.isValidPhone()).toBe(false);

    optionalInfoFormPage.form.controls['phone'].setValue('01234567891');
    expect(optionalInfoFormPage.isValidPhone()).toBe(false);
  });

  it('isUserDataValid should return false if any field is invalid', () => {
    optionalInfoFormPage.form.controls['phone'].setValue(mockWrongUser.phone);
    optionalInfoFormPage.form.controls['name'].setValue(mockWrongUser.name);
    optionalInfoFormPage.form.controls['email'].setValue(mockWrongUser.email);

    expect(optionalInfoFormPage.isUserDataValid()).toBe(false);
  });

  it('isUserDataValid should return true if all fields are valid', () => {
    optionalInfoFormPage.form.controls['phone'].setValue(mockRightUser.phone);
    optionalInfoFormPage.form.controls['name'].setValue(mockRightUser.name);
    optionalInfoFormPage.form.controls['email'].setValue(mockRightUser.email);

    expect(optionalInfoFormPage.isUserDataValid()).toBe(true);
  });


  it('saveUser should call create from UserDAO', () => {
    optionalInfoFormPage.form.controls['phone'].setValue(mockRightUser.phone);
    optionalInfoFormPage.form.controls['name'].setValue(mockRightUser.name);
    optionalInfoFormPage.form.controls['email'].setValue(mockRightUser.email);

    optionalInfoFormPage.saveUser();
    expect(mockUserDao.create).toHaveBeenCalled();
  });

  it('saveUser should not call create from UserDAO', () => {
    optionalInfoFormPage.form.controls['phone'].setValue(mockWrongUser.phone);
    optionalInfoFormPage.form.controls['name'].setValue(mockWrongUser.name);
    optionalInfoFormPage.form.controls['email'].setValue(mockWrongUser.email);

    optionalInfoFormPage.saveUser();
    expect(mockUserDao.create).not.toHaveBeenCalled();
  });

});
