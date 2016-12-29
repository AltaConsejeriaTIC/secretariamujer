import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { RequiredInfoFormPage } from './required-info-form';
import { App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule }  from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigMock } from '../../mocks';
import {Home2Page} from "./home2";






describe('RequiredInfoFormPage tests', () => {

  let home2Page: Home2Page;
  let fixture : ComponentFixture<Home2Page>;


  beforeEach(async(()=>{
    TestBed.configureTestingModule({
      declarations: [Home2Page],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController,
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
    fixture=TestBed.createComponent(Home2Page);
    home2Page=fixture.componentInstance;
  });

  it('goToRequiredInfoForm should be defined', () => {
    expect(home2Page.goToRequiredInfoForm).toBeDefined();
  });

});

