import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { RequiredInfoFormPage } from './required-info-form';
import { App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule }  from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigMock } from '../../mocks';
import {MenuPage} from "./menu";


describe('MenuPage tests', () => {

  let menuPage: MenuPage;
  let fixture : ComponentFixture<MenuPage>;


  beforeEach(async(()=>{
    TestBed.configureTestingModule({
      declarations: [MenuPage],
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
    fixture=TestBed.createComponent(MenuPage);
    menuPage=fixture.componentInstance;
  });

  it('toggleHint should toggle the input variable', () => {
    menuPage.toggleHint('infoHint');
    menuPage.toggleHint('MapAndRoutesHint');
    menuPage.toggleHint('TestAndTips');
    menuPage.toggleHint('ConfigHint');
    expect(menuPage.isShowingInfoHint).toBe(true);
    expect(menuPage.isShowingMapAndRoutesHint).toBe(true);
    expect(menuPage.isShowingTestAndTipsHint).toBe(true);
    expect(menuPage.isShowingConfigHint).toBe(true);
  });

});

