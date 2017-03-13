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

});
