import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {
  App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule,
  NavParams
}  from 'ionic-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfigMock} from '../../mocks';
import {RoutesDetailsPage} from "./routes-details";
import {Http} from "@angular/http";


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
        {provide: Config, useClass: ConfigMock}, {provide: NavParams, useValue: stubNavParams}
      ],
      imports: [
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesDetailsPage);
    routesDetailsPage = fixture.componentInstance;
  });



});

