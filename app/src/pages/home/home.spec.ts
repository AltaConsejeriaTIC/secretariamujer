import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule}  from 'ionic-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfigMock} from '../../mocks';
import {HomePage} from "./home";


describe('RequiredInfoFormPage tests', () => {

  let home2Page: HomePage;
  let fixture: ComponentFixture<HomePage>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController,
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
    fixture = TestBed.createComponent(HomePage);
    home2Page = fixture.componentInstance;
  });

  it('goToRequiredInfoForm should be defined', () => {
    expect(home2Page.goToRequiredInfoForm).toBeDefined();
  });

});

