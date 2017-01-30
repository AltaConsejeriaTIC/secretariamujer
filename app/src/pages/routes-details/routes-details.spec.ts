import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {
  App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule,
  NavParams
}  from 'ionic-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfigMock} from '../../mocks';
import {RoutesDetailsPage} from "./routes-details";
import {Http, ConnectionBackend} from "@angular/http";
import {HttpModule, XHRBackend, Response, ResponseOptions} from "@angular/http";
import {MockBackend} from '@angular/http/testing';
import {AlertCreator} from "../../providers/alert-creator";


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


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoutesDetailsPage],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController, Http,
        {provide: Config, useClass: ConfigMock}, {provide: NavParams, useValue: stubNavParams},
        {provide: XHRBackend, useClass: MockBackend }, {provide: ConnectionBackend, useClass: MockBackend},
        {provide: AlertCreator, useClass: ConfigMock}
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


  it('downloadFile should be defined', () => {
    expect(routesDetailsPage.downloadFile).toBeDefined();
  });

  it('downloadFile should ', () => {
    expect(routesDetailsPage.downloadFile).toBeDefined();
  });



});

