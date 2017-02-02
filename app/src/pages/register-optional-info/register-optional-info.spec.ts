import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule}  from 'ionic-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfigMock, UserDAOMock, AlertCreatorMock} from '../../mocks';
import {AlertCreator} from  '../../providers/alert-creator'
import {AlertController} from "ionic-angular";
import {UserDAO} from "../../providers/user-dao";
import {RegisterOptionalInfoPage} from "./register-optional-info";
import {IUser, User} from "../../entity/user";
import {ApplicationConfig} from "../../config";

describe('RegisterOptionalInfoPage tests', () => {

  let optionalInfoFormPage: RegisterOptionalInfoPage;
  let fixture: ComponentFixture<RegisterOptionalInfoPage>;
  let mockRightUser: IUser = new User('Jose Julio Flores', 'juliov@gmail.com', '3214569865', 'juliozorra', '1245');
  let mockWrongUser: IUser = new User('Jose Julio Flores 13', 'juliov@gmailcom', '321aa4569865', '#$#%', '124a');
  let mockUserDao: UserDAO;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterOptionalInfoPage],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController, AlertController, RegisterOptionalInfoPage,
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
    fixture = TestBed.createComponent(RegisterOptionalInfoPage);
    optionalInfoFormPage = fixture.componentInstance;
    mockUserDao = fixture.debugElement.injector.get(UserDAO);
  });


  it('isValidName should return true if the fullName is valid', () => {
    optionalInfoFormPage.form.controls['fullName'].setValue(mockRightUser.fullName);
    expect(optionalInfoFormPage.isValidName()).toBe(true);
  });


  it('isValidName should return false if the fullName is invalid', () => {
    optionalInfoFormPage.form.controls['fullName'].setValue(mockWrongUser.fullName);
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

  it('isValidPhone should return true if the cellPhone is valid', () => {
    optionalInfoFormPage.form.controls['cellPhone'].setValue(mockRightUser.cellPhone);
    expect(optionalInfoFormPage.isValidPhone()).toBe(true);
  });

  it('isValidPhone should return false if the cellPhone is invalid', () => {
    optionalInfoFormPage.form.controls['cellPhone'].setValue(mockWrongUser.cellPhone);
    expect(optionalInfoFormPage.isValidPhone()).toBe(false);

    optionalInfoFormPage.form.controls['cellPhone'].setValue('01234567891');
    expect(optionalInfoFormPage.isValidPhone()).toBe(false);
  });

  it('isUserDataValid should return false if any field is invalid', () => {
    optionalInfoFormPage.form.controls['cellPhone'].setValue(mockWrongUser.cellPhone);
    optionalInfoFormPage.form.controls['fullName'].setValue(mockWrongUser.fullName);
    optionalInfoFormPage.form.controls['email'].setValue(mockWrongUser.email);

    expect(optionalInfoFormPage.isUserDataValid()).toBe(false);
  });

  it('isUserDataValid should return true if all fields are valid', () => {
    optionalInfoFormPage.form.controls['cellPhone'].setValue(mockRightUser.cellPhone);
    optionalInfoFormPage.form.controls['fullName'].setValue(mockRightUser.fullName);
    optionalInfoFormPage.form.controls['email'].setValue(mockRightUser.email);

    expect(optionalInfoFormPage.isUserDataValid()).toBe(true);
  });


  it('saveUser should call create from UserDAO', () => {
    optionalInfoFormPage.form.controls['cellPhone'].setValue(mockRightUser.cellPhone);
    optionalInfoFormPage.form.controls['fullName'].setValue(mockRightUser.fullName);
    optionalInfoFormPage.form.controls['email'].setValue(mockRightUser.email);

    optionalInfoFormPage.saveUser();
    expect(mockUserDao.create).toHaveBeenCalled();
  });

  it('saveUser should not call create from UserDAO', () => {
    optionalInfoFormPage.form.controls['cellPhone'].setValue(mockWrongUser.cellPhone);
    optionalInfoFormPage.form.controls['fullName'].setValue(mockWrongUser.fullName);
    optionalInfoFormPage.form.controls['email'].setValue(mockWrongUser.email);

    optionalInfoFormPage.saveUser();
    expect(mockUserDao.create).not.toHaveBeenCalled();
  });

});
