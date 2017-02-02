import {ComponentFixture, TestBed, async, inject} from '@angular/core/testing';
import {RequiredInfoFormPage} from './required-info-form';
import {App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule}  from 'ionic-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfigMock} from '../../mocks';
import {AlertCreator} from  '../../providers/alert-creator'
import {AlertController} from "ionic-angular";
import {UserDAO} from "../../providers/user-dao";


describe('RequiredInfoFormPage tests', () => {

  let requiredInfoFormPage: RequiredInfoFormPage;
  let fixture: ComponentFixture<RequiredInfoFormPage>;
  let alertCreator: AlertCreator;
  let userDAO: UserDAO;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequiredInfoFormPage],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController, AlertCreator, AlertController, RequiredInfoFormPage, UserDAO,
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

  beforeEach(inject([AlertCreator, UserDAO], (_alertCreator, _userDAO) => {
    alertCreator = _alertCreator;
    userDAO = _userDAO;
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

  it('saveRequiredInfo should call saveRequiredInfo from userDAO', () => {
    spyOn(userDAO, 'saveRequiredInfo');
    requiredInfoFormPage.saveRequiredInfo();
    expect(userDAO.saveRequiredInfo).toHaveBeenCalled();
  });
});
