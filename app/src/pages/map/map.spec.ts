import {ComponentFixture, TestBed, async, inject} from '@angular/core/testing';
import {MapPage} from './map';
import {App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule}  from 'ionic-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfigMock} from '../../mocks';
import {UserDAO} from  '../../providers/user-dao'
import {MapServices} from  '../../providers/map-services'
import {AlertCreator} from  '../../providers/alert-creator'
import {AlertController} from "ionic-angular";
import {EventsServices} from "../../providers/events-services";
import {Diagnostic} from 'ionic-native';


describe('MapPage tests', () => {

  let mapPage: MapPage;
  let fixture: ComponentFixture<MapPage>;
  let mapServices: MapServices;
  let eventsServices: EventsServices;
  let alertCreator: AlertCreator;

  let marker = {
    setMap: function (x) {
    }
  };
  let event = {
    latLng: 1
  };
  let position = {
    coords: {
      latitude: 1,
      longitude: 1
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapPage],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController, UserDAO, MapServices, AlertCreator, AlertController, MapServices, EventsServices, Diagnostic,
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
    fixture = TestBed.createComponent(MapPage);
    mapPage = fixture.componentInstance;
  });

  beforeEach(inject([MapServices, EventsServices, AlertCreator], (_mapServices, _eventsServices, _alertCreator) => {
    mapServices = _mapServices;
    eventsServices = _eventsServices;
    alertCreator = _alertCreator;
  }));


  xit('createMap should call buildMap() from MapServices', () => {
    spyOn(mapServices, 'buildMap');
    mapPage.createMap();
    expect(mapServices.buildMap).toHaveBeenCalled();
  });

  xit('getUserPosition should call getUserLocation() from MapServices', () => {
    spyOn(mapServices, 'getUserLocation').and.callThrough();
    mapPage.getUserPosition();
    expect(mapServices.getUserLocation() instanceof Promise).toBe(true);
  });

  xit('drawEventMarker should clear last marker if there are more than 1 marker on the map', () => {
    spyOn(mapServices, 'clearMarker');
    mapPage.markers.push(marker);
    mapPage.markers.push(marker);
    mapPage.drawEventMarker(event);
    expect(mapServices.clearMarker).toHaveBeenCalled();
  });

  xit('drawUserPosition should call convertToLatLng() and drawMarker() from MapServices', () => {
    spyOn(mapServices, 'convertToLatLng');
    spyOn(mapServices, 'drawUserPositionMarker');
    mapPage.drawUserPosition(position);
    expect(mapServices.convertToLatLng).toHaveBeenCalled();
    expect(mapServices.drawUserPositionMarker).toHaveBeenCalled();
  });

  xit('registerEvent should be defined', () => {
    expect(mapPage.registerEvent).toBeDefined();
  });

  xit('isEventPinOnMap should return true if event pin is already on map', () => {
    mapPage.markers.push(marker);
    expect(mapPage.isEventPinOnMap()).toBe(true);
  });

  xit('registerEvent should call registerEvent() from EventsServices', () => {
    spyOn(eventsServices, 'registerEvent').and.callThrough();
    mapPage.registerEvent();
    expect(eventsServices.registerEvent).toHaveBeenCalled();
  });

  xit('checkIfGPSEnabled should be defined', () => {
    expect(mapPage.isGPSEnabled).toBeDefined();
  });

  xit('isGPSEnabled should call isLocationEnabled()', () => {
    spyOn(Diagnostic, 'isLocationEnabled').and.callThrough();
    mapPage.isGPSEnabled();
    expect(Diagnostic.isLocationEnabled).toHaveBeenCalled();
  });

  xit('checkUserPosition should call getUserPosition() if gps is enabled', () => {
    spyOn(mapPage, 'getUserPosition').and.callThrough();
    mapPage.checkUserPosition(true);
    expect(mapPage.getUserPosition).toHaveBeenCalled();
  });

  xit('checkUserPosition should call showSimpleAlert() from AlertCreator if gps is not enabled', () => {
    spyOn(alertCreator, 'showSimpleAlert');
    mapPage.checkUserPosition(false);
    expect(alertCreator.showSimpleAlert).toHaveBeenCalled();
  });
});
