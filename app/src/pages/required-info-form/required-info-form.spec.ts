import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { RequiredInfoFormPage } from './required-info-form';
import { App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule }  from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigMock } from '../../mocks';
import { AlertCreator } from  '../../providers/alert-creator'
import {AlertController} from "ionic-angular";





describe('RequiredInfoFormPage tests', () => {

  let requiredInfoFormPage: RequiredInfoFormPage;
  let fixture : ComponentFixture<RequiredInfoFormPage>;
  let alertCreator: AlertCreator;


  beforeEach(async(()=>{
    TestBed.configureTestingModule({
      declarations: [RequiredInfoFormPage],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController,AlertCreator,AlertController,RequiredInfoFormPage,
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
    fixture=TestBed.createComponent(RequiredInfoFormPage);
    requiredInfoFormPage=fixture.componentInstance;
  });

  beforeEach(inject([AlertCreator], (_alertCreator) => {
    alertCreator=_alertCreator;
  }));

  it('validateEmptyField should return true if field is empty', () => {
    requiredInfoFormPage.user.name=null;
    expect(requiredInfoFormPage.validateEmptyField(requiredInfoFormPage.user.name)).toBe(true);
  });

  it('throwMessageIfEmptyField should call showSimpleAlert from AlertCreator if any field is empty', () => {
    spyOn(alertCreator,'showSimpleAlert');
    requiredInfoFormPage.throwMessageIfEmptyField(true,true);
    expect(alertCreator.showSimpleAlert).toHaveBeenCalled();
    requiredInfoFormPage.throwMessageIfEmptyField(true,false);
    expect(alertCreator.showSimpleAlert).toHaveBeenCalled();
    requiredInfoFormPage.throwMessageIfEmptyField(false,true);
    expect(alertCreator.showSimpleAlert).toHaveBeenCalled();
  });

  it('checkPassValueIsOnlyNumber should call showSimpleAlert from AlertCreator if input contains characters different from numbers', () => {
    spyOn(alertCreator,'showSimpleAlert');
    requiredInfoFormPage.user.pass='123!';
    requiredInfoFormPage.checkPassValueIsOnlyNumber();
    expect(alertCreator.showSimpleAlert).toHaveBeenCalled();
  });

});
