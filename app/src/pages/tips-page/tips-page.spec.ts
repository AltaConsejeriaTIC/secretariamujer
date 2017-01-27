import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {
  App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule,
  NavParams
}  from 'ionic-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfigMock} from '../../mocks';
import {RoutesDetailsPage} from "./routes-details";
import {Http, ConnectionBackend} from "@angular/http";
import {TipsPage} from "./tips-page";


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


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TipsPage],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController, Http,
        {provide: Config, useClass: ConfigMock}, {provide: NavParams, useValue: stubNavParams},{provide: ConnectionBackend, useClass: ConfigMock}
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

