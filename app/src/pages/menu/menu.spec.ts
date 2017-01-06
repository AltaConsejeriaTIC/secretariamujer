import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { RequiredInfoFormPage } from './required-info-form';
import {
  App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule,
  AlertController
}  from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigMock } from '../../mocks';
import {MenuPage} from "./menu";
import {AlertCreator} from "../../providers/alert-creator";


describe('MenuPage tests', () => {

  let menuPage: MenuPage;
  let fixture : ComponentFixture<MenuPage>;


  beforeEach(async(()=>{
    TestBed.configureTestingModule({
      declarations: [MenuPage],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController, AlertCreator,AlertController,
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

  it('toggleHint should toggle isShowingHint field of menuOptions in the specified index and set the other indexes to false', () => {
    menuPage.toggleisShowingHintParameter(0);
    expect(menuPage.menuOptions[0].isShowingHint).toBe(true);
    menuPage.toggleisShowingHintParameter(1);
    expect(menuPage.menuOptions[0].isShowingHint).toBe(false);

  });

});

