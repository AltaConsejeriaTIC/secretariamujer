import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {
  App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule,
  NavParams, LoadingController
}  from 'ionic-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfigMock, LoadingControllerMock, LoadingMock} from '../../mocks';
import {RoutesDetailsPage} from "./routes-details";
import {Http, ConnectionBackend} from "@angular/http";
import {HttpModule, XHRBackend} from "@angular/http";
import {MockBackend} from '@angular/http/testing';
import {AlertCreator} from "../../providers/alert-creator";
import {OfflineService} from "../../providers/offline-service";


describe('RoutesDetailsPage tests', () => {

  let routesDetailsPage: RoutesDetailsPage;
  let fixture: ComponentFixture<RoutesDetailsPage>;
  let stubNavParams={
    get:()=>{
      return{
        id:0
      }
    }
  };
  let stubAlertCreator={
    showSimpleAlert:()=>{}
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoutesDetailsPage],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController, Http,OfflineService,
        {provide: Config, useClass: ConfigMock}, {provide: NavParams, useValue: stubNavParams},
        {provide: XHRBackend, useClass: MockBackend }, {provide: ConnectionBackend, useClass: MockBackend},
        {provide: AlertCreator, useValue: stubAlertCreator},{provide: LoadingController, useClass: LoadingControllerMock}
      ],
      imports: [
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        HttpModule
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesDetailsPage);
    routesDetailsPage = fixture.componentInstance;
  });


  it('downloadFile should call showNoFileAlert if route has no RESTUrl File', () => {
    routesDetailsPage.routesDetails=[{
      email: "",
      address: "",
      schedule: "",
      phone: "",
      location: "",
      file:""
    }];
    spyOn(routesDetailsPage,'showNoFileAlert');
    routesDetailsPage.downloadFileListener(0);
    expect(routesDetailsPage.showNoFileAlert).toHaveBeenCalled();
  });

  it('downloadFile should call openBrowser if route has RESTUrl File', () => {
    routesDetailsPage.routesDetails=[{
      email: "",
      address: "",
      schedule: "",
      phone: "",
      location: "",
      file:"http://test.com"
    }];
    spyOn(routesDetailsPage,'openBrowser');
    routesDetailsPage.downloadFileListener(0);
    expect(routesDetailsPage.openBrowser).toHaveBeenCalled();
  });

});

