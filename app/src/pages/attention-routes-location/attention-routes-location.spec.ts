import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {
  App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule,
  NavParams
}  from 'ionic-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfigMock} from '../../mocks';
import {AttentionRoutesLocationPage} from "./attention-routes-location";


describe('AttentionRoutesLocationPage tests', () => {

  let attentionRoutesLocation: AttentionRoutesLocationPage;
  let fixture: ComponentFixture<AttentionRoutesLocationPage>;
  let stubNavParams={
    get:()=>{
      return{
        id:0
      }
    }
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AttentionRoutesLocationPage],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController,
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
    fixture = TestBed.createComponent(AttentionRoutesLocationPage);
    attentionRoutesLocation = fixture.componentInstance;
  });

  it('setSubheaderTitle should set subheaderTitle using 2 strings if option is protection measures', () => {
    expect(attentionRoutesLocation.subheaderTitle).toEqual('Medidas de Protección');
  });

});

