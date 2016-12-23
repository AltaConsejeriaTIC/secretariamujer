import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { MapPage } from './map';
import { App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule }  from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigMock } from '../../mocks';
import { AdminAPI } from  '../../providers/admin-api'
import { MapServices } from  '../../providers/map-services'
import { AlertCreator } from  '../../providers/alert-creator'
import {AlertController} from "ionic-angular";


describe('MapPage tests', () => {

  let mapPage: MapPage;
  let fixture : ComponentFixture<MapPage>;


  beforeEach(async(()=>{
    TestBed.configureTestingModule({
      declarations: [MapPage],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController,AdminAPI,MapServices,AlertCreator,AlertController,
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
    fixture=TestBed.createComponent(MapPage);
    mapPage=fixture.componentInstance;
  });

  it('testing MapPage component', () =>  expect(2).toBe(mapPage.dummyFunctionToTest()));
});