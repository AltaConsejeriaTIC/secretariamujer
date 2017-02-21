import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {
  App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule,
  NavParams, Loading, LoadingController
}  from 'ionic-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfigMock, LoadingMock, LoadingControllerMock, AlertCreatorMock} from '../../mocks';
import {RoutesDetailsPage} from "./routes-details";
import {Http, ConnectionBackend} from "@angular/http";
import {TipsPage} from "./tips-page";
import {ApplicationConfig} from "../../config";
import {AlertCreator} from "../../providers/alert-creator";


describe('tipsPage tests', () => {

  let tipsPage: TipsPage;
  let fixture: ComponentFixture<TipsPage>;
  let stubNavParams={
    get:()=>{
      return{
        id:0,
        labels:['Violencia', "Económica"]
      }
    }
  };

  let stubConnectionBackend={
      createConnection:()=>{
        return {response:''}
      }
  }

  let stubHttp={
    get:()=>{return {response:'', map:()=>{return {subscribe:()=>{}}}}},
  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TipsPage],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController, ApplicationConfig,
        {provide: Config, useClass: ConfigMock}, {provide: NavParams, useValue: stubNavParams},
        {provide: Loading, useClass: LoadingMock},
        {provide: LoadingController, useClass: LoadingControllerMock}, {provide: ConnectionBackend, useValue: stubConnectionBackend},{provide: Http, useValue: stubHttp},
        {
          provide: AlertCreator,
          useClass: AlertCreatorMock
        },
      ],
      imports: [
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipsPage);
    tipsPage = fixture.componentInstance;
  });

  it('getcategoryTitle should join labels', () => {
    expect(tipsPage.categoryTitle).toEqual("Violencia Económica ");
  });

  it('Tips Page Class should be defined by category tips', () => {
    expect(tipsPage.tipsClass).toEqual('economic-violence-style');
  });

  it('initial tips description should be hidden', () => {
    tipsPage.tipsArrayByCategory = [{
      title: "title",
      description: "description",
    }];
    tipsPage.setInitialTipState();
    expect(tipsPage.isTipVisible[0]).toEqual(false);
  });

});

