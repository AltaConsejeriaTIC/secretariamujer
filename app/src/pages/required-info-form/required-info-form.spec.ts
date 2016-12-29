import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { RequiredInfoFormPage } from './required-info-form';
import { App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule }  from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigMock } from '../../mocks';
import { AlertCreator } from  '../../providers/alert-creator'
import {AlertController} from "ionic-angular";





describe('MapPage tests', () => {

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

  it('checkInputValues should be defined', () => {
    expect(requiredInfoFormPage.checkInputValues).toBeDefined();
  });

  it('checkPassValue should call showSimpleAlert from AlertCreator if input is empty', () => {
    spyOn(alertCreator,'showSimpleAlert');
    requiredInfoFormPage.user.pass=null;
    requiredInfoFormPage.checkPassValue();
    expect(alertCreator.showSimpleAlert).toHaveBeenCalled();
  });

  it('checkPassValueIsOnlyNumber should call showSimpleAlert from AlertCreator if input contains characters different from numbers', () => {
    spyOn(alertCreator,'showSimpleAlert');
    requiredInfoFormPage.user.pass='123A';
    requiredInfoFormPage.checkPassValueIsOnlyNumber();
    expect(alertCreator.showSimpleAlert).toHaveBeenCalled();
  });

});
