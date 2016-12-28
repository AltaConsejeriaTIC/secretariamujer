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
import {EventsServices} from "../../providers/events-services";


describe('MapPage tests', () => {

  let mapPage: MapPage;
  let fixture : ComponentFixture<MapPage>;
  let mapServices: MapServices;
  let eventsServices : EventsServices;
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
        App, Platform, Form, Keyboard, MenuController, NavController,UserDAO,MapServices,AlertCreator,AlertController,MapServices,EventsServices,
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
  beforeEach(inject([MapServices, EventsServices], (_mapServices, _eventsServices) => {
    mapServices=_mapServices;
    eventsServices=_eventsServices;
  }));

  it('createMap should call buildMap() from MapServices', () => {
    spyOn(mapServices,'buildMap');
    mapPage.createMap();
    expect(mapServices.buildMap).toHaveBeenCalled();
  });

  it('getUserPosition should call getUserLocation() from MapServices', () => {
    spyOn(mapServices,'getUserLocation').and.callThrough();
    mapPage.getUserPosition();
    expect(mapServices.getUserLocation() instanceof Promise).toBe(true);
  });

  it('drawEventMarker should clear last marker if there are more than 1 marker on the map', () => {
    spyOn(mapServices,'clearMarker');
    mapPage.markers.push(marker);
    mapPage.markers.push(marker);
    mapPage.drawEventMarker(event);
    expect(mapServices.clearMarker).toHaveBeenCalled();
  });

  it('drawUserPosition should call convertToLatLng() and drawMarker() from MapServices', () => {
    spyOn(mapServices,'convertToLatLng');
    spyOn(mapServices,'drawUserPositionMarker');
    mapPage.drawUserPosition(position);
    expect(mapServices.convertToLatLng).toHaveBeenCalled();
    expect(mapServices.drawUserPositionMarker).toHaveBeenCalled();
  });

  it('registerEvent should be defined', () => {
    expect(mapPage.registerEvent).toBeDefined();
  });

  it('isEventPinOnMap should return true if event pin is already on map', () => {
    mapPage.markers.push(marker);
    expect(mapPage.isEventPinOnMap()).toBe(true);
  });

  it('registerEvent should call registerEvent() from EventsServices', () => {
    spyOn(eventsServices,'registerEvent').and.callThrough();
    mapPage.registerEvent();
    expect(eventsServices.registerEvent).toHaveBeenCalled();
  });

});
