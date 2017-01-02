import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule }  from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigMock } from '../../mocks';
import { AlertCreator } from  '../../providers/alert-creator'
import {AlertController} from "ionic-angular";
import {UserDAO} from "../../providers/user-dao";
import {OptionalInfoFormPagePage} from "./optional-info-form-page";

describe('OptionalInfoFormPage tests', () => {

  let optionalInfoFormPage: OptionalInfoFormPagePage;
  let fixture : ComponentFixture<OptionalInfoFormPagePage>;
  let alertCreator: AlertCreator;
  let userDAO: UserDAO;


  beforeEach(async(()=>{
    TestBed.configureTestingModule({
      declarations: [OptionalInfoFormPagePage],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController,AlertCreator,AlertController,OptionalInfoFormPagePage,UserDAO,
        {provide: Config, useClass: ConfigMock}
      ],
      imports: [
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(()=>{
    fixture=TestBed.createComponent(OptionalInfoFormPagePage);
    optionalInfoFormPage=fixture.componentInstance;
  });

  beforeEach(inject([AlertCreator, UserDAO], (_alertCreator, _userDAO) => {
    alertCreator=_alertCreator;
    userDAO=_userDAO;
  }));

  it('saveOptionalInfo should call saveOptionalInfo from UserDAO and create from UserDAO', () => {
    spyOn(userDAO,'saveOptionalInfo');
    spyOn(userDAO,'create').and.callThrough();
    optionalInfoFormPage.saveOptionalInfo();
    expect(userDAO.saveOptionalInfo).toHaveBeenCalled();
    expect(userDAO.create).toHaveBeenCalled();

  });

  it('createUser should call create from UserDAO', () => {
    spyOn(userDAO,'create').and.callThrough();
    optionalInfoFormPage.createUser();
    expect(userDAO.create).toHaveBeenCalled();
  });

});
