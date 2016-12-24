import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { MapPage } from './map';
import { App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule }  from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigMock } from '../../mocks';
import { UserDAO } from  '../../providers/user-dao'
import { MapServices } from  '../../providers/map-services'
import { AlertCreator } from  '../../providers/alert-creator'
import {AlertController} from "ionic-angular";


describe('MapPage tests', () => {

  let mapPage: MapPage;
  let fixture : ComponentFixture<MapPage>;
  let mapServices: MapServices;
  let marker = {
    setMap: function (x) {
    }
  };
  let event={
    latLng:1
  };
  let position={
    coords:{
      latitude:1,
      longitude:1
    }
  };


  beforeEach(async(()=>{
    TestBed.configureTestingModule({
      declarations: [MapPage],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController,UserDAO,MapServices,AlertCreator,AlertController,MapServices,
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
  beforeEach(inject([MapServices], _mapServices => {
    mapServices=_mapServices;
    spyOn(mapServices,'buildMap');
    spyOn(mapServices,'clearMarker');
    spyOn(mapServices,'convertToLatLng');
    spyOn(mapServices,'drawMarker');
  }));

  it('createMap should call buildMap() from MapServices', () => {
    mapPage.createMap();
    expect(mapServices.buildMap).toHaveBeenCalled();
  });

  it('drawEventMarker should clear last marker if there are more than 1 marker on the map', () => {
    mapPage.markers.push(marker);
    mapPage.markers.push(marker);
    mapPage.drawEventMarker(event);
    expect(mapServices.clearMarker).toHaveBeenCalled();
  });

  it('drawUserPosition should call convertToLatLng() and drawMarker() from MapServices', () => {
    mapPage.drawUserPosition(position);
    expect(mapServices.convertToLatLng).toHaveBeenCalled();
    expect(mapServices.drawMarker).toHaveBeenCalled();
  });
});
